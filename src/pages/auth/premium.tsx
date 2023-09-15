import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptionsMode, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import LoadingScreen from "src/common/components/Loading/Loading";
import { getEnvVariable } from "src/config/getConfig";
import PremiumPurchasePage from "src/main-pages/AuthPages/PremiumPurchasePage/PremiumPurchasePage";
import { callCreatePaymentIntent } from "src/utils/apiCalls";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const PremiumPurchase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(4999);
  
  const options: StripeElementsOptionsMode = {
    mode: 'payment',
    amount: amount,
    currency: 'usd',
    paymentMethodCreation: 'manual',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  const handleDiscountCode = (newAmount: number) => {
    setAmount(newAmount * 100);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <PremiumPurchasePage handleDiscountCode={(e) => handleDiscountCode(e)} />
    </Elements>
  );
};
export default PremiumPurchase;
