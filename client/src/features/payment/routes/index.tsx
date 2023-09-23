import { Payment } from "./Payment";

export const paymentRoutes: {
  path: string;
  element: JSX.Element;
}[] = [{ path: "payment", element: <Payment /> }];
