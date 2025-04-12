import { Skeleton } from "@/components/ui/skeleton";

const LoadingComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-64 rounded-2xl" />

      {/* Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <Skeleton className="h-4 w-1/2" />

        {/* Creator Info */}
        <div className="flex items-center gap-4 p-4 border rounded-2xl shadow-sm bg-muted">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
