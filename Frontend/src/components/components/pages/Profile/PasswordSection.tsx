import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PasswordSection() {
  return (
    <div className="pt-4 border-t flex flex-col items-end">
      <div className="w-full">
        <label className="text-sm font-medium">Current Password</label>
        <Input type="password" placeholder="Enter current password" />
      </div>
      <div className="mt-2 w-full">
        <label className="text-sm font-medium">New Password</label>
        <Input type="password" placeholder="Enter new password" />
      </div>
      <div className="mt-2 w-full">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input type="password" placeholder="Confirm new password" />
      </div>
      <Button className="mt-4 text-white max-w-40">Update Password</Button>
    </div>
  );
}

export default PasswordSection;
