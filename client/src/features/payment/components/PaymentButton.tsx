import { useCreateCheckoutSessionMutation } from "../api/createCheckoutSession";

type Props = {
  priceId: string;
};

type CreateCheckoutSessionResponse = { url: string };

export const PaymentButton = ({ priceId }: Props) => {
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const checkout = () => async () => {
    //e.preventDefault(); //prevent default needed?
    try {
      const { url }: CreateCheckoutSessionResponse =
        await createCheckoutSession({
          priceId,
        }).unwrap();
      location.href = url;
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={checkout()}>Buy Now</button>;
};
