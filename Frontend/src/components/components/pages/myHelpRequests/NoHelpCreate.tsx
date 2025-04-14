import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NoHelpCreate() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        No Help Requests Found
      </h2>
      <p className="text-muted-foreground max-w-md">
        You haven't created any help requests yet. Click below to create your
        first one!
      </p>
      <Button
        onClick={() => navigate("/create-help-request")}
        className="mt-4 text-white"
      >
        Create Help Request
      </Button>
    </div>
  );
}

export default NoHelpCreate;
