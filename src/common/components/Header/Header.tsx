import classNames from "classnames";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./header.module.scss";

export default function Header({ key_prop }: { key_prop: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log();

  let listener = null;
  const [scrollState, setScrollState] = useState("top");
  const [colors, setColors] = useState(
    router.pathname === "/" ? "cl-white" : "cl-blue"
  );
  var navclass = "";

  if (router.pathname === "/") {
    navclass = "position-fixed fixed-top";
  } else {
    navclass = styles.navRegular;
  }

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
    document.removeEventListener("scroll", listener);
    listener = document.body.addEventListener("scroll", (e) => {
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
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return (
    //*****
    //NOTE: This was commented out because most of the pages on the new header
    //aren't implemented and this was also the old header design, check in with Claudia
    //to see if she still wants it.
    //*****
    // <nav
    //   key={key}
    //   className={`w-100 navbar cl-blue navbar-expand-md px-3 ${navclass} ${
    //     scrollState !== "scrolling" && router.pathname === "/"
    //       ? "position-absolute top-0 start-0 nav-transparent"
    //       : scrollState !== "scrolling"
    //       ? "sticky-top nav-regular shadow-none"
    //       : "sticky-top nav-regular"
    //   }`}
    //   style={{ zIndex: 2000, textAlign: "center"}}
    // >
    //   <div className="container-fluid">
    //     <Link href="/">
    //       <a
    //         className={`navbar-brand mx-4`}
    //         style={{ fontSize: "1.5em", fontWeight: 600 }}
    //       >
    //         <span className={`${colors}`}>cledge.</span>
    //       </a>
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNavAltMarkup"
    //       aria-controls="navbarNavAltMarkup"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <div className="navbar-toggler-icon"></div>
    //     </button>
    //     <div
    //       className="fs-7 collapse navbar-collapse justify-content-end"
    //       id="navbarNavAltMarkup"
    //     >
    //       {status === "authenticated" ? (
    //         <div className="navbar-nav" style={{marginRight: 250}}>
    //           <Link href="/dashboard">
    //             <a className="nav-link" style={{ fontWeight: 600}}>
    //               <span className={`${colors}`}>My Learning</span>
    //             </a>
    //           </Link>
    //           <Link href="/resources">
    //             <a className="nav-link" style={{ fontWeight: 600 }}>
    //               <span className={`${colors}`}>Resources</span>
    //             </a>
    //           </Link>
    //           <Link href="/progress">
    //             <a className="nav-link" style={{ fontWeight: 600 }}>
    //               <span className={`${colors}`}>College Finding</span>
    //             </a>
    //           </Link>
    //           <Link href="/account">
    //             <a className="nav-link" style={{ fontWeight: 600 }}>
    //               <span className={`${colors}`}>Application Checkin</span>
    //             </a>
    //           </Link>
    //           <Link href="/api/auth/signout">
    //             <a className="nav-link" style={{ fontWeight: 600 }} href="">
    //               <span className={`${colors}`}>Smart Counselor</span>
    //             </a>
    //           </Link>
    //         </div>
    //       ) : (
    //         <div className="navbar-nav">
    //           <Link href="/resources">
    //             <a className="nav-link" style={{ fontWeight: 600 }}>
    //               <span className={`${colors}`}>Resources</span>
    //             </a>
    //           </Link>
    //           <Link href="/api/auth/signin">
    //             <a className="nav-link" style={{ fontWeight: 600 }} href="">
    //               <span className={`${colors}`}>Log In</span>
    //             </a>
    //           </Link>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </nav>
    <nav
      key={key_prop}
      className={classNames(
        `w-100 navbar cl-blue navbar-expand-md px-3`,
        navclass,
        scrollState !== "scrolling" && router.pathname === "/"
          ? `position-absolute top-0 start-0 ${styles.navTransparent}`
          : "sticky-top",
        {
          [styles.navRegularNoShadow]:
            scrollState !== "scrolling" && router.pathname !== "/",
        }
      )}
      style={{ zIndex: 2000 }}
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
          className="navbar-toggler"
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
              <Link href="/dashboard">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>My Learning</span>
                </a>
              </Link>
              <Link href="/resources">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Resources</span>
                </a>
              </Link>
              <Link href="/metrics">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Metrics</span>
                </a>
              </Link>
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
              <Link href="/resources">
                <a className="nav-link" style={{ fontWeight: 600 }}>
                  <span className={`${colors}`}>Resources</span>
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
