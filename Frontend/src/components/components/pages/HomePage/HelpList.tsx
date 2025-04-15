import { useQuery } from "@tanstack/react-query";

import { getAllHelpRequest } from "@/services/apiService";
import HelpCard from "./HelpCard";
import HomePageLoading from "./HomePageLoading";
import NoHelpFound from "./NoHelpFound";
import Error from "../../Error";

const HelpList = () => {
  const {
    data: helps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["helps"],
    queryFn: getAllHelpRequest,
  });
  if (isLoading) return <HomePageLoading />;
  if (isError || !helps)
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load Help Requests"
      />
    );

  if (helps.length === 0) return <NoHelpFound onClear={() => {}} />;

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {helps.map((help) => (
        <HelpCard key={help.id} help={help} />
      ))}
    </div>
  );
};

export default HelpList;
