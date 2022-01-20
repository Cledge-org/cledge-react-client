import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import AuthFunctions from "../api/auth/firebase-auth";
import { useRouter } from "next/router";

export default function login() {
  var [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState(
    router.query.error ? ["Incorrect email or password"] : []
  );
  return (
    <div className="container">
      <div
        className="col col-md-5 d-flex mx-auto flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="fs-1 fw-bold cl-dark-text">Sign in</div>
        <div className="cl-red d-flex flex-column">
          {errorMessages.map((message) => {
            return <div>{message}</div>;
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            className="px-3 form-control"
            id="password"
            placeholder="Enter Password"
          />
        </div>
        {/* <div key={GoogleProvider.name} className="w-100">
          <button
            className="btn btn-light cl-btn shadow-sm my-3 w-100 fw-bold"
            onClick={() =>
              signIn("google", {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
          >
            Sign in with {GoogleProvider.name}
          </button>
        </div> */}
        <div className="px-0 align-self-start mt-3">
          <Link href="/auth/reset_password">
            <a className="forgot-password-btn">Forgot Password</a>
          </Link>
        </div>
        <div className="auth-bottom-nav">
          <div className="px-0">
            <Link href="/auth/signup">
              <a className="cl-blue">Create Account</a>
            </Link>
          </div>

          <div className="px-0">
            <button
              type="button"
              className="btn btn-primary cl-btn-blue"
              onClick={() => {
                const emailStr = "Email must be formatted correctly";
                if (
                  !formData.email.includes("@") ||
                  !formData.email.includes(".")
                ) {
                  if (!errorMessages.includes(emailStr)) {
                    errorMessages.push(emailStr);
                    setErrorMessages([...errorMessages]);
                  }
                  return;
                } else if (errorMessages.includes(emailStr)) {
                  errorMessages.splice(errorMessages.indexOf(emailStr), 1);
                  setErrorMessages([...errorMessages]);
                }
                signIn("credentials", {
                  password: formData.password,
                  email: formData.email,
                  callbackUrl: `${window.location.origin}/dashboard`,
                });
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
