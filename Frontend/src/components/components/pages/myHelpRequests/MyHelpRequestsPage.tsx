import { getAllHelpRequestByUserId } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

function MyHelpRequestsPage() {
  const userId = 1;
  const { data: myHelpRequest } = useQuery({
    queryKey: ["myHelpRequests", userId],
    queryFn: () => getAllHelpRequestByUserId(userId),
  });

  console.log(myHelpRequest);
  return <div>MyHelpRequestsPage MyHelpRequestsPage</div>;
}

export default MyHelpRequestsPage;
