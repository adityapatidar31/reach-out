import { Skeleton } from "@/components/ui/skeleton";

const ApplyHelpOfferModalLoading = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-[120px] w-full rounded-md" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ApplyHelpOfferModalLoading;
