import { Skeleton } from "@/components/ui/skeleton";

const MyHelpRequestsPageLoader = () => {
  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">My Help Requests</h1>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="group transition-all duration-300 ease-in-out">
          <div
            className="flex flex-col md:flex-row gap-4 p-4 rounded-xl shadow bg-background
              animate-pulse"
          >
            {/* Image skeleton */}
            <Skeleton className="w-full md:w-60 h-40 rounded-lg" />

            {/* Details skeleton */}
            <div className="flex flex-col justify-between w-full space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/2" /> {/* Title */}
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-[160px] rounded-md" />{" "}
                    {/* Select */}
                    <Skeleton className="h-10 w-20 rounded-md" />{" "}
                    {/* Update button */}
                  </div>
                </div>
                <Skeleton className="h-4 w-full" /> {/* Address */}
                <Skeleton className="h-4 w-1/2" /> {/* Reward */}
                <Skeleton className="h-4 w-1/3" /> {/* Type */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-3 w-1/4" /> {/* CreatedAt */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHelpRequestsPageLoader;
