import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@/hooks/useAuth";
import ImageSection from "./ImageSection";
import RightSection from "./RightSection";

const ProfilePage = () => {
  const user = useCurrentUser();
  useAuth();

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left - Profile Image Section */}
        <ImageSection />

        {/* Right - Form Section */}
        <RightSection />
      </Card>
    </div>
  );
};

export default ProfilePage;
