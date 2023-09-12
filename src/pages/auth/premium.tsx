import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { getEnvVariable } from "src/config/getConfig";
import PremiumPurchasePage from "src/main-pages/AuthPages/PremiumPurchasePage/PremiumPurchasePage";
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
      await callCreatePaymentIntent("premium")
    ).json();
    setClientSecret(clientSecret);
  };

  const handlePromoCode = async (discountedPrice: number) => {
    const { clientSecret } = await (
      await callCreatePaymentIntent(discountedPrice + "")
    ).json();
    setClientSecret(clientSecret);
  }

  useEffect(() => {
    asyncUseEffect();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PremiumPurchasePage handlePromo={(e) => handlePromoCode(e)} />
    </Elements>
  );
};
export default UWPurchase;
