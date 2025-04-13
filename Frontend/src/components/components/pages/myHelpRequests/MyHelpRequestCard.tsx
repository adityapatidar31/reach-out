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

interface MyHelpRequestCardProps {
  help: Help;
}

function MyHelpRequestCard({ help }: MyHelpRequestCardProps) {
  const [status, setStatus] = useState<HelpStatus>(help.status);

  const handleUpdateStatus = () => {
    console.log(`Update help ID ${help.id} to status: ${status}`);
    // 🔥 Call mutation here if needed
  };

  return (
    <div className="group transition-all duration-300 ease-in-out">
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{help.title}</h2>
              <div className="flex items-center gap-2 my-2">
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

                <Button onClick={handleUpdateStatus} className="text-white">
                  Update
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
          </div>
          <p className="text-xs text-muted-foreground">
            Created At: {format(new Date(help.createdAt), "PPP p")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyHelpRequestCard;
