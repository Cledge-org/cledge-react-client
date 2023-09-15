import classNames from "classnames";
import { useState } from "react";
import PurchasePageInput from "src/main-pages/AuthPages/PremiumPurchasePage/components/PurchasePageInput/PurchasePageInput";
import {
  alertSlackNewUser,
  callCreatePaymentIntent,
  callCreateUser,
  callRedeemPromoCode,
  callUpdateUser,
  getNumUsers,
  redeemCode
} from "src/utils/apiCalls";
import styles from "./premium-purchase-page.module.scss";
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
import { redeemPromoCode } from "src/pages/api/auth/redeemPromoCode";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const PremiumPurchasePage = ({ accountInfo, handleDiscountCode }: { accountInfo: AccountInfo, handleDiscountCode: Function }) => {
  const [issues, setIssues] = useState([]);
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
    isOnMailingList: true,
  });
  const [processingSignUpPayment, setProcessingSignUpPayment] = useState(false);
  const [acceptedTOSPP, setAcceptedTOSPP] = useState(false);
  const [understands, setUnderstands] = useState(false);
  const [promotionCode, setPromotionCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [showCodeAccepted, setShowCodeAccepted] = useState(false);
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [price, setPrice] = useState(49.99);
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

  const handlePromotionCode = async () => {
    if (showCodeAccepted == false) {
      const res = await callRedeemPromoCode(promotionCode, session.data?.user.uid ? session.data.user.uid : null);
      let codeObject = null;
      try {
        codeObject = await res.json();
      } catch (e) {}
      if (codeObject != null && codeObject.discountedPrice != null) {
        setShowCodeAccepted(true);
        setShowInvalidCode(false);
        setPrice(codeObject.discountedPrice);
        handleDiscountCode(codeObject.discountedPrice);
      } else {
        setShowCodeAccepted(false);
        setShowInvalidCode(true);
      }
    }
  }

  const handleSubmit = async () => {
    if (!understands) {
      setIssues((issues) => [
        ...issues,
        "If you want to make an account you must understand that it is in beta",
      ]);
      setProcessingSignUpPayment(false);
      return;
    }
    if (!acceptedTOSPP) {
      setIssues((issues) => [
        ...issues,
        "If you want to make an account you must agree to the terms of service and privacy policy",
      ]);
      setProcessingSignUpPayment(false);
      return;
    }
    if (session.status === "authenticated") {
      const {error: submitError} = await elements.submit();
      if (submitError) {
        setIssues((issues) => [...issues, submitError.message]);
        setProcessingSignUpPayment(false);
        return;
      }
      try {
        const paymentIntentResult = await fetch(`/api/stripe/create-payment-intent`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            newAmount: price * 100
          }),
        });
        const { clientSecret: clientSecret } = await paymentIntentResult.json();
        const result = await stripe.confirmPayment({
          elements,
          clientSecret,
          redirect: "if_required",
          confirmParams: {
            return_url: `${window.location.origin}/account`
          }
        })
        if (result.error) {
          setIssues((issues) => [...issues, result.error.message]);
          setProcessingSignUpPayment(false);
        } else {
          callUpdateUser({ ...accountInfo, premium: true });
          store.dispatch(
            updateAccountAction({
              ...accountInfo,
              premium: true,
            })
          );
          router.push("/account");
        }
      } catch (e) {
        console.log(e);
        setIssues((issues) => [...issues, "An error has occured. Please verify your payment details and try again."]);
        setProcessingSignUpPayment(false);
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
        premium: true,
        checkIns: ["Onboarding Questions"],
      })
        .then(async (res) => {
          if (process.env.NODE_ENV == "production") {
            alertSlackNewUser(parseInt(await getNumUsers()));
          }
          const user = await res.json();
          const {error: submitError} = await elements.submit();
          if (submitError) {
            setIssues((issues) => [...issues, submitError.message]);
            setProcessingSignUpPayment(false);
            return;
          }
          try {
            const paymentIntentResult = await fetch(`/api/stripe/create-payment-intent`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                newAmount: price * 100
              }),
            });
            const { clientSecret: clientSecret } = await paymentIntentResult.json();
            const result = await stripe.confirmPayment({
              elements,
              clientSecret,
              redirect: "if_required",
              confirmParams: {
                return_url: `${window.location.origin}/account`
              }
            })
            if (result.error) {
              setIssues((issues) => [...issues, result.error.message]);
              await callUpdateUser(
                { ...accountInfo, premium: false },
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
              router.push("/dashboard");
            });
          } catch (e) {
            console.error(e);
            setIssues((issues) => [...issues, "An error has occured. Please verify your payment details and try again."]);
            setProcessingSignUpPayment(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleRedemption = async () => {
    if (!understands) {
      setIssues((issues) => [
        ...issues,
        "If you want to make an account you must understand that it is in beta",
      ]);
      setProcessingSignUpPayment(false);
      return;
    }
    if (!acceptedTOSPP) {
      setIssues((issues) => [
        ...issues,
        "If you want to make an account you must agree to the terms of service and privacy policy",
      ]);
      setProcessingSignUpPayment(false);
      return;
    }
    if (session.status === "authenticated") {
        callUpdateUser({ ...accountInfo, premium: true });
        store.dispatch(
          updateAccountAction({
            ...accountInfo,
            premium: true,
          })
        );
        router.push("/my-learning");
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
        premium: true,
        checkIns: ["Onboarding Questions"],
      })
        .then(async (res) => {
          alertSlackNewUser(parseInt(await getNumUsers()) - 36);
          const user = await res.json();
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
    accountInfo.premium
  ) {
    router.replace("/account");
  }

  const AccountInfoBox = () => {
    return (
      <div
        className={classNames(styles.blobContainer, {
          ["mt-3"]: issues.length > 0,
        })}
      >
        <div className="cl-dark-text fw-bold" style={{ fontSize: "28px" }}>
          Hi, {accountInfo.name}.
        </div>
        <div className="cl-dark-gray" style={{ fontSize: "14px" }}>
          <text>You are currently logged in with: </text>
          <text className="cl-dark-text fw-bold"> {accountInfo.email}</text>
        </div>
        <div className="cl-dark-gray mt-4" style={{ fontSize: "14px" }}>
          <text>If this is incorrect, please log out </text>
          <a onClick={() => {
            router.push("/account")
          }} className="cl-dark-text fw-bold">here</a>
          <text>.</text>
        </div>
      </div>
    )
  }

  const size = useWindowSize();

  return (
    <div
      className="d-flex justify-content-evenly w-100 py-4"
      style={{
        backgroundColor: "#F9FAFF",
        height: "fit-content",
        minHeight: "100vh",
        flexDirection: size.width <= 810 ? "column" : "row"
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: size.width <= 810 ? "100%" : "40%" }}
      >
        <div className="cl-red d-flex flex-column" style={{ width: "80%" }}>
          {issues.map((issue) => (
            <div>{issue}</div>
          ))}
        </div>
        {session.status === "authenticated" && (
          <AccountInfoBox />
        )}
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
              You’ll use this account to log in and access Cledge with premium tier.
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
          style={{  }}
        >
          <div
            className="cl-dark-text fw-bold pb-2"
            style={{ fontSize: "28px" }}
          >
            Payment method
          </div>
          <div className="d-flex flex-column mb-4">
            <div className="d-flex flex-row align-items-end">
              <PurchasePageInput
                  heading={"Promotion Code"}
                  placeholder={""}
                  onChange={(value: string) => {
                    setPromotionCode(value);
                  }}
              />
              <button
                onClick={() => {
                  handlePromotionCode();
                }}
                disabled={processingSignUpPayment}
                className="cl-btn-blue center-child h-50 ms-3"
              >
                Enter
              </button>

            </div>
            {showCodeAccepted ? (<text style={{ color: "green" }}>Promotion code applied!</text>) : ""}
            {showInvalidCode ? (<text style={{ color: "red" }}>Invalid promotion code.</text>) : ""}
          </div>
          {!validCode ? (<PaymentElement />) : ""}
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: size.width <= 810 ? "100%" : "40%" }}
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
            className="d-flex flex-row align-items-center justify-content-between fw-bold cl-dark-text pb-3"
            style={{ fontSize: "24px" }}
          >
            <div>Cledge Premium Account Tier</div>
            <div className="ms-3">${price}</div>
          </div>
          <h6 className="mt-4 mb-4">This data package includes but is not limited to:</h6>
          <ul>
            <li className="my-3">An in-depth University of Washington Computer Science analysis package.</li>
            <li className="my-3">Unique college specific data points such as high school admission requirements, salary/jobs after graduation, and detailed admission rates.</li>
            <li className="my-3">Student profile analysis tool to understand how competitive of applicant you are compared to others and how you can improve.</li>
          </ul>
          <div className="d-flex flex-row mt-5 mb-2">
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
          <div className="d-flex flex-row mt-3 mb-2">
            <CheckBox
              selected={understands}
              setSelected={(value) => {
                setUnderstands(value);
              }}
            />
            <div className="ms-2 mb-3">
              I understand that Cledge is in Beta. I may experience bugs and
              other minor issues. The Cledge team is committed to maintaining a
              high standard and will resolve the issue as soon as possible after
              contacted. You may contact ayan@cledge.org with any issues that
              arise or report a problem using the contact at the bottom of any
              page.
            </div>
          </div>
          {!validCode ? (<button
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
              "Purchase"
            )}
          </button>) :
          (<button
            onClick={() => {
              setProcessingSignUpPayment(true);
              setIssues([]);
              handleRedemption();
            }}
            disabled={processingSignUpPayment}
            className="cl-btn-blue w-100 center-child"
            style={{ borderRadius: "58x", fontSize: "18px" }}
          >
            {processingSignUpPayment ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Redeem Access"
            )}
          </button>) }
        </div>
      </div>
    </div>
  );
};
export default connect((state) => {
  return {
    accountInfo: state?.accountInfo,
  };
})(PremiumPurchasePage);
