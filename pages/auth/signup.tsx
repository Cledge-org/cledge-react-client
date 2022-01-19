// my accounts page
import Link from "next/link";
import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import type { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import AuthFunctions from "../api/auth/firebase-auth";
import { useForm } from "react-hook-form";


export default function signup() {
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { register, formState: {errors} } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthFunctions.createUser(formData.email, formData.password1, {
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    signIn("credentials", {
      password: formData.password1,
      email: formData.email,
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };
  return (
    <div className="container">
      <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-middle">
        <div className="fw-bold cl-dark-text" style={{ fontSize: "2.25em" }}>
          Create your <span className="cl-blue">cledge.</span> account
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center mx-0 px-0">
          <div className="form-group mt-3 split-input">
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
              {...register("email", {
                required: "Enter your e-mail",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]$/i,
                  message: "Enter a valid e-mail address",
                },          
              
              })}
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

        <div key={GoogleProvider.name} className="w-100">
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
        </div>
        <div className="auth-bottom-nav">
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
  );
}
