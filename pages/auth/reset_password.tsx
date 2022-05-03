// my accounts page
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function resetpassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <div className="container-fluid">
      <div className="col w-md-25 d-md-flex mx-auto mt-5 flex-column justify-content-center align-items-center w-25">
        <div className="fs-2 fw-bold cl-dark-text">Forgot Password</div>
        <div className="form-group mt-3 w-100">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="px-3 form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="row d-flex flex-row mt-4 justify-content-center align-items-center">
          <div className="col px-0">
            <button
              onClick={() => {
                fetch(`/api/reset-password`, {
                  method: "POST",
                  body: JSON.stringify({ email }),
                }).then((res) => {
                  console.log(res.status);
                  router.back();
                });
              }}
              type="button"
              className="btn btn-primary rounded- cl-btn-blue"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
