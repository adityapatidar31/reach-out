// MyHelpRequestsPage.tsx
import { useQuery } from "@tanstack/react-query";
import { getAllHelpRequestByUserId } from "@/services/apiService";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import MyHelpRequestsPageLoader from "./MyHelpRequestsPageLoader";
import Error from "../../Error";

function MyHelpRequestsPage() {
  const userId = 1;
  const {
    data: myHelpRequests,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myHelpRequests", userId],
    queryFn: () => getAllHelpRequestByUserId(userId),
  });

  if (isLoading) {
    return <MyHelpRequestsPageLoader />;
  }

  if (isError || !myHelpRequests) {
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load help requests."
      />
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Help Requests</h1>

      {myHelpRequests.map((help) => (
        <Link
          to={`/my-help-requests/${help.id}`}
          key={help.id}
          className="group transition-all duration-300 ease-in-out"
        >
          <div
            className="flex flex-col md:flex-row gap-4 p-4 rounded-xl shadow bg-background
                    group-hover:shadow-lg  group-hover:ring-ring 
                    group-hover:scale-[1.01] transition-all duration-300 ease-in-out"
          >
            <img
              src={help.helpImageUrl}
              alt={help.title}
              className="w-full md:w-60 h-40 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-between space-y-2 w-full">
              <div>
                <h2 className="text-xl font-semibold">{help.title}</h2>
                <p className="text-sm text-muted-foreground">
                  📍 {help.area}, {help.city}, {help.state}, {help.country} -{" "}
                  {help.pincode}
                </p>
                <p className="text-sm">🎁 Reward: {help.reward}</p>
                <p className="text-sm">🧭 Type: {help.type}</p>
                <p className="text-sm">🟢 Status: {help.status}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {help.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Created At: {format(new Date(help.createdAt), "PPP p")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyHelpRequestsPage;
