// my accounts page
import Link from "next/link";
import { useState } from "react";
export default function signup() {
  var [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container">
      <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-middle">
        <div className="fs-1 fw-bold cl-dark-text">
          Create your <span className="cl-blue">cledge</span> account
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

        <div className="auth-bottom-nav">
          <div className="px-0">
            <Link href="/auth/login">
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
