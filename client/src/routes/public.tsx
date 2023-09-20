import { MainLayout } from "@/components/Layout";
import { Users } from "@/features/users";
import { Navigate } from "react-router-dom";
import { authRoutes } from "@/features/auth";

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
