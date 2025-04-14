import { useQuery } from "@tanstack/react-query";
import { getAllHelpRequestByUserId } from "@/services/apiService";
import MyHelpRequestsPageLoader from "./MyHelpRequestsPageLoader";
import Error from "../../Error";
import MyHelpRequestCard from "./MyHelpRequestCard";
import NoHelpCreate from "./NoHelpCreate";

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

  if (isLoading) return <MyHelpRequestsPageLoader />;

  if (isError || !myHelpRequests)
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load help requests."
      />
    );

  if (myHelpRequests.length == 0) {
    return <NoHelpCreate />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Help Requests</h1>
      {myHelpRequests.map((help) => (
        <MyHelpRequestCard key={help.id} help={help} />
      ))}
    </div>
  );
}

export default MyHelpRequestsPage;
