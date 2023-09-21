import { Profile } from "./Profile";
import { Users } from "../components/Users";

export const usersRoutes: {
  path: string;
  element: JSX.Element;
}[] = [
  { path: "profile", element: <Profile /> },
  { path: "users", element: <Users /> },
];
