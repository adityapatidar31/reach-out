// MyHelpRequestCard.tsx
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HelpStatus } from "@/types/enums";
import { Help } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { updateHelpStatusById } from "@/services/apiService";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/handleApiError";

interface MyHelpRequestCardProps {
  help: Help;
}

function MyHelpRequestCard({ help }: MyHelpRequestCardProps) {
  const [status, setStatus] = useState<HelpStatus>(help.status);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return updateHelpStatusById(help.id, status);
    },
    onSuccess: () => {
      toast.success("Status Updated Successfully");
    },
    onError: handleApiError,
  });

  return (
    <div
      className="group transition-all duration-300 ease-in-out hover:cursor-pointer"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.closest("button") ||
          target.closest("select") ||
          target.closest("[role='combobox']") // for SelectTrigger
        ) {
          e.stopPropagation();
        } else {
          navigate(`/my-help-requests/${help.id}`);
        }
      }}
    >
      <div
        className="flex flex-col md:flex-row gap-4  rounded-xl shadow bg-background
            group-hover:shadow-lg group-hover:ring-ring 
            group-hover:scale-[1.01] transition-all duration-300 ease-in-out"
      >
        <img
          src={help.helpImageUrl}
          alt={help.title}
          className="w-full md:w-60 h-40 object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between space-y-2 w-full">
          <div>
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center">
              <h2 className="text-xl font-semibold">{help.title}</h2>
              <div className="flex items-center flex-row gap-2 my-2">
                <Select
                  value={status}
                  onValueChange={(val) => setStatus(val as HelpStatus)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={HelpStatus.OPEN}>Open</SelectItem>
                    <SelectItem value={HelpStatus.FULFILLED}>
                      Fulfilled
                    </SelectItem>
                    <SelectItem value={HelpStatus.CANCELLED}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => mutate()}
                  className="text-white hover:cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? <SyncLoader color="#fff" size={10} /> : "Update"}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              📍 {help.area}, {help.city}, {help.state}, {help.country} -{" "}
              {help.pincode}
            </p>
            <p className="text-sm">🎁 Reward: {help.reward}</p>
            <p className="text-sm">🧭 Type: {help.type}</p>

            <div className="flex flex-wrap gap-2 mt-2">
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
      </div>
    </div>
  );
}

export default MyHelpRequestCard;
