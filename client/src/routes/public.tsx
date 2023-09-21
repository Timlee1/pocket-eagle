import { Navigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout";
import { authRoutes } from "@/features/auth";
import { Users } from "@/features/users";

const App = () => {
  return <MainLayout></MainLayout>;
};

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Users /> },
      ...authRoutes,
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
