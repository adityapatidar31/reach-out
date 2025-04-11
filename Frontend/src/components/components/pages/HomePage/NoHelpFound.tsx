import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

interface NoHelpFoundProps {
  onClear: () => void;
}

const NoHelpFound = ({ onClear }: NoHelpFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <Frown className="w-12 h-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">
        No Help Requests Found
      </h2>
      <p className="text-muted-foreground mb-6">
        Try adjusting your filters or check back later.
      </p>
      <Button onClick={onClear} variant="outline">
        Clear Filters
      </Button>
    </div>
  );
};

export default NoHelpFound;
