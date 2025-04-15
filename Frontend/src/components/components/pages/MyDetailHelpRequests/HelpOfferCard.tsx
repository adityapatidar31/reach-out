import { useState } from "react";
import { SyncLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HelpOfferStatus } from "@/types/enums";
import { format } from "date-fns";
import { helpOfferWithUser } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { updateHelpOfferStatusById } from "@/services/apiService";
import { toast } from "react-toastify";
import { queryClient } from "@/App";

type HelpOfferCardProps = {
  offer: helpOfferWithUser;
};

function HelpOfferCard({ offer }: HelpOfferCardProps) {
  const [status, setStatus] = useState<HelpOfferStatus>(offer.status);
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return updateHelpOfferStatusById(offer.id, status);
    },
    onSuccess: () => {
      toast.success("Status update successfully");
      queryClient.invalidateQueries({
        queryKey: ["help-offer-on-help", offer.helpId],
      });
    },
    onError: () => {
      toast.error("Failed to update help offer");
    },
  });

  return (
    <div className="group transition-all duration-300 ease-in-out">
      <Card
        className="p-4 rounded-xl shadow flex flex-col md:flex-row gap-4
                   transition-all duration-300 ease-in-out
                   group-hover:shadow-lg group-hover:ring-ring group-hover:scale-[1.01]"
      >
        <div className="flex justify-center">
          <img
            src={offer.userImageUrl || "/default-avatar.jpg"}
            alt={offer.userName}
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="font-semibold text-lg">{offer.userName}</h2>
              <p className="text-sm text-muted-foreground">{offer.userEmail}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as HelpOfferStatus)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={HelpOfferStatus.PENDING}>
                    Pending
                  </SelectItem>
                  <SelectItem value={HelpOfferStatus.ACCEPTED}>
                    Accepted
                  </SelectItem>
                  <SelectItem value={HelpOfferStatus.DECLINED}>
                    Declined
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="default"
                className="text-white"
                onClick={() => mutate()}
                disabled={isPending}
              >
                {isPending ? <SyncLoader color="#fff" size={10} /> : "Update"}
              </Button>
            </div>
          </div>

          <p className="text-sm">{offer.message}</p>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>📅 Created At: {format(new Date(offer.createdAt), "PPP p")}</p>
            {offer.updatedAt && (
              <p>✏️ Updated At: {format(new Date(offer.updatedAt), "PPP p")}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HelpOfferCard;
