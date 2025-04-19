import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./storeHooks";

export const useAuth = () => {
  const user = useAppSelector((store) => store.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [user, navigate, location]);

  return user;
};
