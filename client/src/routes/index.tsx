import { useRoutes } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { useAuth } from "@/hooks/useAuth";
import { selectUserToken } from "@/features/auth";

import { protectedRoutes } from "./protected";
// import { publicRoutes } from './public';

export const AppRoutes = () => {
  useAuth();
  const token = useAppSelector(selectUserToken);
  console.log(token);

  // const commonRoutes = [{ path: "/", element: <Landing /> }];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  // const element = useRoutes([...routes, ...commonRoutes]);

  const element = useRoutes([...protectedRoutes]);

  return <>{element}</>;
};
