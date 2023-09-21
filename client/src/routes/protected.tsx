import { Navigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout";
import { authRoutes } from "@/features/auth";
import { usersRoutes } from "@/features/users";
import { Users } from "@/features/users";

const App = () => {
  return <MainLayout></MainLayout>;
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Users /> },
      ...authRoutes,
      ...usersRoutes,
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
