import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorResponseSchema, nameSchema, NameType } from "@/schema/schema";
import { updateUserName } from "@/services/apiService";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addUser } from "@/store/userSlice";
import { AxiosError } from "axios";

function UserSection() {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NameType>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (name: NameType) => updateUserName(name),
    onSuccess: (user) => {
      if (user) {
        dispatch(addUser(user));
      }
      toast.success("Name updated successfully!");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;
      const parsedError = errorResponseSchema.safeParse(apiError);
      if (parsedError.success) toast.error(parsedError.data.message);
      else toast.error("Failed to update name.");
    },
  });

  if (!user) return null;

  const onSubmit = (data: NameType) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <div className="flex items-center gap-2">
          <Input {...register("name")} />
          <Button type="submit" disabled={isSubmitting} className="text-white">
            {isSubmitting ? "Updating..." : "Update Name"}
          </Button>
        </div>
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input value={user.email} disabled />
      </div>
    </form>
  );
}

export default UserSection;
