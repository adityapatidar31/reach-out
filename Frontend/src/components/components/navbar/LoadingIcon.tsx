import { Skeleton } from "@/components/ui/skeleton";

function LoadingIcons() {
  return (
    <div className="flex items-center gap-4">
      {/* Loading skeleton for Notification Icon */}
      <Skeleton className="w-8 h-8 " />
      {/* Loading skeleton for Message Icon */}
      <Skeleton className="w-8 h-8" />
    </div>
  );
}

export default LoadingIcons;
