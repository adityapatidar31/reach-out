import { HeartHandshake } from "lucide-react";
import HelpList from "./HelpList";

function HomePage() {
  return (
    <div className="py-8">
      <div className="flex items-center mb-6 gap-3">
        <HeartHandshake className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Help Requests</h2>
      </div>
      <HelpList />
    </div>
  );
}

export default HomePage;
