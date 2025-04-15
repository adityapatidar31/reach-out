import { Skeleton } from "@/components/ui/skeleton";

const HelpCardSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-md bg-background overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-48" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />

        {/* Categories */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        {/* Reward */}
        <Skeleton className="h-4 w-2/3" />

        {/* City */}
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

const HomePageLoading = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <HelpCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default HomePageLoading;
