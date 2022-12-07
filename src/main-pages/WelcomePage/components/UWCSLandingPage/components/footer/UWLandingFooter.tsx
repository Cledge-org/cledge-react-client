import styles from "./footer.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function UWLandingFooter({}: {}) {
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
          <h6 className="cl-translucent-white">
            {" "}
            Cledge WhatsApp Group
          </h6>
          <h6 className="cl-translucent-white">
            {" "}
            Cledge Discord Group
          </h6>
        </div>
        <div className="col-12 col-md-2 ms-5 mt-5 mt-md-0">
            <h5
              className="cl-white title"
              style={{ fontWeight: 600, fontFamily: "Montserrat" }}
            >
              Subscribe
            </h5>
          <a href="mailto:ayan@cledge.org" className="cl-white" target="_blank">
            Contact Us
          </a>
          <br />
          <a href="#" className="cl-white" target="_blank">
            Weekly Newsletter
          </a>
          <br />
          <a
            href="https://docs.google.com/document/d/1yUPYg-s6KNJkkOvLLy5N8vHTfIIwINjaKv2LMUfnmPQ/edit"
            target="_blank"
            className="cl-white"
          >
            Terms and Conditions
          </a>
          <br />
          <a href="#" className="cl-white">
            Privacy Statement
          </a>
        </div>
      </div>
    </footer>
  );
}
