import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordUpdateSchema, TypePasswordUpdate } from "@/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword } from "@/services/apiService";
import { useAppDispatch } from "@/hooks/storeHooks";
import { addUser } from "@/store/userSlice";
import { SyncLoader } from "react-spinners";
import { handleApiError } from "@/utils/handleApiError";

function PasswordSection() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TypePasswordUpdate>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: TypePasswordUpdate) => updatePassword(data),
    onSuccess: (user) => {
      if (user) {
        dispatch(addUser(user));
      }
      toast.success("Password updated successfully!");
      reset();
    },
    onError: handleApiError,
  });

  const onSubmit = (data: TypePasswordUpdate) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 border-t flex flex-col items-end space-y-2"
    >
      <div className="w-full">
        <label className="text-sm font-medium">Current Password</label>
        <Input
          type="password"
          disabled={isSubmitting}
          placeholder="Enter current password"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label className="text-sm font-medium">New Password</label>
        <Input
          type="password"
          disabled={isSubmitting}
          placeholder="Enter new password"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          type="password"
          disabled={isSubmitting}
          placeholder="Confirm new password"
          {...register("newPasswordConfirm")}
        />
        {errors.newPasswordConfirm && (
          <p className="text-sm text-red-500 mt-1">
            {errors.newPasswordConfirm.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 text-white max-w-40"
      >
        {isSubmitting ? (
          <SyncLoader color="#FFF" size={8} />
        ) : (
          "Update Password"
        )}
      </Button>
    </form>
  );
}

export default PasswordSection;
