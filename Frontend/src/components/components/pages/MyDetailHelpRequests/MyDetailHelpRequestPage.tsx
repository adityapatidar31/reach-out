import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllHelpOfferByHelpId } from "@/services/apiService";
import HelpOfferCard from "./HelpOfferCard";
import Error from "../../Error";
import MyDetailHelpRequestPageLoading from "./MyDetailHelpRequestPageLoading";
import NoHelpOfferFound from "./NoHelpOfferFound";

function MyDetailHelpRequestPage() {
  const { id } = useParams();
  const helpId = Number(id);
  const userId = 1;

  const {
    data: helpOffers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["helpOfferOnHelp", userId, helpId],
    queryFn: () => getAllHelpOfferByHelpId(helpId),
  });

  if (isPending) {
    return <MyDetailHelpRequestPageLoading />;
  }

  if (!helpOffers || isError) {
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load help offer on this help."
      />
    );
  }

  if (helpOffers.length == 0) {
    return <NoHelpOfferFound />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        Total Help Offers for Request #{helpOffers.length}
      </h1>

      {helpOffers.map((offer) => (
        <HelpOfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default MyDetailHelpRequestPage;
