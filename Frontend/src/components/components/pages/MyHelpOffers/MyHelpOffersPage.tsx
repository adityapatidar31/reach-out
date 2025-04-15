import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getAllHelpOfferByMe } from "@/services/apiService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HomeError from "../../Error";
import { useAuth } from "@/hooks/useAuth";

function MyHelpOffersPage() {
  useAuth();
  const {
    data: helpOffers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-help-offers"],
    queryFn: () => getAllHelpOfferByMe(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !helpOffers)
    return <HomeError onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Help Offers</h1>
      {helpOffers.length === 0 && <p>You haven't offered help yet.</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        {helpOffers.map((offer) => (
          <div
            key={offer.id}
            className="group transition-all duration-300 ease-in-out"
          >
            <Card
              className="flex flex-col sm:flex-row overflow-hidden rounded-2xl py-0 shadow-md bg-background text-foreground 
                         group-hover:shadow-lg group-hover:ring-ring 
                         group-hover:scale-[1.01] transition-all duration-300 ease-in-out"
            >
              <img
                src={offer.help.helpImageUrl}
                alt={offer.help.title}
                className="w-full sm:w-1/3 h-64 sm:h-auto object-cover"
              />
              <CardContent className="p-4 flex-1 space-y-2">
                <h2 className="text-lg font-semibold">{offer.help.title}</h2>

                <p className="text-sm text-muted-foreground">
                  📍 {offer.help.area}, {offer.help.city}, {offer.help.state},{" "}
                  {offer.help.country} - {offer.help.pincode}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Message:</span>{" "}
                  {offer.message}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  <Badge variant="outline">{offer.status}</Badge>
                </p>

                <p className="text-xs text-muted-foreground">
                  Offered on {format(new Date(offer.createdAt), "PPP p")}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHelpOffersPage;
