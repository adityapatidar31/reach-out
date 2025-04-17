import { Button } from "@/components/ui/button";
import { BellRing, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Icons() {
  const user = useCurrentUser();
  if (!user) return null;

  return (
    <>
      {/* Notification Bell with Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <BellRing className="text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 text-center">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            You have no new notifications.
          </p>
        </PopoverContent>
      </Popover>

      {/* Message Icon */}
      <Link to="/messages">
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MessageSquareQuote className="text-primary" />
        </Button>
      </Link>
    </>
  );
}

export default Icons;
