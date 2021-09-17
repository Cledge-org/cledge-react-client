import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Footer({}) {
  return (
    <footer
      className="bg-dark-blue cl-light-gray container-fluid px-6 mt-4"
      style={{ padding: 60 }}
    >
      <div className="row mt-2 cl-translucent-white">
        <div className="col-4">
          <a href="#" className="cl-white title">
            <h4 style={{ fontWeight: 600 }}>cledge.</h4>
          </a>
          support us at...
          <br />
          <p style={{ color: "#ADD8E6" }}>ICONS PLACEHOLDER</p>© 2021 Cledge
        </div>
        <div className="col-3 mx-auto">
          <h6 className="title mb-4">FEATURES</h6>
          <ul className="list-unstyled cl-white">
            <li className="mt-2">
              <a href="#">Personalized Quizzes</a>
            </li>
            <li className="mt-2">
              <a href="#">Video Learning Pathway</a>
            </li>
            <li className="mt-2">
              <a href="#">College Search</a>
            </li>
            <li className="mt-2">
              <a href="#">AI Counselor</a>
            </li>
          </ul>
        </div>
        <div className="col-3">
          <h6 className="title mb-4">MORE</h6>
          <a href="mailto:ayan@cledge.org" className="cl-white">
            Get in Touch
          </a>
        </div>
      </div>
    </footer>
  );
}
