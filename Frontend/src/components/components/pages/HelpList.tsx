import { Help } from "@/schema/helpSchema";
import HelpCard from "./HelpCard";

const HelpList = ({ helps }: { helps: Help[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {helps.map((help) => (
        <HelpCard key={help.id} help={help} />
      ))}
    </div>
  );
};

export default HelpList;
