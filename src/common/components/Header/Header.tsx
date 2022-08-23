import classNames from "classnames";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";

export default function Header({ key_prop }: { key_prop: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [listener, setListener] = useState(null);
  const [scrollState, setScrollState] = useState("top");
  const [colors, setColors] = useState(
    router.pathname === "/" ? "cl-white" : "cl-blue"
  );
  var navclass = "";

  if (router.pathname === "/") {
    navclass = styles.navRegular + " shadow-sm position-fixed fixed-top";
  } else {
    navclass = styles.navRegular + " shadow-sm";
  }

  useEffect(() => {
    console.log(scrollState);
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
    document.removeEventListener("scroll", listener);
    setListener(
      document.body.addEventListener("scroll", (e) => {
        console.log(e);
        var scrolled = document.body.scrollTop;
        if (scrolled > 0) {
          if (scrollState !== "scrolling") {
            setScrollState("scrolling");
            setColors("cl-blue");
          }
        } else {
          if (scrollState !== "top") {
            setScrollState("top");
            if (router.pathname === "/") {
              setColors("cl-white");
            }
          }
        }
      })
    );
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);
  return (
    <nav
      key={key_prop}
      className={classNames(
        `w-100 navbar cl-blue navbar-expand-md px-3`,
        scrollState !== "scrolling" && router.pathname === "/"
          ? `position-fixed top-0 start-0 ${styles.navTransparent}`
          : "sticky-top",
        {
          [styles.navRegularNoShadow + " shadow-none"]:
            scrollState !== "scrolling" && router.pathname !== "/",
          [navclass]: scrollState === "scrolling",
        }
      )}
      style={{
        zIndex: 2000,
        borderBottom:
          scrollState !== "scrolling" && router.pathname !== "/chatbot"
            ? "none"
            : "2px solid #E0DFE8",
      }}
    >
      <div className="container-fluid">
        <Link href="/">
          <a
            className={`navbar-brand mx-4`}
            style={{ fontSize: "1.5em", fontWeight: 600 }}
          >
            <span className={`${colors}`}>cledge.</span>
          </a>
        </Link>
        <button
          style={{ border: "2px solid lightgray" }}
          className="navbar-toggler navbar navbar-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon"></div>
        </button>
        <div
          className="fs-7 collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          {status === "authenticated" ? (
            <div className="navbar-nav">
              {/* <Link href="/dashboard">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>My Learning</span>
                </a>
              </Link> */}
              <Link href="/chatbot">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Chatbot</span>
                </a>
              </Link>
              {/* <Link href="/resources">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Resources</span>
                </a>
              </Link> */}
              {/* <Link href="/metrics">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Metrics</span>
                </a>
              </Link> */}
              {/* <Link href="/college">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>College Search Tool</span>
                </a>
              </Link> */}
              <Link href="/progress">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Progress</span>
                </a>
              </Link>
              <Link href="/account">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>My Account</span>
                </a>
              </Link>
              <Link href="/api/auth/signout">
                <a className="nav-link" style={{ fontWeight: 600 }} href="">
                  <span className={`${colors}`}>Log Out</span>
                </a>
              </Link>
            </div>
          ) : (
            <div className="navbar-nav">
              {/* <Link href="/resources">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Resources</span>
                </a>
              </Link> */}
              <Link href="/auth/signup">
                <a className="nav-link" style={{ fontWeight: 600 }} href="">
                  <span className={`${colors}`}>Sign Up</span>
                </a>
              </Link>
              <Link href="/api/auth/signin">
                <a className="nav-link" style={{ fontWeight: 600 }} href="">
                  <span className={`${colors}`}>Log In</span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
