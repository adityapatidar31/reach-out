import { Skeleton } from "@/components/ui/skeleton";

const HelpCardSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-md bg-background text-foreground overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Skeleton for Image */}
        <div className="md:w-1/3">
          <Skeleton className="w-full h-48 md:h-full" />
        </div>

        {/* Skeleton for Content */}
        <div className="md:w-2/3 p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />

          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
};

const HomePageLoader = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <HelpCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default HomePageLoader;
