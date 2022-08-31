import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import UWPurchasePage from "src/main-pages/AuthPages/UWPurchasePage/UWPurchasePage";
import { callCreatePaymentIntent } from "src/utils/apiCalls";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const UWPurchase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    if (clientSecret) {
      setIsLoading(false);
    }
  }, [clientSecret]);
  const asyncUseEffect = async () => {
    const { clientSecret } = await (
      await callCreatePaymentIntent("uw-package")
    ).json();
    setClientSecret(clientSecret);
  };
  useEffect(() => {
    asyncUseEffect();
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <UWPurchasePage />
    </Elements>
  );
};
export default UWPurchase;
