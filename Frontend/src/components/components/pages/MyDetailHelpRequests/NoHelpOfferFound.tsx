import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  message?: string;
  classname?: string;
}

function NoHelpOfferFound({ message, title, classname }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center space-y-4",
        classname
      )}
    >
      <h2 className="text-2xl font-bold text-foreground">
        {title || "No Help Offers Found"}
      </h2>
      <p className="text-muted-foreground max-w-md">
        {message ||
          "Nobody has offered help on this request yet. Once someone submits a help offer, it will appear here."}
      </p>
      <Button onClick={() => navigate(-1)} className="mt-4 text-white">
        Go Back
      </Button>
    </div>
  );
}

export default NoHelpOfferFound;
