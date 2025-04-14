import { Skeleton } from "@/components/ui/skeleton";

function LoadingProfile() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-7 h-7 rounded-full" />
    </div>
  );
}

export default LoadingProfile;
