import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createHelpOfferRequest } from "@/services/apiService";
import { queryClient } from "@/App";
import { toast } from "react-toastify";
import ApplyHelpOfferModalLoading from "./ApplyHelpOfferModalLoading";

type Props = {
  open: boolean;
  onClose: () => void;
  helpId: number;
};

const ApplyForHelpModal = ({ open, onClose, helpId }: Props) => {
  const [message, setMessage] = useState("");
  const maxLength = 1000;

  const { mutate, isPending } = useMutation({
    mutationFn: () => createHelpOfferRequest(helpId, message),
    onSuccess: () => {
      toast.success("Help offer submitted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["help-offer", helpId],
      });
      onClose();
      setMessage("");
    },
    onError: () => {
      toast.error("Failed to submit help offer. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (message.trim().length === 0) return;
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply for Help</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {isPending ? (
            <ApplyHelpOfferModalLoading />
          ) : (
            <>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={maxLength}
                placeholder="Write your message here..."
                className="min-h-[120px] mt-1"
              />
              <div className="text-right text-xs text-muted-foreground">
                {message.length}/{maxLength}
              </div>
              <div className="flex justify-center mt-3">
                <Button
                  className="text-white w-full"
                  onClick={handleSubmit}
                  disabled={isPending || message.trim().length === 0}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyForHelpModal;
