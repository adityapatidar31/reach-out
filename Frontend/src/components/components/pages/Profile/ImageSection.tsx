import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateUserProfileImage } from "@/services/apiService";
import { toast } from "react-toastify";
import { imageSchema, ImageType } from "@/schema/schema";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addUser } from "@/store/userSlice";
import { SyncLoader } from "react-spinners";

function ImageSection() {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ImageType>({
    resolver: zodResolver(imageSchema),
  });

  const { mutate: updateImage, isPending: updating } = useMutation({
    mutationFn: updateUserProfileImage,
    onSuccess: (user) => {
      if (user) dispatch(addUser(user));
      toast.success("Profile image updated successfully");
      reset();
      setPreviewUrl(null); // Clear preview after successful upload
    },
    onError: () => toast.error("Failed to update profile image"),
  });

  const onSubmit = (data: ImageType) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    updateImage(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center md:w-1/3">
      <img
        src={previewUrl || user?.imageUrl || "./default-image.jpg"}
        alt={user.name}
        className="w-40 h-40 object-cover rounded-full border"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-4"
      >
        <Input
          type="file"
          accept=".jpg"
          {...register("image")}
          onChange={(e) => {
            handleImageChange(e);
            register("image").onChange(e);
          }}
        />
        {typeof errors.image?.message === "string" && (
          <span className="text-sm text-red-500">{errors.image.message}</span>
        )}
        <Button type="submit" disabled={updating} className="text-white">
          {updating ? (
            <SyncLoader color="#FFF" size={10} />
          ) : (
            "Update Profile Image"
          )}
        </Button>
      </form>
    </div>
  );
}

export default ImageSection;
