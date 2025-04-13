import { Help } from "@/schema/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
  help: Help;
};

const HelpCard = ({ help }: Props) => {
  return (
    <Link
      to={`/help/${help.id}`}
      className="group transition-all duration-300 ease-in-out"
    >
      <Card
        className="rounded-2xl shadow-md bg-background py-0 text-foreground overflow-hidden 
                   group-hover:shadow-lg group-hover:ring-ring 
                   group-hover:scale-[1.01] transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3">
            <img
              src={help.helpImageUrl}
              alt={help.title}
              className="w-full h-48 md:h-full object-cover rounded-2xl md:rounded-none md:rounded-l-2xl"
            />
          </div>

          {/* Content */}
          <div className="md:w-2/3 p-4 space-y-2">
            <CardTitle className="text-xl">{help.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {help.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{help.description}</p>
            <p className="text-sm font-medium">
              📍 {help.area}, {help.city}, {help.state}, {help.country} -{" "}
              {help.pincode}
            </p>
            <p className="text-sm">🎁 Reward: {help.reward}</p>
            <p className="text-sm">🧭 Type: {help.type}</p>

            <p className="text-xs text-muted-foreground">
              Created At: {format(new Date(help.createdAt), "PPP p")}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default HelpCard;
