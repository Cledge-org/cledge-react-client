import Footer from "../components/common/Footer";
import Image from "next/image";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
import MsftSVG from "../public/images/landing_msft.svg";
import OpenAISVG from "../public/images/landing_openai.svg";
import FeatureCarousel from "../components/common/FeatureCarousel";
import { useEffect, useRef, useState } from "react";
import WaitlistForm from "../components/common/WaitlistForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Router } from "next/router";
import LoadingScreen from "../components/common/loading";

//landing page
export default function Welcome(props) {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  return (
    <div
      className="container-fluid ps-0 p-0 pe-0" //After removing ps-0 p-0 pe-0, why does it have padding?
      style={{
        overflow: "hidden",
        transform: "translate(0,0)", //what is the use of translate here??
      }}
    >
      <div className="row align-items-center m-0" id="landing-main">
        <div className="col-lg-1"></div>
        <div className="row col-12 col-lg-5 justify-content-center landing-page-white-text mt-5 mt-lg-0 pt-5 pt-lg-0 mx-0 px-0">
          <div className="px-5 mx-5">
            <button className="mb-3 btn btn-sm p-0 m-0">
              <div className="d-flex flex-row">
                <div
                  className="px-2 py-1"
                  style={{
                    backgroundColor: "#F7BC76",
                    borderRadius: 10,
                    borderWidth: 0,
                    fontWeight: 700,
                    color: "black",
                    zIndex: 5,
                  }}
                >
                  beta
                </div>
                <div className="d-flex flex-row landing-update-button align-items-center text-nowrap">
                  <div className="cl-white">
                    Get the latest update on our features
                  </div>
                  <div className="cl-white ms-2" style={{ width: "10px" }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </div>
              </div>
            </button>
            <h1 className="cl-white fw-bold">
              Meet the Future of College Counseling
            </h1>
            <p>
              Cledge is the world's first accessible online College Counseling
              platform.
            </p>
            <p>
              We use AI to help 9th to 12th grade students navigate high school
              and the college application process by providing personalized
              actionable insights.
            </p>
            <button
              className="btn btn-lg position-sticky px-5 py-3 border-white border-2 shadow-none"
              style={{
                backgroundColor: "#7B95F4",
                color: "white",
                fontWeight: "bold",
                borderRadius: "15px",
              }}
              onClick={() =>
                document
                  .getElementById("waitlist-form")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Join the Waitlist
            </button>
          </div>
        </div>
        <div className="row col-12 col-lg-5 h-100 justify-content-center p-5 mx-auto">
          <YoutubeEmbed videoId="Bly0QbY3fV4" />
        </div>
        <div className="col-lg-1"></div>
      </div>
      <FeatureCarousel
        currPage={currFeature}
        setCurrPage={setCurrFeature}
        ref={slideShowRef}
      />
      <div className="row d-flex align-items-center justify-content-center bg-dark-blue m-0 py-5">
        <div className="w-100 pb-3 pt-3 px-3 landing-page-white-text d-flex flex-wrap pe-0 me-0">
          <div className="d-flex flex-row w-100 mx-auto col-md-6 col-xs-12">
            <div
              className={`center-child w-${
                isMobile ? "100" : "50"
              } align-items-start`}
            >
              <h2 className="pb-4 ps-2 w-75">
                The Best in Counseling Combined with Powerful Data Insights
              </h2>
            </div>
            <div className={`row w-${isMobile ? "100" : "50"}`}>
              <div className="col-12 col-md-6 pb-4 landing-page-gray-text">
                <img src="/images/landing_icon_early.svg" width="20%" />
                <h2 className="pt-3">Start Early</h2>
                <p>
                  We help students starting in 9th grade plan for college. Data
                  shows, the earlier you start preparing, the better success
                  students have in achieving their higher education goals.
                </p>
                <p>
                  But don’t worry, if you join later we'll get you caught up.
                </p>
                <br />
              </div>
              <div className="col-12 col-md-6 pb-4 landing-page-gray-text">
                <img src="/images/landing_icon_analyze.svg" width="20%" />
                <h2 className="pt-3">Analyze</h2>
                <p>
                  Cledge analyzes historical students data, past placements, and
                  holistic information to create custom learning plans for each
                  individual.
                </p>
                <br />
              </div>
              <div className="col-12 col-md-6 pb-4 landing-page-gray-text">
                <img src="/images/landing_icon_ai.svg" width="20%" />
                <h2 className="pt-3">AI Powered</h2>
                <p>
                  Our AI will provide insights beyond college prestige to guide
                  students in picking a college that is the right fit for them.
                </p>
              </div>
              <div className="col-12 col-md-6 pb-4 landing-page-gray-text">
                <img src="/images/landing_icon_privacy.svg" width="20%" />
                <h2 className="pt-3">Privacy</h2>
                <p>
                  We will never sell or share your data with colleges or 3rd
                  party institutions. Period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-center justify-content-center  m-0">
        <h2 className="col-12 col-md-8 text-center pt-5">
          Partnered with the Best Technologies
        </h2>
        <div className="d-flex flex-wrap align-items-center justify-content-center py-4">
          <Image
            className="px-2"
            src={MsftSVG}
            alt="Cledge partner: Microsoft"
          />
          <Image
            className="px-2"
            src={OpenAISVG}
            alt="Cledge partner: OpenAI"
          />
        </div>
        <p className="col-12 col-md-8 text-center pb-5">
          We are part of Microsoft for Startups and have exclusive access to
          OpenAI Technologies. With the support of these companies, we are
          excited to empower every student with the latest technologies to drive
          their college counseling experience.
        </p>
      </div>
      <div id="waitlist-form"></div>
      <WaitlistForm />
      <Footer
        onFeatureClick={(featureIndex) => {
          setCurrFeature(featureIndex);
          console.log(slideShowRef.current.offsetTop);
          document.body.scrollTo({
            top: slideShowRef.current.offsetTop,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}
