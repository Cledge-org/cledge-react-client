import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// my accounts page
export default function SignOut() {
  const router = useRouter();
  return (
    <div className="container-fluid">
      <div
        className="col col-md-5 d-flex mx-auto flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="fs-1 fw-bold cl-dark-text mb-5">
          Sign out of Cledge?
        </div>
        <button
          className="cl-btn-blue btn btn-primary w-50"
          onClick={(e) => signOut().then(() => router.push({ pathname: "" }))}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
