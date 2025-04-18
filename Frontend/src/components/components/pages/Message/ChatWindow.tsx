import { useQuery } from "@tanstack/react-query";

// components/chat/ChatWindow.tsx
type Props = {
  conversationId: number;
};

const ChatWindow = ({ conversationId }: Props) => {
  return (
    <div className="w-full md:w-2/3 h-full p-4">
      <h2 className="text-xl font-semibold">Chat Window</h2>
      <p className="text-muted-foreground">Conversation ID: {conversationId}</p>
      {/* Later: Load actual messages here */}
    </div>
  );
};

export default ChatWindow;
