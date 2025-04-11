import { getAllHelpRequest } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import HelpList from "./HelpList";

function HomePage() {
  const {
    data: helps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["helps"],
    queryFn: getAllHelpRequest,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !helps)
    return <p className="text-center text-red-500">Error loading helps</p>;

  return (
    <div className=" py-8">
      <h1 className="text-3xl font-bold mb-6">Help Requests</h1>
      <HelpList helps={helps} />
    </div>
  );
}

export default HomePage;
