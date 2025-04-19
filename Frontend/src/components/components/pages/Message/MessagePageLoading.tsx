import { Skeleton } from "@/components/ui/skeleton";

const MessagePageLoading = () => {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] border rounded-lg shadow-sm overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-1/3 border-r border-muted h-full overflow-y-auto p-4 space-y-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area Skeleton */}
      <div className="hidden md:flex flex-1 flex-col p-4 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex ${
                idx % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <Skeleton className="h-10 w-2/3 rounded-xl" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MessagePageLoading;
