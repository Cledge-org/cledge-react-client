import styles from "./footer.module.scss";
import Link from "next/link";
import { useLayoutEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";
import { Button } from "src/main-pages/WelcomePage/components/Button/Button";
import { SvgIcon } from "@mui/material";

export default function UWLandingFooter({}: {}) {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const [width, height] = useWindowSize();
  const [name, setName] = useState("");
  const [personType, setPersonType] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer
      className="bg-dark-blue cl-light-gray container-fluid"
      style={{ padding: 60, width: "100%" }}
    >
      <div className="row mt-2 cl-translucent-white">
        <div className="col-10 col-md-2">
          <Link href="#">
            <h4
              className="cl-white title"
              style={{ fontWeight: 600, fontFamily: "Montserrat" }}
            >
              cledge.
            </h4>
          </Link>
          support us at...
          <br />
          <div className="mt-3">
            <a href="https://www.linkedin.com/company/cledge/">
              <FontAwesomeIcon
                icon={faLinkedin}
                className={styles.socialIcon}
              />
            </a>
            <a href="https://www.facebook.com/cledge.org">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className={styles.socialIcon}
              />
            </a>
            <a href="https://www.instagram.com/hello.cledge/">
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className={styles.socialIcon}
              />
            </a>
          </div>
          <br />© 2022 Cledge
        </div>

        {/* <div className="col-12 col-md-3 mx-auto mt-5 mt-md-0">
          <h6 className="title mb-4 cl-translucent-white">FEATURES</h6>
          <ul className="list-unstyled">
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(0);
                }}
                className="cl-white"
              >
                Personalized Quizzes
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(1);
                }}
                className="cl-white"
              >
                Video Learning Pathway
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(3);
                }}
                className="cl-white"
              >
                College Search
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(2);
                }}
                className="cl-white"
              >
                AI Counselor
              </a>
            </li>
          </ul>
        </div> */}
        <div className="col-12 col-md-4 me-5 mt-5 mt-md-0">
            <h5
              className="cl-white title mb-4"
              style={{ fontWeight: 600, fontFamily: "Montserrat" }}
            >
              Community
            </h5>
          <div>
            <a href="https://chat.whatsapp.com/H4yqWfUg6l74LrO9A67Hon" target="_blank" className="cl-white">
              <img className="pe-3" src={"images/whatsapp.svg"} />
              Cledge WhatsApp Group
            </a>
          </div>
        </div>
        {width < 800 ? null : (
        <div className="col-12 col-md-4 me-5 mt-5 mt-md-0">
            <h5
              className="cl-white title mb-4"
              style={{ fontWeight: 600, fontFamily: "Montserrat" }}
            >
              Subscribe
            </h5>
          <h6 className="cl-white">
            While you wait, get monthly access to free live webinars & tips from college advisors!
          </h6>
          <div className="d-flex flex-column w-75">
            <div className="w-100 d-flex">
              <div 
                className="mt-3 me-3 w-50"
              >
                <div className="mb-1">Name</div>
                <input
                  value={name}
                  style={{ color: "black", borderRadius: "4px", width: "100%" }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Your name"
                />
              </div>
              <div 
                className="mt-3 ms-3 w-50"
              >
                <div className="mb-1">I am a...</div>
                <select
                  style={{ color: "black", borderRadius: "4px", width: "100%" }}
                >
                  <option>Parent</option>
                  <option selected>Student</option>
                </select>
              </div>
            </div>
            <div 
                className="mt-4 w-100"
              >
                <div className="mb-1">Email</div>
                <input
                  value={email}
                  style={{ color: "black", borderRadius: "4px", width: "100%" }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  placeholder="Email"
                />
            </div>
            <Button
              key="subscribe-btn"
              color="#F7BC76"
              fixedWidth={false}
              className="w-100 mt-3"
              onClick={() => {
                  if (name && email) {
                    setSubscribed(true);
                    setName("");
                    setEmail("");
                  }

                  // window.open(
                  //   `/`,
                  //   "_self"
                  // );
              }}
            >
              {subscribed ? "Subscribed!" : "Subscribe Now"}
            </Button>
          </div>
        </div>
        )}
      </div>
    </footer>
  );
}
