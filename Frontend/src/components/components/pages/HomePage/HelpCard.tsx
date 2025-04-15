import { Help } from "@/schema/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
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
        className="rounded-2xl shadow-md bg-background overflow-hidden 
                   group-hover:shadow-lg group-hover:ring-1 group-hover:ring-ring 
                   group-hover:scale-[1.01] transition-all duration-300 ease-in-out py-0"
      >
        {/* Image */}
        <img
          src={help.helpImageUrl}
          alt={help.title}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold truncate">
            {help.title}
          </CardTitle>

          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {help.categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          {/* Reward */}
          <p className="text-sm line-clamp-1">
            🎁 <span className="font-medium">{help.reward}</span>
          </p>

          {/* City */}
          <p className="text-xs text-muted-foreground">📍 {help.city}</p>
        </div>
      </Card>
    </Link>
  );
};

export default HelpCard;
