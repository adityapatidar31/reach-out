import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser } from "@/store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/storeHooks";
import { loginUser } from "@/services/apiService";
import {
  errorResponseSchema,
  LoginFormData,
  loginSchema,
} from "@/schema/schema";
import { AxiosError } from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await loginUser(data);
    },
    onSuccess: (user) => {
      if (user) dispatch(addUser(user));
      navigate("/");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;

      console.log(axiosError);
      const apiError = axiosError.response?.data;

      const parsed = errorResponseSchema.safeParse(apiError);

      if (parsed.success) {
        toast.error(parsed.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center md:mt-30 sm:mt-20 mt-4  bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="w-full text-white"
              disabled={isPending}
            >
              {isPending ? <SyncLoader color="#fff" size={10} /> : "Login"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/signup" className="text-primary hover:underline">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
