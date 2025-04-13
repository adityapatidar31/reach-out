import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function HelpOfferCardSkeletonItem() {
  return (
    <div className="group transition-all duration-300 ease-in-out">
      <Card
        className="p-4 rounded-xl shadow flex flex-col md:flex-row gap-4
                   transition-all duration-300 ease-in-out"
      >
        {/* Avatar */}
        <div className="flex justify-center">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-row justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" /> {/* Name */}
              <Skeleton className="h-4 w-40" /> {/* Email */}
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Skeleton className="h-10 w-32 rounded-md" /> {/* Select */}
              <Skeleton className="h-10 w-20 rounded-md" /> {/* Button */}
            </div>
          </div>
          <Skeleton className="h-4 w-full" /> {/* Message */}
          <Skeleton className="h-4 w-56" /> {/* CreatedAt */}
          <Skeleton className="h-4 w-60" /> {/* UpdatedAt */}
        </div>
      </Card>
    </div>
  );
}

function MyDetailHelpRequestPageLoading() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Skeleton className="h-8 w-80 mb-4" /> {/* Page Heading */}
      {Array.from({ length: 3 }).map((_, index) => (
        <HelpOfferCardSkeletonItem key={index} />
      ))}
    </div>
  );
}

export default MyDetailHelpRequestPageLoading;
