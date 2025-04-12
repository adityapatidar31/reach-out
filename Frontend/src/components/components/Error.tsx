import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeErrorProps {
  onRetry: () => void;
  message?: string;
}

const HomeError = ({ onRetry, message }: HomeErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">
        {message || "Failed to load page"}
      </h2>
      <p className="text-muted-foreground mb-6">
        Something went wrong while fetching data. Please try again.
      </p>
      <Button onClick={onRetry} variant="outline">
        Retry
      </Button>
    </div>
  );
};

export default HomeError;
