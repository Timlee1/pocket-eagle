import { useCreateCustomerPortalSessionMutation } from "../api/createCustomerPortalSession";

type CreateCheckoutSessionResponse = { url: string };

export const ManageBillingButton = () => {
  const [createCustomerPortalSessionMutation] =
    useCreateCustomerPortalSessionMutation();

  const manageBilling = () => async () => {
    //e.preventDefault(); //prevent default needed?
    try {
      const { url }: CreateCheckoutSessionResponse =
        await createCustomerPortalSessionMutation({}).unwrap();
      console.log(url);
      location.href = url;
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={manageBilling()}>Manage Billing</button>;
};
