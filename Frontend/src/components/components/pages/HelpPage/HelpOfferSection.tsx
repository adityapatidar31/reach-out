import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHelpOfferByHelpAndUserId } from "@/services/apiService";
import { HeartHandshake } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ApplyForHelpModal from "./ApplyHelpOfferModal";
import LoadingComponent from "./HelpPageLoading";

type Props = {
  helpId: number;
};

const HelpOfferSection = ({ helpId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: helpOffer, isLoading } = useQuery({
    queryKey: ["help-offer", helpId],
    queryFn: () => getHelpOfferByHelpAndUserId(helpId),
  });

  if (isLoading) return <LoadingComponent />;

  return (
    <>
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

      <ApplyForHelpModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        helpId={helpId}
      />
    </>
  );
};

export default HelpOfferSection;
