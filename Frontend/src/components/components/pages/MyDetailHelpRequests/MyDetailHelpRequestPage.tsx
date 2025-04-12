import { getAllHelpOfferByHelpId } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function MyDetailHelpRequestPage() {
  const { id } = useParams();
  console.log(id);
  const helpId = Number(id);
  const userId = 1;
  const { data: helpOffer } = useQuery({
    queryKey: ["helpOfferOnHelp", userId, helpId],
    queryFn: () => getAllHelpOfferByHelpId(helpId),
  });
  console.log(helpOffer);
  return <div></div>;
}

export default MyDetailHelpRequestPage;
