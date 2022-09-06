import classNames from "classnames";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "src/utils/hooks/useLocation";
import styles from "./header.module.scss";

export default function Header({ key_prop }: { key_prop: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [listener, setListener] = useState(null);
  const [scrollState, setScrollState] = useState(
    location.includes("uw") ? "scrolling" : "top"
  );
  const [colors, setColors] = useState(
    router.pathname === "/" ? "cl-white" : "cl-blue"
  );
  var navclass = "";

  if (router.pathname === "/") {
    navclass = styles.navRegular + " shadow-sm position-fixed fixed-top";
  } else {
    navclass = styles.navRegular + " shadow-sm";
  }
  const linkData = [
    { link: "/dashboard", icon: "dashboard.svg", title: "Dashboard" },
    {
      link: "/my-learning",
      icon: "my-learning.svg",
      title: "My Learning",
    },
    { link: "/chatbot", icon: "chatbot.svg", title: "AI Chat" },
    {
      link: "/metrics",
      icon: "metrics.svg",
      title: "Metrics",
    },
    {
      link: "/application-profile",
      icon: "application-profile.svg",
      title: "Application Profile",
    },
  ];
  const onScroll = useCallback(() => {
    if (!location.includes("uw")) {
      let scrolled = document.body.scrollTop;
      if (scrolled > 0) {
        if (scrollState !== "scrolling") {
          setScrollState("scrolling");
          setColors("cl-blue");
        }
      } else {
        console.log(isExpanded);
        if (scrollState !== "top") {
          setScrollState("top");
          if (router.pathname === "/" && !isExpanded) {
            setColors("cl-white");
          }
        }
      }
    }
  }, [scrollState, isExpanded]);
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
    document.removeEventListener("scroll", listener);
    document.body.addEventListener("scroll", onScroll);
    setListener(onScroll);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState, onScroll, isExpanded]);
  return (
    <nav
      key={key_prop}
      className={classNames(
        `w-100 navbar cl-blue navbar-expand-md px-3`,
        scrollState !== "scrolling" && router.pathname === "/" && !isExpanded
          ? `position-fixed top-0 start-0 ${styles.navTransparent}`
          : "sticky-top",
        {
          [styles.navRegularNoShadow + " shadow-none"]:
            scrollState !== "scrolling" && router.pathname !== "/",
          [navclass]: scrollState === "scrolling" || isExpanded,
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
          onClick={() => {
            if (!isExpanded) {
              setColors("cl-blue");
            } else if (router.pathname === "/" && scrollState === "top") {
              setColors("cl-white");
            }
            setIsExpanded((isExpanded) => !isExpanded);
          }}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon"></div>
        </button>
        <div
          className={classNames("d-flex flex-row align-items-center")}
          style={{ width: "fit-content" }}
          id="navbarNavAltMarkup"
        >
          {status === "authenticated" ? (
            <div className="navbar-nav">
              {linkData.map(({ title, link, icon }) => (
                <Link href={link}>
                  <a
                    className="nav-link d-flex flex-row align-items-center"
                    style={{
                      fontWeight: 500,
                      color: router.pathname === link ? "#506BED" : "#808099",
                    }}
                  >
                    <img
                      style={{
                        filter:
                          router.pathname === link
                            ? "invert(37%) sepia(32%) saturate(3369%) hue-rotate(215deg) brightness(98%) contrast(90%)"
                            : "",
                      }}
                      src={`images/header/${icon}`}
                    />
                    <div className="px-1" />
                    <span>{title}</span>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="navbar-nav">
              <Link href="/api/auth/signin">
                <a
                  className="nav-link px-3"
                  style={{ fontWeight: 600, color: "black" }}
                  href=""
                >
                  <span>Log In</span>
                </a>
              </Link>
              <a
                href={
                  location.includes("uw") ? "/auth/uw-purchase" : "/auth/signup"
                }
              >
                <div
                  className={classNames("nav-link px-3", styles.signUpBtn)}
                  style={{
                    fontWeight: 600,
                    borderRadius: "4px",
                    color: "black",
                  }}
                >
                  <span>Sign Up</span>
                </div>
              </a>
            </div>
          )}
        </div>
        {status === "authenticated" && (
          <a
            href="/account"
            style={{
              background: "rgba(247, 188, 118, 0.5)",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "12px",
              paddingBottom: "12px",
              borderRadius: "10px",
              color: "black",
            }}
          >
            AS
          </a>
        )}
      </div>
    </nav>
  );
}
