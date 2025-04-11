import { Button } from "@/components/ui/button";
import { getAllHelpRequest } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const {
    data: helps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["helps"],
    queryFn: getAllHelpRequest,
  });

  if (isLoading) {
    <p>Loading ...</p>;
  }
  if (isError) {
    <p>There is a error in Loading Page</p>;
  }

  return (
    <div>
      <p>HomePage</p>
      <Button>Click Me</Button>
    </div>
  );
}

export default HomePage;
