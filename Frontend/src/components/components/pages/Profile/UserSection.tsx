import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function UserSection() {
  const user = useCurrentUser();
  if (!user) return;
  return (
    <>
      <div>
        <label className="text-sm font-medium">Name</label>
        <div className="flex items-center gap-2">
          <Input defaultValue={user.name} />
          <Button className="text-white">Update Name</Button>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input defaultValue={user.email} disabled />
      </div>
    </>
  );
}

export default UserSection;
