import { MainLayout } from "@/components/Layout";
import { Users } from "@/features/users";
import { Navigate } from "react-router-dom";

const App = () => {
  return <MainLayout></MainLayout>;
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/discussions/*", element: <DiscussionsRoutes /> },
      { path: "/users", element: <Users /> },
      // { path: "/profile", element: <Profile /> },
      { path: "/", element: <Users /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
