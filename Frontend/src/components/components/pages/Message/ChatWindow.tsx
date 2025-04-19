// ChatWindow.tsx

import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  getAllMessageOfConversation,
  sendMessage,
} from "@/services/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";
import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { errorResponseSchema, TypeMessage } from "@/schema/schema";
import { ArrowLeft, RefreshCw, SendHorizonal } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Helper to add 5 hours 30 minutes to a Date
const convertToIST = (utcStr: string): Date => {
  const date = new Date(utcStr);
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
};

// Helper to get date label
const getDateLabel = (dateStr: string) => {
  const istDate = convertToIST(dateStr);
  if (isToday(istDate)) return "Today";
  if (isYesterday(istDate)) return "Yesterday";
  return format(istDate, "MMMM dd, yyyy");
};

// Group messages by date
const groupMessagesByDate = (messages: TypeMessage[]) => {
  return messages.reduce((acc: Record<string, TypeMessage[]>, msg) => {
    const dateLabel = getDateLabel(msg.createdAt);
    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(msg);
    return acc;
  }, {});
};

type Props = {
  conversationId: number;
  helpTitle: string;
  chattingWith: string;
  onBack?: () => void;
};

const ChatWindow = ({
  conversationId,
  helpTitle,
  chattingWith,
  onBack,
}: Props) => {
  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getAllMessageOfConversation(conversationId),
  });

  const user = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMdUp = useMediaQuery("(min-width: 768px)");

  const { mutate, isPending: isMessagePending } = useMutation({
    mutationFn: () => sendMessage(conversationId, newMessage),
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      refetch();
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const parsed = errorResponseSchema.safeParse(axiosError);
      if (!parsed.success) toast.error(parsed.error.message);
      else toast.error("Failed to send message");
    },
  });

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );

  if (!user) return null;
  const { id: userId } = user;

  return (
    <div className="flex flex-col h-full w-full md:w-2/3 bg-background border shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        {!isMdUp && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => onBack?.()}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h2 className="text-xl font-semibold text-primary truncate">
            {helpTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            Chatting with {chattingWith}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
          <div key={dateLabel} className="flex flex-col gap-2">
            <div className="text-center text-xs text-muted-foreground font-medium py-2">
              {dateLabel}
            </div>
            {msgs.map((msg) => {
              const isSender = msg.senderId === userId;
              const istDate = convertToIST(msg.createdAt);
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "px-4 py-2 rounded-xl shadow-sm text-sm break-words max-w-[75%]",
                    isSender
                      ? "bg-primary text-white self-end rounded-br-none"
                      : "bg-muted text-foreground self-start rounded-bl-none"
                  )}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs font-medium mt-1 text-right text-muted-foreground">
                    {format(istDate, "hh:mm a")}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
        {/* Empty div to auto scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newMessage.trim()) return;
          mutate();
        }}
        className="border-t p-4 flex items-center gap-2"
      >
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          className="text-white"
          disabled={isMessagePending}
        >
          {isMessagePending ? (
            <RefreshCw className="animate-spin" />
          ) : (
            <SendHorizonal />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
