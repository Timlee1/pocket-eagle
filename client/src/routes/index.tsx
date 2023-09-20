import { useRoutes } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { useAuth } from "@/hooks/useAuth";
import { selectUserToken } from "@/features/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  useAuth();
  const token = useAppSelector(selectUserToken);
  const protectedRoutesUsed = useRoutes([...protectedRoutes]);
  const publicRoutesUsed = useRoutes([...publicRoutes]);
  console.log(token);
  if (token) {
    console.log("protected");
    return <>{protectedRoutesUsed}</>;
  } else {
    console.log("public");
    return <>{publicRoutesUsed}</>;
  }
};
