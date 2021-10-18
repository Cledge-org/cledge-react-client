import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header({ props }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log();

  let listener = null;
  const [scrollState, setScrollState] = useState("top");
  const [colors, setColors] = useState(
    router.pathname === "/" ? "cl-white" : "cl-blue"
  );
  var navclass = "";

  if (router.pathname == "/welcome") {
    navclass = "position-fixed fixed-top";
  } else {
    navclass = "nav-regular";
  }

  useEffect(() => {
    console.log(router.pathname);
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled > 5) {
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
  }, [scrollState, router]);

  return (
    <nav
      className={`w-100 navbar cl-blue navbar-expand-md px-3 ${navclass} ${
        scrollState !== "scrolling" && router.pathname === "/"
          ? "position-absolute top-0 start-0 nav-transparent"
          : "sticky-top nav-regular"
      }`}
      style={{ zIndex: 2000 }}
    >
      <div className="container-fluid">
        <Link href="/">
          <a
            className={`navbar-brand mx-4 ${colors}`}
            style={{ fontSize: "1.5em", fontWeight: 600 }}
          >
            cledge.
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
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="fs-7 collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          {/* user authenticated */}
          <div className="navbar-nav">
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
              {status === "authenticated" ? (
                <div className="navbar-nav">
                  <Link href="/resources">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                    >
                      Resources
                    </a>
                  </Link>
                  <Link href="/progress">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                    >
                      Progress
                    </a>
                  </Link>
                  <Link href="/account">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                    >
                      My Account
                    </a>
                  </Link>
                  <Link href="/api/auth/signout">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                      href=""
                    >
                      Logout
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="navbar-nav">
                  <Link href="/resources">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                    >
                      Resources
                    </a>
                  </Link>
                  <Link href="/api/auth/signin">
                    <a
                      className={`nav-link ${colors}`}
                      style={{ fontWeight: 600 }}
                      href=""
                    >
                      Log In
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
