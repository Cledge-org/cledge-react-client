import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

export default function Header({props}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log();

  let listener = null
  const [scrollState, setScrollState] = useState("top")
  const [colors, setColors] = useState('')
  var navclass = '';


  if(router.pathname == '/welcome'){
    navclass = 'position-fixed fixed-top'
  }else{
    navclass='nav-regular'
  }

  useEffect(() => {
    

    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 120) {
        if (scrollState !== "scrolling") {
          setScrollState("scrolling");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top")
          setColors('nav-transparent')
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState, router])

  return (  
    <nav className= {`navbar cl-blue sticky-top navbar-expand-md px-3 ${navclass} ${(scrollState !== "scrolling" && router.pathname ==='/welcome') ? "nav-transparent" : 'nav-regular'}`}>
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
                    <a className="nav-link">Resources</a>
                  </Link>
                  <Link href="/progress">
                    <a className="nav-link">Progress</a>
                  </Link>
                  <Link href="/account">
                    <a className="nav-link ">My Account</a>
                  </Link>
                  <Link href="/api/auth/signout">
                    <a className="nav-link" href="">
                      Logout
                    </a>
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/signin">
                  <a className="nav-link" href="">
                    Log In
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
