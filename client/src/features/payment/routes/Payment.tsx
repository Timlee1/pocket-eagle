import { ManageBillingButton } from "../components/ManageBillingButton";
import { PaymentButton } from "../components/PaymentButton";

export const Payment = () => {
  return (
    <>
      <PaymentButton priceId="price_1NtDWDBoiFCB9Zun8w4cF2Mm" />
      <PaymentButton priceId="price_1NtDXzBoiFCB9Zun2WMd8mEx" />
      <ManageBillingButton />
    </>
  );
};
