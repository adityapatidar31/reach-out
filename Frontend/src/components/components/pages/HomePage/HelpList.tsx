import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAllHelpRequest } from "@/services/apiService";
import HelpCard from "./HelpCard";
import HomePageLoading from "./HomePageLoading";
import NoHelpFound from "./NoHelpFound";
import Error from "../../Error";

const HelpList = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";

  const {
    data: helps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["helps", search, sort, category, status],
    queryFn: () =>
      getAllHelpRequest({
        search,
        sort,
        category,
        status,
      }),
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
