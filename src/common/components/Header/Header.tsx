import classNames from "classnames";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "src/utils/hooks/useLocation";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import styles from "./header.module.scss";
import collegeIcon from "src/public/images/header/college-search.svg"
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"


const Header = ({
  key_prop,
  accountInfo,
}: {
  key_prop: string;
  accountInfo: AccountInfo;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [listener, setListener] = useState(null);
  const { width, height } = useWindowSize();
  const [scrollState, setScrollState] = useState(
    location.includes("uw") ? "scrolling" : "top"
  );
  const userInitials = useMemo(() => {
    return accountInfo?.name
      .split(" ")
      .reduce(
        (prev, curr) =>
          prev ? prev + curr.substring(0, 1) : curr.substring(0, 1),
        ""
      );
  }, [accountInfo]);
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
    {
      link: "/dashboard",
      icon: "dashboard.svg?alt=media&token=90850805-8011-45af-aab8-95cbc8d7eb95",
      title: "Dashboard",
      dropdown: false,
      links: [{}]
    },
    {
      link: "/my-learning",
      icon: "my-learning.svg?alt=media&token=4ccc96fe-3db9-45b9-849a-24fcac93367b",
      title: "My Learning",
      dropdown: false,
      links: [{}]
    },
    // {
    //   link: "/chatbot",
    //   icon: "chatbot.svg?alt=media&token=8ec93219-de3f-45f0-8ee0-33aa8aa4b9a9",
    //   title: "AI Chat",
    //   dropdown: false,
    //   links: [{}]

    // },
    {
      link: "/college-list",
      icon: "chatbot.svg?alt=media&token=8ec93219-de3f-45f0-8ee0-33aa8aa4b9a9",
      title: "College",
      dropdown: true,
      links : [
        {
          key: "College Finder", 
          value: "/college-search"
        },
        {
          key: "My Colleges", 
          value: "/college-list"
        }
      ]
    },
    {
      link: "/metrics",
      icon: "metrics.svg?alt=media&token=9eed7da0-8292-4847-9d73-a007d5850f0a",
      title: "Metrics",
      dropdown: false,
      links: [{}]
    },
    {
      link: "/blogs",
      icon: "blogs.svg?alt=media&token=b2e3d45f-a9ad-4ac0-9296-ecd2e0cafa85",
      title: "Blogs",
      dropdown: false,
      links: [{}]
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

  const isActiveLink = (router, links) => {
    return links.some(link => router.pathname === link.value);
  };
  
  return (
    <nav
      key={key_prop}
      className={classNames(
        `w-100 navbar cl-blue navbar-expand-md px-3 border-bottom border-2`,
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
        {width < 800 && (
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
        )}
        <div
          className={classNames({
            ["d-flex flex-row align-items-center"]: width >= 800,
            ["collapse navbar-collapse"]: width < 800,
          })}
          style={{ width: "fit-content" }}
          id="navbarNavAltMarkup"
        >
          {status === "authenticated" ? (
            
            <div className="navbar-nav">
              {linkData.map(({ title, link, icon, dropdown, links}) => (
              dropdown ? (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="outline" className="dropdown-toggle btn-sm btn-sm no-animation-button">
                    <a
                        className=""
                        style={{
                          color: isActiveLink(router, links) ? "#506BED" : "#808099",
                        }}
                      >
                        <img
                          style={{
                            filter:
                              isActiveLink(router, links)
                                ? "invert(37%) sepia(32%) saturate(3369%) hue-rotate(215deg) brightness(98%) contrast(90%)"
                                : "",
                          }}
                          src={`https://firebasestorage.googleapis.com/v0/b/cledge-dev.appspot.com/o/header%2F${icon}`}
                        />
                        <span className="ps-1 pe-1">{title}</span>
                      </a>
                  </Dropdown.Toggle>
          
                  <Dropdown.Menu align="left">
                    {links.map((item) => {
                      return (
                        <Link href={item.value}>
                          <a className="dropdown-item">{item.key}</a>
                        </Link>
                      )

                    })}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link href={link}>
                  <Button variant="outline" className="clear-button btn-sm no-animation-button">
                    <a
                      className=""
                      style={{
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
                        src={`https://firebasestorage.googleapis.com/v0/b/cledge-dev.appspot.com/o/header%2F${icon}`}
                      />
                      <span className="ps-1 pe-1">{title}</span>
                    </a>
                  </Button>
                </Link>
              )
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
              <Link
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
              </Link>
            </div>
          )}
        </div>
        {status === "authenticated" && (
          <Dropdown>
            <Dropdown.Toggle variant="" bsPrefix="p-0" className="btn-sm no-animation-button">
              <a                
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
                  {userInitials}
                </a>
            </Dropdown.Toggle>

            <Dropdown.Menu align="right">
              <Link href="/application-profile">
                <a className="dropdown-item">Application Profile</a>
              </Link>
              <Link href="account">
                  <a className="dropdown-item">Account Settings</a>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
          
        )}
      </div>
    </nav>
  );
};
export default connect((state) => {
  return {
    accountInfo: state?.accountInfo,
  };
})(Header);
