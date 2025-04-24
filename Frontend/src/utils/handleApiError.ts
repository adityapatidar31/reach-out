import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { errorResponseSchema } from "@/schema/schema";

export const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  const apiError = axiosError.response?.data;

  const parsed = errorResponseSchema.safeParse(apiError);

  if (parsed.success) {
    toast.error(parsed.data.message);
  } else {
    toast.error("Something went wrong. Please try again.");
  }
};
