import classNames from "classnames";
import { useState } from "react";
import PurchasePageInput from "src/main-pages/AuthPages/UWPurchasePage/components/PurchasePageInput/PurchasePageInput";
import {
  alertSlackNewUser,
  callCreateUser,
  callUpdateUser,
  getNumUsers,
} from "src/utils/apiCalls";
import styles from "./uw-purchase-page.module.scss";
import {
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
import { useRouter } from "next/router";

const UWPurchasePage = ({ accountInfo }: { accountInfo: AccountInfo }) => {
  const [issues, setIssues] = useState([]);
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
    isOnMailingList: true,
  });
  const [accessCode, setAccessCode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [processingSignUpPayment, setProcessingSignUpPayment] = useState(false);
  const [isIncorrectAccessCode, setIsIncorrectAccessCode] = useState(false);
  const [acceptedTOSPP, setAcceptedTOSPP] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const session = useSession();
  const router = useRouter();

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
    if (!acceptedTOSPP) {
      setIssues((issues) => [
        ...issues,
        "If you want to make an account you must agree to the terms of service and privacy policy",
      ]);
      setProcessingSignUpPayment(false);
      return;
    }
    if (session.status === "authenticated") {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: "",
        },
      });
      if (result.error) {
        setIssues((issues) => [...issues, result.error.message]);
        setProcessingSignUpPayment(false);
      } else {
        callUpdateUser({ ...accountInfo, hasUWAccess: true });
        store.dispatch(
          updateAccountAction({
            ...accountInfo,
            hasUWAccess: true,
          })
        );
        router.push("/my-learning");
      }
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
        setProcessingSignUpPayment(false);
        return;
      }
      if (signUpDetails.password !== signUpDetails.confirmedPassword) {
        setIssues((issues) => [
          ...issues,
          "Your confirmed password isn't the same as your password",
        ]);
        setProcessingSignUpPayment(false);
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
        chatbotHistoryLength: 0,
        hasUWAccess: true,
        checkIns: ["Onboarding Questions"],
      })
        .then(async (res) => {
          alertSlackNewUser(parseInt(await getNumUsers()) - 36);
          const user = await res.json();
          const result = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
              return_url: "",
            },
          });
          if (result.error) {
            setIssues((issues) => [...issues, result.error.message]);
            await callUpdateUser(
              { ...accountInfo, hasUWAccess: false },
              user.user.uid
            );
            signIn("credentials", {
              password: signUpDetails.password,
              email: signUpDetails.email,
              redirect: false,
            });
            setProcessingSignUpPayment(false);
            return;
          }
          signIn("credentials", {
            password: signUpDetails.password,
            email: signUpDetails.email,
            redirect: false,
          }).then(async () => {
            router.push("/my-learning");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  if (
    session.status === "authenticated" &&
    accountInfo &&
    accountInfo.hasUWAccess
  ) {
    router.replace("/");
  }
  if (!hasAccess && session.status === "unauthenticated") {
    return (
      <div className="container">
        <form
          className="col col-md-5 d-flex mx-auto flex-column justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="fs-1 fw-bold cl-dark-text">Enter Access Code</div>
          {isIncorrectAccessCode ? (
            <div className="cl-red d-flex flex-column">
              Incorrect Access Code
            </div>
          ) : null}
          <div className="form-group mt-3 w-100">
            <input
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
              }}
              type="text"
              className="px-3 form-control"
              id="email"
              placeholder="Enter code"
            />
          </div>
          <input
            type="submit"
            className="cl-btn-blue mt-4"
            onClick={(e) => {
              e.preventDefault();
              if (accessCode === "596382") {
                setHasAccess(true);
              } else {
                setIsIncorrectAccessCode(true);
              }
            }}
            value="Access Signup"
          />
        </form>
      </div>
    );
  }
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
            <div className="ms-3">$99</div>
          </div>
          <div className="d-flex flex-row mt-3 mb-2">
            <CheckBox
              selected={acceptedTOSPP}
              setSelected={(value) => {
                setAcceptedTOSPP(value);
              }}
            />
            <div className="ms-2">
              By creating an account, you agree to our{" "}
              <a
                target="_blank"
                className="cl-blue"
                href="https://docs.google.com/document/d/1rPOqjfcwMF9mADNzEJCtBVHJ9OdCKUaLrtxHPhMeNHA/edit?usp=sharing"
              >
                Terms of Service
              </a>{" "}
              and have read and acknowledge the{" "}
              <a
                target="_blank"
                className="cl-blue"
                href="https://docs.google.com/document/d/1Ah8jEKJqggYH-4cgfWA0nc90Dnc-ySV8DjSSu_yJpbA/edit?usp=sharing"
              >
                Privacy Statement
              </a>
              .
            </div>
          </div>
          <button
            onClick={() => {
              setProcessingSignUpPayment(true);
              setIssues([]);
              handleSubmit();
            }}
            disabled={processingSignUpPayment}
            className="cl-btn-blue w-100 center-child"
            style={{ borderRadius: "58x", fontSize: "18px" }}
          >
            {processingSignUpPayment ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Pay now"
            )}
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
