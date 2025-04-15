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
import { HeartHandshake } from "lucide-react";
import { useState } from "react";
import ApplyForHelpModal from "./ApplyHelpOfferModal";
import LoadingComponent from "./HelpPageLoading";
import Error from "../../Error";

function HelpPage() {
  const { id } = useParams();
  const helpId = Number(id);
  const userId = 1;

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (helpLoading || offerLoading) return <LoadingComponent />;
  if (helpError || !help)
    return (
      <Error
        onRetry={() => window.location.reload()}
        message="Failed to load Help Request"
      />
    );

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
        </div>
      </div>

      {!helpOffer && (
        <Button
          className="w-full max-w-xs text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Apply for Help
        </Button>
      )}
      {helpOffer && (
        <div className="mt-8 p-4 border rounded-2xl shadow bg-muted space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Your Help Offer</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar>
                {/* <AvatarImage src={helpOffer.imageUrl || undefined} /> */}
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Aditya</p>
                <p className="text-xs text-muted-foreground">
                  Applied on {format(new Date(helpOffer.createdAt), "PPP p")}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                {helpOffer.status}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Message:</span>{" "}
                {helpOffer.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for applying */}
      <ApplyForHelpModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        helpId={helpId}
        userId={userId}
      />
    </div>
  );
}

export default HelpPage;
