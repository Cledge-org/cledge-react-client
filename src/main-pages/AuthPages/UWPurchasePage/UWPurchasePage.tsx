import classNames from "classnames";
import { useEffect, useState } from "react";
import PurchasePageInput from "src/main-pages/AuthPages/UWPurchasePage/components/PurchasePageInput/PurchasePageInput";
import { callCreatePaymentIntent } from "src/utils/apiCalls";
import Stripe from "stripe";
import styles from "./uw-purchase-page.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import LoadingScreen from "src/common/components/Loading/Loading";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CircularProgress } from "@mui/material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const UWPurchasePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const asyncUseEffect = async () => {
    const { clientSecret } = await (
      await callCreatePaymentIntent("uw-package")
    ).json();
    setClientSecret(clientSecret);
    setIsLoading(false);
  };
  useEffect(() => {
    asyncUseEffect();
  }, []);
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <div
      className="d-flex flex-row justify-content-evenly w-100 py-4"
      style={{
        backgroundColor: "#F9FAFF",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "40%" }}
      >
        <div className={styles.blobContainer}>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
            Create an account
          </div>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "14px" }}>
            You’ll use this account to log in and access Cledge’s UW CS package
          </div>
          <PurchasePageInput
            heading={"Email*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Password*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Confirm password*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
        </div>
        <div
          id="payment-container"
          className={classNames(styles.blobContainer, "mt-4")}
        >
          <div
            className="cl-dark-text fw-bold pb-2"
            style={{ fontSize: "28px" }}
          >
            Payment method
          </div>
          {isLoading ? (
            <div className="center-child w-100 h-100">
              <CircularProgress className="cl-blue" />
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentElement />
            </Elements>
          )}
        </div>
        <div className={classNames(styles.blobContainer, "mt-4")}>
          <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
            Billing address
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <PurchasePageInput
              isShort
              heading={"First Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
            <PurchasePageInput
              isShort
              heading={"Last Name*"}
              placeholder={""}
              onChange={(value: string) => {}}
            />
          </div>
          <PurchasePageInput
            heading={"Address line 1*"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Address line 2"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"City"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"State"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Country"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
          <PurchasePageInput
            heading={"Zip Code"}
            placeholder={""}
            onChange={(value: string) => {}}
          />
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "40%" }}
      >
        <div
          className="ps-4 py-3 cl-dark-text fw-bold"
          style={{
            backgroundColor: "rgba(80, 107, 237, 0.2)",
            fontSize: "28px",
            width: "80%",
          }}
        >
          Purchase Summary
        </div>
        <div className={styles.blobContainer}>
          <div className="d-flex flex-row align-items-center justify-content-between fw-bold cl-dark-text">
            <div>University of Washington Computer Science Package</div>
            <div>$100</div>
          </div>
          <button
            className="cl-btn-blue w-100"
            style={{ borderRadius: "58x", fontSize: "18px" }}
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};
export default UWPurchasePage;
