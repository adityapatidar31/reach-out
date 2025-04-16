import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const user = useCurrentUser();
  useAuth();
  if (!user) {
    return;
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left - Profile Image Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={user.imageUrl || "./default.jpg"}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border"
          />
          <Button className="mt-4 text-white">Update Profile Image</Button>
        </div>

        {/* Right - Form Section */}
        <div className="md:w-2/3 space-y-6">
          <CardContent className="space-y-4">
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
              <Button className="mt-4 text-white max-w-40">
                Update Password
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
