// my accounts page
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import styles from "./signup-page.module.scss";
import classNames from "classnames";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import {
  alertSlackNewUser,
  callCreateUser,
  getNumUsers,
} from "src/utils/apiCalls";
import { useLocation } from "src/utils/hooks/useLocation";
import CheckBox from "src/common/components/CheckBox/CheckBox";

const SignUpPage = () => {
  const incorrectPassStr =
    "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  const mismatchPasswords = "Passwords are not matching";
  const allFieldsNotFilled = "Make sure to fill in all fields";
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  var [formData, setFormData] = useState({
    email: "",
    password1: "",
    isOnMailingList: true,
    password2: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [accessCode, setAccessCode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isIncorrectAccessCode, setIsIncorrectAccessCode] = useState(false);
  const windowLocation = useLocation();
  useEffect(() => {
    if (
      !(formData.email && formData.password1 && formData.password2) &&
      !errorMessages.includes(allFieldsNotFilled)
    ) {
      errorMessages.push(allFieldsNotFilled);
      setErrorMessages([...errorMessages]);
    }
    if (
      !regExp.test(formData.password1) &&
      !errorMessages.includes(incorrectPassStr)
    ) {
      errorMessages.push(incorrectPassStr);
      setErrorMessages([...errorMessages]);
    }
    if (
      formData.password2 !== formData.password1 &&
      !errorMessages.includes(mismatchPasswords)
    ) {
      errorMessages.push(mismatchPasswords);
      setErrorMessages([...errorMessages]);
    } else if (
      formData.password2 === formData.password1 &&
      errorMessages.includes(mismatchPasswords)
    ) {
      errorMessages.splice(errorMessages.indexOf(mismatchPasswords), 1);
      setErrorMessages([...errorMessages]);
    }
  }, [formData]);
  const checkCondition = (condition: boolean, strErr: string) => {
    if (condition) {
      if (!errorMessages.includes(strErr)) {
        errorMessages.push(strErr);
        setErrorMessages([...errorMessages]);
      }
      return false;
    } else if (errorMessages.includes(strErr)) {
      errorMessages.splice(errorMessages.indexOf(strErr), 1);
      setErrorMessages([...errorMessages]);
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailStr = "Email must be formatted correctly";
    if (
      !checkCondition(
        !formData.email.includes("@") || !formData.email.includes("."),
        emailStr
      )
    ) {
      return;
    }
    if (!checkCondition(!regExp.test(formData.password1), incorrectPassStr)) {
      return;
    }
    if (
      !checkCondition(
        formData.password2 !== formData.password1,
        mismatchPasswords
      )
    ) {
      return;
    }
    if (
      !checkCondition(
        !(formData.email && formData.password1 && formData.password2),
        allFieldsNotFilled
      )
    ) {
      return;
    }
    await callCreateUser(formData.email, formData.password1, {
      name: "",
      address: "",
      birthday: new Date(),
      isOnMailingList: formData.isOnMailingList,
      grade: -1,
      email: formData.email,
      tags: [],
      checkIns: ["Onboarding Questions"],
    })
      .then(async (res) => {
        alertSlackNewUser(parseInt(await getNumUsers()) - 36);
        signIn("credentials", {
          password: formData.password1,
          email: formData.email,
          callbackUrl: `${window.location.origin}/chatbot`,
        });
      })
      .catch((err) => {
        console.error(err);
        checkCondition(true, err);
      });
  };
  if (!hasAccess) {
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
              if (accessCode === process.env.SIGNUP_PASS) {
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
    <PageErrorBoundary>
      <div className="container">
        <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-middle">
          <div className="fw-bold cl-dark-text" style={{ fontSize: "2.25em" }}>
            Create your <span className="cl-blue">cledge.</span> account
          </div>
          <div className="cl-red d-flex flex-column">
            {errorMessages.map((message) => {
              return <div className="mt-2">{message}</div>;
            })}
          </div>
          <div className="form-group mt-3 w-100">
            <label
              style={{ fontSize: "0.9em" }}
              className="text-muted"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              className="px-3 form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group mt-3 w-100">
            <label
              style={{ fontSize: "0.9em" }}
              className="text-muted"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={formData.password1}
              onChange={(e) =>
                setFormData({ ...formData, password1: e.target.value })
              }
              type="password"
              className="px-3 form-control"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group mt-3 w-100">
            <label
              style={{ fontSize: "0.9em" }}
              className="text-muted"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              value={formData.password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
              type="password"
              className="px-3 form-control"
              id="confirmpassword"
              placeholder="Confirm Password"
            />
          </div>
          <div className="mt-3 mb-4">
            <div className="d-flex flex-row mb-3">
              <CheckBox
                selected={!formData.isOnMailingList}
                setSelected={(value) => {
                  setFormData({ ...formData, isOnMailingList: !value });
                }}
              />
              <div className="ms-2">
                I don’t want to receive emails about Cledge and feature updates,
                free webinar notifications and promotions from Cledge.
              </div>
            </div>
            <div>
              By creating an account, you agree to our Terms and have read and
              acknowledge the Privacy Statement.
            </div>
          </div>
          <div className="px-0">
            <button
              type="button"
              className="cl-btn-blue mt-3 w-100"
              style={{ fontSize: "1.3em" }}
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div className={classNames(styles.authBottomNav, "mt-3")}>
            <div className="px-0">
              Already have an Account?{" "}
              <Link href="/auth/login">
                <a className="cl-blue">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageErrorBoundary>
  );
};
export default SignUpPage;
