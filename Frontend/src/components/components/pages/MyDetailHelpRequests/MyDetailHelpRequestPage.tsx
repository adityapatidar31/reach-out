import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllHelpOfferByHelpId } from "@/services/apiService";
import HelpOfferCard from "./HelpOfferCard";
import Error from "../../Error";

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
    return <p>Load ho raha hai bhai thoda ruk</p>;
  }

  if (!helpOffers || isError) {
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load help offer on this help."
      />
    );
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
