import { useQuery } from "@tanstack/react-query";

import { getAllHelpRequest } from "@/services/apiService";
import HelpCard from "./HelpCard";
import HomePageLoader from "./HomePageLoader";
import NoHelpFound from "./NoHelpFound";

const HelpList = () => {
  const {
    data: helps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["helps"],
    queryFn: getAllHelpRequest,
  });
  if (isLoading) return <HomePageLoader />;
  if (isError || !helps)
    return <p className="text-center text-red-500">Error loading helps</p>;

  if (helps.length === 0) return <NoHelpFound onClear={() => {}} />;

  return (
    <div className="grid grid-cols-1 gap-6">
      {helps.map((help) => (
        <HelpCard key={help.id} help={help} />
      ))}
    </div>
  );
};

export default HelpList;
