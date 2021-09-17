import Head from "next/head";
import Link from "next/link";
import { RootState } from "../../utils/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthenticated } from "../../utils/authstate";

export default function Header({}) {
  const authenticated = useSelector(
    (state: RootState) => state.authstate.authenticated
  );
  const dispatch = useDispatch();

  return (
    <nav className="navbar cl-blue sticky-top navbar-expand-md bg-white px-3">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand mx-4">cledge</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="fs-7 collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          {/* user authenticated */}
          <div className="navbar-nav">
            <Link href="/resources">
              <a className="nav-link">Resources</a>
            </Link>
            <Link href="/progress">
              <a className="nav-link">Progress</a>
            </Link>
            <Link href="/account">
              <a className="nav-link ">My Account</a>
            </Link>
          </div>
          {authenticated ? (
            <Link href="/auth/logout">
              <a className="nav-link">Logout</a>
            </Link>
          ) : (
            <Link href="/auth/login">
              <a className="nav-link">Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
