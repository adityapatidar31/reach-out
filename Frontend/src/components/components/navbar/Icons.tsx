import { Button } from "@/components/ui/button";
import { BellRing, MessageSquareQuote } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function Icons() {
  const user = useCurrentUser();
  const location = useLocation();

  if (!user) return null;
  const isActivePage = location.pathname == "/messages";
  return (
    <>
      {/* Notification Bell with Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <BellRing className="text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            You have no new notifications yet. Stay tuned!
          </p>
        </PopoverContent>
      </Popover>

      {/* Message Icon */}
      <Link to="/messages">
        <Button
          variant="ghost"
          size="icon"
          className={cn("cursor-pointer", isActivePage ? "bg-accent" : "")}
        >
          <MessageSquareQuote className="text-primary" />
        </Button>
      </Link>
    </>
  );
}

export default Icons;
