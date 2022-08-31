import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import PurchasePageInput from "src/main-pages/AuthPages/UWPurchasePage/components/PurchasePageInput/PurchasePageInput";
import {
  alertSlackNewUser,
  callCreatePaymentIntent,
  callCreateUser,
  callUpdateUser,
  getNumUsers,
} from "src/utils/apiCalls";
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
import { signIn, useSession } from "next-auth/react";
import CheckBox from "src/common/components/CheckBox/CheckBox";
import { store } from "src/utils/redux/store";
import { connect } from "react-redux";
import { updateAccountAction } from "src/utils/redux/actionFunctions";

const UWPurchasePage = ({ accountInfo }: { accountInfo: AccountInfo }) => {
  const [issues, setIssues] = useState([]);
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
    isOnMailingList: true,
  });
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();

  const onChangeSignUp = (
    parameter: "email" | "password" | "confirmedPassword" | "isOnMailingList",
    newValue: string | boolean
  ) => {
    setSignUpDetails({
      ...signUpDetails,
      [parameter]: newValue,
    });
  };

  const handleSubmit = async () => {
    if (session.status === "authenticated") {
      await stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: window.location.origin + "/dashboard",
          },
        })
        .then(() => {
          callUpdateUser({ ...accountInfo, hasUWAccess: true });
          store.dispatch(
            updateAccountAction({ ...accountInfo, hasUWAccess: true })
          );
        })
        .catch((error) => {
          setIssues((issues) => [...issues, error.message]);
        });
    } else {
      if (
        !signUpDetails.email ||
        !signUpDetails.password ||
        !signUpDetails.confirmedPassword
      ) {
        setIssues((issues) => [
          ...issues,
          "Please make sure to fill out all fields",
        ]);
        return;
      }
      if (signUpDetails.password !== signUpDetails.confirmedPassword) {
        setIssues((issues) => [
          ...issues,
          "Your confirmed password isn't the same as your password",
        ]);
        return;
      }
      await callCreateUser(signUpDetails.email, signUpDetails.password, {
        name: "",
        address: "",
        birthday: new Date(),
        isOnMailingList: signUpDetails.isOnMailingList,
        grade: -1,
        email: signUpDetails.email,
        tags: [],
        introducedToChatbot: false,
        hasUWAccess: false,
        checkIns: ["Onboarding Questions"],
      })
        .then(async (res) => {
          const result = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
              return_url: "",
            },
          });
          if (result.error) {
            alertSlackNewUser(parseInt(await getNumUsers()) - 36);
            setIssues((issues) => [...issues, result.error.message]);
            signIn("credentials", {
              password: signUpDetails.password,
              email: signUpDetails.email,
              redirect: false,
            });
            return;
          }
          signIn("credentials", {
            password: signUpDetails.password,
            email: signUpDetails.email,
            callbackUrl: `${window.location.origin}/dashboard`,
          }).then(() => {
            callUpdateUser({ ...accountInfo, hasUWAccess: true });
            store.dispatch(
              updateAccountAction({ ...accountInfo, hasUWAccess: true })
            );
          });
        })
        .catch((err) => {
          console.error(err);
        });
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
        <div className="cl-red d-flex flex-column" style={{ width: "80%" }}>
          {issues.map((issue) => (
            <div>{issue}</div>
          ))}
        </div>
        {session.status === "unauthenticated" && (
          <div
            className={classNames(styles.blobContainer, {
              ["mt-3"]: issues.length > 0,
            })}
          >
            <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
              Create an account
            </div>
            <div className="cl-dark-text fw-bold" style={{ fontSize: "14px" }}>
              You’ll use this account to log in and access Cledge’s UW CS
              package
            </div>
            <PurchasePageInput
              heading={"Email*"}
              placeholder={"you@example.com"}
              onChange={(value: string) => {
                onChangeSignUp("email", value);
              }}
            />
            <PurchasePageInput
              heading={"Password*"}
              placeholder={"********"}
              isPassword
              onChange={(value: string) => {
                onChangeSignUp("password", value);
              }}
            />
            <PurchasePageInput
              heading={"Confirm password*"}
              placeholder={"********"}
              isPassword
              onChange={(value: string) => {
                onChangeSignUp("confirmedPassword", value);
              }}
            />
            <div className="d-flex flex-row mt-3">
              <CheckBox
                selected={!signUpDetails.isOnMailingList}
                setSelected={(value) => {
                  onChangeSignUp("isOnMailingList", !value);
                }}
              />
              <div className="ms-2">
                I don’t want to receive emails about Cledge and feature updates,
                free webinar notifications and promotions from Cledge.
              </div>
            </div>
          </div>
        )}
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
          <PaymentElement />
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
          <div
            className="d-flex flex-row align-items-center justify-content-between fw-bold cl-dark-text py-3"
            style={{ fontSize: "24px" }}
          >
            <div>University of Washington Computer Science Package</div>
            <div className="ms-3">$100</div>
          </div>
          <button
            onClick={() => {
              setIssues([]);
              handleSubmit();
            }}
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
export default connect((state) => {
  return {
    accountInfo: state?.accountInfo,
  };
})(UWPurchasePage);
