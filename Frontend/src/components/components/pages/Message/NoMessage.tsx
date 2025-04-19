// components/NoMessages.tsx

import { MessageCircleOff } from "lucide-react";

const NoMessages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground px-4 text-center">
      <MessageCircleOff className="w-10 h-10 mb-2" />
      <p className="text-sm font-medium">No messages yet</p>
      <p className="text-xs">Start the conversation by sending a message!</p>
    </div>
  );
};

export default NoMessages;
