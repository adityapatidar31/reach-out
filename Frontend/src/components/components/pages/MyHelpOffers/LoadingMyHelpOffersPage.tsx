import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingMyHelpOffersPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Help Offers</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="flex flex-col sm:flex-row overflow-hidden py-0 rounded-2xl shadow-md"
          >
            <Skeleton className="w-full sm:w-1/3 h-64 sm:h-auto" />

            <CardContent className="p-4 flex-1 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-2/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadingMyHelpOffersPage;
