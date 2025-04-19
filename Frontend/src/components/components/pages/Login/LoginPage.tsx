import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser } from "@/store/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { loginUser } from "@/services/apiService";
import {
  errorResponseSchema,
  LoginFormData,
  loginSchema,
} from "@/schema/schema";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useVerifyUser } from "@/hooks/useVerifyUser"; // <== assuming this hook auto-loads user from cookie

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.user);
  const { isPending: isVerifying } = useVerifyUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Save previous route path (default to "/")
  const from = location.state?.from?.pathname || "/";

  // 🔁 If user gets auto-loaded after arriving at login, redirect back
  useEffect(() => {
    if (!isVerifying && user) {
      navigate(from, { replace: true });
    }
  }, [user, isVerifying, navigate, from]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await loginUser(data);
    },
    onSuccess: (user) => {
      if (user) dispatch(addUser(user));
      navigate(from, { replace: true }); // <== go back to where user came from
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;
      const parsed = errorResponseSchema.safeParse(apiError);

      if (parsed.success) {
        toast.error(parsed.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
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
            <Link to="/sign-up" className="text-primary hover:underline">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
