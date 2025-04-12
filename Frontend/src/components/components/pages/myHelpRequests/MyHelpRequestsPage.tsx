import { getAllHelpOfferByHelpId } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

function MyHelpRequestsPage() {
  // getAllHelpOfferByHelpId
  const userId = 3;
  const {
    data: myHelpRequest,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myHelpRequests", userId],
    queryFn:()=>
  });
  return <div>MyHelpRequestsPage MyHelpRequestsPage</div>;
}

export default MyHelpRequestsPage;
