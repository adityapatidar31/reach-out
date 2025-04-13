import { Skeleton } from "@/components/ui/skeleton";

const MyHelpRequestsPageLoader = () => {
  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-4 p-4 rounded-xl shadow bg-background"
        >
          {/* Image skeleton */}
          <Skeleton className="w-full md:w-60 h-40 rounded-lg" />

          {/* Details skeleton */}
          <div className="flex flex-col justify-between w-full space-y-2">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-full" /> {/* Address */}
              <Skeleton className="h-4 w-1/2" /> {/* Reward */}
              <Skeleton className="h-4 w-1/3" /> {/* Type */}
              <Skeleton className="h-4 w-1/3" /> {/* Status */}
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-3 w-1/4" /> {/* CreatedAt */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHelpRequestsPageLoader;
