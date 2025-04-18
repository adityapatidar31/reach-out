// Removed toZonedTime import
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getAllMessageOfConversation } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypeMessage } from "@/schema/schema";
import { SendHorizonal } from "lucide-react";

// Helper to add 5 hours 30 minutes to a Date
const convertToIST = (utcStr: string): Date => {
  const date = new Date(utcStr);
  // Add 5 hours and 30 minutes in milliseconds
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
};

const ChatWindow = ({ conversationId, helpTitle, chattingWith }: Props) => {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getAllMessageOfConversation(conversationId),
  });

  const user = useCurrentUser();
  const [newMessage, setNewMessage] = useState("");

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages),
    [messages]
  );

  if (!user) return null;
  const { id: userId } = user;

  return (
    <div className="w-full md:w-2/3 h-full flex flex-col p-4 overflow-y-auto bg-background border rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-primary truncate">
          {helpTitle}
        </h2>
        <p className="text-sm text-muted-foreground">
          Chatting with {chattingWith}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
          <div key={dateLabel} className="flex flex-col gap-4">
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
      </div>

      {/* Input Box */}
      <form className="mt-4 flex items-center gap-2" onSubmit={() => {}}>
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button size="icon" className="text-white cursor-pointer">
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
