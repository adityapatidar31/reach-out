import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHelpById } from "@/services/apiService";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HelpOfferSection from "./HelpOfferSection";
import LoadingComponent from "./HelpPageLoading";
import Error from "../../Error";

function HelpPage() {
  const { id } = useParams();
  const helpId = Number(id);

  const {
    data: help,
    isLoading: helpLoading,
    isError: helpError,
  } = useQuery({
    queryKey: ["help", helpId],
    queryFn: () => getHelpById(helpId),
  });

  if (helpLoading) return <LoadingComponent />;
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

      <HelpOfferSection helpId={helpId} />
    </div>
  );
}

export default HelpPage;
