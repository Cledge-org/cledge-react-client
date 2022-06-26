// my accounts page
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import styles from "./signup-page.module.scss";
import classNames from "classnames";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import { callCreateUser } from "src/utils/apiCalls";

const SignUpPage = () => {
  const incorrectPassStr =
    "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  const mismatchPasswords = "Passwords are not matching";
  const allFieldsNotFilled = "Make sure to fill in all fields";
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [accessCode, setAccessCode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isIncorrectAccessCode, setIsIncorrectAccessCode] = useState(false);
  useEffect(() => {
    if (
      !(
        formData.email &&
        formData.firstName &&
        formData.lastName &&
        formData.password1 &&
        formData.password2
      ) &&
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
  const checkCondition = (condition, strErr) => {
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
        !(
          formData.email &&
          formData.firstName &&
          formData.lastName &&
          formData.password1 &&
          formData.password2
        ),
        allFieldsNotFilled
      )
    ) {
      return;
    }
    await callCreateUser(formData.email, formData.password1, {
      name: formData.firstName + " " + formData.lastName,
      address: "",
      birthday: new Date(),
      grade: -1,
      email: formData.email,
      tags: [],
      checkIns: ["Onboarding Questions"],
    });
    signIn("credentials", {
      password: formData.password1,
      email: formData.email,
      callbackUrl: `${window.location.origin}/chatbot`,
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
          <div className="d-flex flex-row justify-content-between align-items-center mx-0 px-0">
            <div className={classNames("form-group mt-3", styles.splitInput)}>
              <label
                style={{ fontSize: "0.9em" }}
                className="text-muted"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                type="text"
                className="px-3 form-control"
                id="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group mt-3 split-input">
              <label
                style={{ fontSize: "0.9em" }}
                className="text-muted"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                type="text"
                className="px-3 form-control"
                id="lastName"
                placeholder="Last Name"
              />
            </div>
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
          {/* <div key={GoogleProvider.name} className="w-100">
          <button
            className="btn btn-light cl-btn shadow-sm my-3 w-100 fw-bold"
            onClick={() => {
              signIn("google", {
                callbackUrl: `${window.location.origin}/dashboard`,
              });
            }}
          >
            Sign Up with {GoogleProvider.name}
          </button>
        </div> */}
          <div className={classNames(styles.authBottomNav, "mt-3")}>
            <div className="px-0">
              <Link href="api/auth/login">
                <a className="cl-blue">Already have an Account?</a>
              </Link>
            </div>

            <div className="px-0">
              <button
                type="button"
                className="btn btn-primary cl-btn-blue"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageErrorBoundary>
  );
};
export default SignUpPage;
