import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  onBack?: () => void;
  showBackButton?: boolean;
};

const ChatWindowLoading = ({ onBack, showBackButton = false }: Props) => {
  return (
    <div className="flex flex-col h-full w-full md:w-2/3 bg-background border shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        {showBackButton && (
          <Button
            size="icon"
            variant="outline"
            onClick={onBack}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="space-y-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <Skeleton className="h-10 w-2/3 max-w-[75%] rounded-xl" />
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t p-4 flex items-center gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};

export default ChatWindowLoading;
