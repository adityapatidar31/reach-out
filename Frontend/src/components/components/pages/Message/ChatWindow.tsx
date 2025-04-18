// components/chat/ChatWindow.tsx
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getAllMessageOfConversation } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Props = {
  conversationId: number;
  helpTitle: string;
  chatPartnerName: string;
};

const ChatWindow = ({ conversationId, helpTitle, chatPartnerName }: Props) => {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getAllMessageOfConversation(conversationId),
  });

  const user = useCurrentUser();
  if (!user) return null;

  const { id: userId } = user;

  return (
    <div className="w-full md:w-2/3 h-full p-4 flex flex-col space-y-2 overflow-y-auto">
      <h2 className="text-xl font-semibold">{helpTitle}</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Chatting with {chatPartnerName}
      </p>

      <div className="flex flex-col gap-3">
        {messages.map((msg) => {
          const isSender = msg.senderId === userId;

          return (
            <div
              key={msg.id}
              className={cn(
                "max-w-xs md:max-w-md px-4 py-2 rounded-xl shadow-sm text-sm",
                isSender
                  ? "bg-violet-600 text-white self-end rounded-br-none"
                  : "bg-muted text-foreground self-start rounded-bl-none"
              )}
            >
              <p>{msg.content}</p>
              <p className="text-[0.7rem] text-muted-foreground mt-1 text-right">
                {msg.senderName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatWindow;
