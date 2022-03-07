import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer({
  onFeatureClick,
}: {
  onFeatureClick: Function;
}) {
  return (
    <footer
      className="bg-dark-blue cl-light-gray container-fluid px-6"
      style={{ padding: 60, width: "100%" }}>
      <div className="row mt-2 cl-translucent-white">
        <div className="col-12 col-md-4">
          <Link href="#">
            <h4
              className="cl-white title"
              style={{ fontWeight: 600, fontFamily: "Montserrat" }}>
              cledge.
            </h4>
          </Link>
          support us at...
          <br />
          <div className="mt-3">
            <a href="https://www.linkedin.com/company/cledge/">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
            <a href="https://www.facebook.com/cledge.org">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className="social-icon"
              />
            </a>
            <a href="https://www.instagram.com/hello.cledge/">
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className="social-icon"
              />
            </a>
          </div>
          <br />© 2021 Cledge
        </div>

        <div className="col-12 col-md-3 mx-auto mt-5 mt-md-0">
          <h6 className="title mb-4 cl-translucent-white">FEATURES</h6>
          <ul className="list-unstyled">
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(0);
                }}
                className="cl-white">
                Personalized Quizzes
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(1);
                }}
                className="cl-white">
                Video Learning Pathway
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(3);
                }}
                className="cl-white">
                College Search
              </a>
            </li>
            <li className="mt-2">
              <a
                onClick={() => {
                  onFeatureClick(2);
                }}
                className="cl-white">
                AI Counselor
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-3  mt-5 mt-md-0">
          <h6 className="title mb-4 cl-translucent-white">MORE</h6>
          <a href="mailto:ayan@cledge.org" className="cl-white">
            Get in Touch
          </a>
        </div>
      </div>
    </footer>
  );
}
