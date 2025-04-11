import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getHelpById,
  getHelpOfferByHelpAndUserId,
} from "@/services/apiService";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HelpPage() {
  const { id } = useParams();
  const helpId = Number(id);
  const userId = 3; // hardcoded for now

  const {
    data: help,
    isLoading: helpLoading,
    isError: helpError,
  } = useQuery({
    queryKey: ["help", helpId],
    queryFn: () => getHelpById(helpId),
  });

  const { data: helpOffer, isLoading: offerLoading } = useQuery({
    queryKey: ["help-offer", helpId, userId],
    queryFn: () => getHelpOfferByHelpAndUserId(helpId, userId),
  });

  if (helpLoading || offerLoading) return <p>Loading...</p>;
  if (helpError || !help) return <p>Error loading help request.</p>;

  const creator = help.createdBy;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Part A: Help Details */}
      <div className="rounded-2xl shadow bg-background overflow-hidden">
        <img
          src={help.helpImageUrl}
          alt={help.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 space-y-3">
          <h1 className="text-3xl font-bold">{help.title}</h1>
          <p className="text-muted-foreground">{help.description}</p>
          <p className="text-sm">
            📍 {help.area}, {help.city}, {help.state}, {help.country} -{" "}
            {help.pincode}
          </p>
          <p className="text-sm">🎁 Reward: {help.reward}</p>
          <p className="text-sm">🧭 Type: {help.type}</p>
          <p className="text-sm">🟢 Status: {help.status}</p>
          <div className="flex flex-wrap gap-2">
            {help.categories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Created At: {format(new Date(help.createdAt), "PPP p")}
          </p>
        </div>
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-4 p-4 border rounded-2xl shadow-sm bg-muted">
        <Avatar>
          <AvatarImage src={creator.imageUrl || undefined} />
          <AvatarFallback>{creator.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{creator.name}</p>
          <p className="text-xs text-muted-foreground">{creator.email}</p>
        </div>
      </div>

      {/* Part B: Action Button */}
      <div>
        {helpOffer?.id ? (
          <Button disabled variant="outline">
            ✅ Applied
          </Button>
        ) : (
          <Button>Apply to Help</Button>
        )}
      </div>
    </div>
  );
}

export default HelpPage;
