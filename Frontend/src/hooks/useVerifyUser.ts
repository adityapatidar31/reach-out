import { useQuery } from "@tanstack/react-query";
import { verifyUserToken } from "@/services/apiService";
import { useAppDispatch } from "./storeHooks";
import { addUser } from "@/store/userSlice";
import { useEffect } from "react";

export const useVerifyUser = () => {
  const dispatch = useAppDispatch();

  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: verifyUserToken,
  });

  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  return { isPending, isError };
};
