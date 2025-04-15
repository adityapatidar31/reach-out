import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./storeHooks";

export const useAuth = () => {
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user;
};
