import { useRoutes } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const { authState, user } = useAuth();
  console.log(user);
  const UseProtectedRoutes = useRoutes([...protectedRoutes]);
  const UsePublicRoutes = useRoutes([...publicRoutes]);

  if (authState.initializing) {
    return <div>Loading</div>;
  } else if (authState.authenticated) {
    return <>{UseProtectedRoutes}</>;
  } else {
    return <>{UsePublicRoutes}</>;
  }
};
