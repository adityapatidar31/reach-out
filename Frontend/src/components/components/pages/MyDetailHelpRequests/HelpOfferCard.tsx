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
import { errorResponseSchema, helpOfferWithUser } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import {
  createConversation,
  updateHelpOfferStatusById,
} from "@/services/apiService";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type HelpOfferCardProps = {
  offer: helpOfferWithUser;
};

function HelpOfferCard({ offer }: HelpOfferCardProps) {
  const navigate = useNavigate();
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

  const { mutate: connectMutate, isPending: isConnectPending } = useMutation({
    mutationFn: () => {
      return createConversation(offer.helpId, offer.id, offer.userId);
    },
    onSuccess: () => {
      // Todo invalidate the message page
      navigate("/messages");
      toast.success("You can start conversation ");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;

      const parsed = errorResponseSchema.safeParse(apiError);
      if (parsed.success) toast.error(parsed.data.message);
      else toast.error("Failed to update help offer");
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

        <div className="flex-1 space-y-2 ">
          <div className="flex sm:flex-row flex-col justify-between">
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

          <div className="flex justify-between flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>📅 Created At: {format(new Date(offer.createdAt), "PPP p")}</p>
              {offer.updatedAt && (
                <p>
                  ✏️ Updated At: {format(new Date(offer.updatedAt), "PPP p")}
                </p>
              )}
            </div>
            {isConnectPending ? (
              <Skeleton className="sm:h-10 sm:w-[110px] w-80 h-10 rounded-md" />
            ) : (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => connectMutate()}
                disabled={isConnectPending}
              >
                <Send className="h-4 w-4" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HelpOfferCard;
