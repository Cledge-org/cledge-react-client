// my accounts page
import Link from "next/link";
import {useState} from 'react';


export default function login() {
  return (
    <div className="container">
      <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-items-center">
        <div className="fs-1 fw-bold cl-darktext">Sign in</div>
        <div className="form-group mt-3 w-100">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="email"
          >
            Email address
          </label>
          <input
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
            type="password"
            className="px-3 form-control"
            id="password"
            placeholder="Enter Password"
          />
        </div>
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
              className="btn btn-primary rounded- cl-btn-blue"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
