import { MessageCircleOff } from "lucide-react";
import NoHelpOfferFound from "../MyDetailHelpRequests/NoHelpOfferFound";
import { useAuth } from "@/hooks/useAuth";

function MessagePage() {
  useAuth();
  const messages = [];
  if (messages.length == 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center pt-4 text-center space-y-4">
          <MessageCircleOff className="text-muted-foreground h-20 w-20" />
        </div>
        <NoHelpOfferFound
          title="No Messages Yet"
          message="You haven't received any messages yet. Once someone reaches out, their messages will appear here."
          classname="pt-4"
        />
      </>
    );
  }
  return <div>MessagePage MessagePage</div>;
}

export default MessagePage;
