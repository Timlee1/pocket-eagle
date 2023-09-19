import { Register } from "./Register";
import { Login } from "./Login";

export const authRoutes: {
  path: string;
  element: JSX.Element;
}[] = [
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
];
