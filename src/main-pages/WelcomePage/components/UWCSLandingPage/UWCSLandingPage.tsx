import dynamic from "next/dynamic";

import IntroContent from "../../content/IntroContent.json";
import MissionContent from "../../content/MissionContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import PartnerContent from "../../content/PartnerContent.json";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { Button } from "../Button/Button";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import YoutubeEmbed from "src/common/components/YoutubeEmbed/YoutubeEmbed";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import UWPackageFeature from "src/main-pages/WelcomePage/components/UWCSLandingPage/components/UWPackageFeature/UWPackageFeature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ContentBlockContent } from "src/main-pages/WelcomePage/components/ContentBlock/ContentBlock";
import { useRouter } from "next/router";
import classNames from "classnames";

const Contact = dynamic(() => import("../ContactForm/ContactForm"));
const MiddleBlock = dynamic(() => import("../MiddleBlock/MiddleBlock"));
const Container = dynamic(() => import("../Container/Container"));
const ContentBlock = dynamic(() => import("../ContentBlock/ContentBlock"));

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: url("images/uw-landing-bg.svg") no-repeat;
  height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 90px 30px 90px;

  @media only screen and (max-width: 767px) {
    display: block;
    padding-top: 0;
  }

  & > div:first-child {
    margin-bottom: 30px;

    & > div {
      width: 100%;
    }

    @media only screen and (min-width: 767px) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  }

  section {
    max-width: 1500px;
  }

  #intro h6,
  #intro p {
    color: white;
  }

  #intro h6 {
    font-weight: 800;
    font-size: 48px;
  }
`;

const Partner = styled(FullWidthContainer)`
  background: #f9faff;
  margin-top: 4rem;
`;

export const SubscribeWrapper = styled("div")`
  background: #0b1142;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 3rem;
  border-radius: 10px;
  max-width: 1500px;

  @media only screen and (max-width: 767px) {
    width: 100%;
    position: static;
  }

  & > * {
    color: white !important;
  }

  & .input > div {
    margin: 5px 10px;
  }

  label {
    text-align: left;
    color: grey !important;
    width: 100%;
  }

  & button:last-child {
    padding: 0 10px;
    flex: 1 1 auto !important;
    margin: 5px 10px;
    height: 62px;
    @media only screen and (max-width: 767px) {
      margin: 24px 10px;
    }
  }
`;
export const BlobBlock = styled("div")`
  background: #dce1fb;

  button {
    padding: 1rem;
  }

  section {
    max-width: 1500px;
    height: 100%;
  }

  #intro h6,
  #intro p {
    color: white;
  }

  #intro h6 {
    font-weight: 800;
    font-size: 48px;
  }

  .BlobContainer {
    padding: 36px;
    width: 80vw;
    height: 52vh;
    border: 1px solid transparent;
    border-radius: 15px;
    background-color: white;
  }
  @media only screen and (max-width: 800px) {
    .BlobContainer {
      height: auto;
      width: 90vw;
    }
  }
  @media only screen and (min-width: 767px) {
    min-height: 75vh;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 90px;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & > div > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
`;

export const MediaButton = styled("button")`
  background: #0b1142;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: white;
  height: 50px;
  padding: 2rem 1.5rem;
  outline: none;
  border-color: transparent;
  border-radius: 5px;
  margin: 10px;

  & > * {
    color: white !important;
  }

  & > img {
    margin-right: 10px;
  }

  @media only screen and (max-width: 767px) {
    width: 60%;
  }
`;

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

const UWCSLandingPage = () => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  const [width, height] = useWindowSize();
  const router = useRouter();
  const packageAd = (
    <BlobBlock>
      <Fade direction="right" className="center-child w-100">
        <div
          className={classNames(
            "BlobContainer d-flex flex-row justify-content-between align-items-center flex-wrap",
            { "my-3": width < 800 }
          )}
        >
          <div
            className="d-flex flex-column justify-content-between h-100"
            style={{ width: width < 800 ? "100%" : "48%" }}
          >
            <div className="cl-dark-text fw-bold">
              <div style={{ fontSize: width < 800 ? "28px" : "36px" }}>
                UW CS Application Prep Package
              </div>
              <div className="cl-mid-gray mb-2" style={{ fontSize: "24px" }}>
                Early bird price
              </div>
              <div
                className="d-flex flex-row align-items-center"
                style={{ fontSize: "64px" }}
              >
                $99
                <div
                  className="fw-bold center-child ms-3 px-3 py-2"
                  style={{
                    fontSize: width < 800 ? "22px" : "32px",
                    background:
                      "linear-gradient(92.92deg, rgba(80, 107, 237, 0.2) -8.48%, #F7BC76 95.28%)",
                    borderRadius: "4px",
                  }}
                >
                  1 YEAR
                </div>
              </div>
            </div>
            <button
              className="cl-btn-blue"
              onClick={() => {
                window.open(
                  `/uw-interest-form?ref=${router.query.ref}`,
                  "_self"
                );
              }}
              style={{
                width: width < 800 ? "100%" : "35%",
                borderRadius: "8px",
                fontSize: "18px",
              }}
            >
              Join the Waitlist
            </button>
          </div>
          <div
            className={classNames({
              "mx-3": width > 800,
              "my-3": width < 800,
            })}
            style={{
              height: width < 800 ? "0" : "100%",
              width: width < 800 ? "100%" : "0",
              border: "1px solid #D9D9D9",
            }}
          />
          <div
            className="d-flex flex-column justify-content-evenly h-100"
            style={{ width: width < 800 ? "100%" : "48%" }}
          >
            <div
              className="cl-dark-text mb-2"
              style={{ fontWeight: 700, fontSize: "24px" }}
            >
              What you get with the package
            </div>
            {[
              "Analysis of 5+ successful applications & why they worked",
              "Insider look at how UW CS scores your application",
              "How to approach the UW supplemental essays",
              "Should you apply to Computer Engineering or CS?",
              "The Cledge AI Advisor & College Search Tool",
            ].map((option) => (
              <div className="d-flex flex-row">
                <div
                  className="me-2 center-child"
                  style={{
                    background:
                      "linear-gradient(92.92deg, #506BED -8.48%, #F7BC76 95.28%)",
                    color: "white",
                    width: "25px",
                    minWidth: "25px",
                    height: "25px",
                    borderRadius: "12.5px",
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div
                  className="cl-dark-text"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                >
                  {option}
                </div>
              </div>
            ))}
            <div
              className="fw-bold p-3 mt-2"
              style={{
                background: "rgba(80, 107, 237, 0.2)",
                border: "1px solid #E0DFE8",
                borderRadius: "10px",
                fontSize: "20px",
              }}
            >
              Plus a chance to have a 30 min consultation with a college
              counselor
            </div>
          </div>
        </div>
      </Fade>
    </BlobBlock>
  );
  return (
    <PageErrorBoundary>
      <Container>
        <Intro
          className="container-margin"
          style={{
            backgroundSize: "cover",
            backgroundPosition: width < 800 ? "top left" : "center",
          }}
        >
          <Fade className="w-100 justify-content-start h-100" direction="right">
            <div
              style={{
                color: "white",
                width: width < 1850 ? (width < 1350 ? "100%" : "70%") : "50%",
              }}
              className={classNames(
                `d-flex flex-column justify-content-around h-100 ${
                  width < 800 ? "px-3" : "px-5"
                }`,
                { "align-items-center": width < 800 }
              )}
            >
              <div className="w-100">
                <div
                  className="center-child px-3 fw-bold mt-5"
                  style={{
                    width: "fit-content",
                    background:
                      "linear-gradient(92.92deg, #506BED -8.48%, #F7BC76 95.28%)",
                    borderRadius: "13px",
                  }}
                >
                  New
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#F7BC76",
                    fontSize: width < 800 ? "24px" : "40px",
                  }}
                >
                  Cledge improves your chances for
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: width < 800 ? "30px" : "52px",
                  }}
                >
                  University of Washington Computer Science Admissions
                </div>
              </div>
              <div className={classNames({ "w-100": width < 800 })}>
                <div style={{ fontSize: "20px" }}>
                  {width < 800
                    ? "Releasing September"
                    : "Utilize the power of Cledge to gain an edge on your UW CS application. Get insider access to how UW CS scores your application, view successful applicant profiles, and then get help writing the UW supplemental essay. Still need help? You will get one 30 minute consultation with a college advisor and access to Cledge AI tools."}
                </div>
                {width < 800 && (
                  <div style={{ width: "100%" }}>
                    <input type="text" placeholder="Enter your email" />
                  </div>
                )}
                <div style={{ width: width < 800 ? "100%" : "300px" }}>
                  <Button
                    key="buy-now-btn"
                    color="#F7BC76"
                    fixedWidth={false}
                    className={classNames("px-5", { "w-100": width < 800 })}
                    onClick={() => {
                      window.open(
                        `/uw-interest-form?ref=${router.query.ref}`,
                        "_self"
                      );
                    }}
                  >
                    Join the Waitlist
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Intro>
        {width < 800 && packageAd}
        <ContentBlock
          type="left"
          title={
            "Diverse profiles of accepted students and analysis of profiles"
          }
          content={
            "View comprehensive profiles of students who were accepted directly into Computer Science at UW Seattle. Understand what characteristics UW is looking for in students as well as extracurricular ideas, supplemental essays, and an analysis on why each profile was successful"
          }
          icon="uw_landing_1.svg"
          id="mission"
        />
        <Fade direction="right">
          <ContentBlockContent
            type={width < 800 ? "left" : "right"}
            title={"An insider look at how your application is scored"}
            content={
              "We have insider access on the scoring system used to admit students to UW CS. We will walk you through what your application is scored on to give you the advantage on your application."
            }
            icon="uw_landing_2.svg"
            id="mission2"
          />
        </Fade>
        <Partner className="py-3 pb-5">
          <div className="d-flex flex-column py-3 align-items-center">
            <div style={{ fontSize: "48px", fontWeight: 700 }}>
              Plus, you get:
            </div>
          </div>
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWPackageFeature
                className="me-2"
                title="AI Advisor"
                description="Get instant answers from our AI college advisor chat. Not satisfied? Upload it to ask a real counselor."
                imageSrc="uw_package_1.svg"
              />
              <UWPackageFeature
                className="mx-2"
                title="College Search"
                description="Use our college search tool to get information on acceptance rate ratios between male/female applicants, average salary after graduation and more."
                imageSrc="uw_package_2.svg"
              />
              <UWPackageFeature
                className="ms-2"
                title="Metrics"
                description="See how you are doing in academics and extracurriculars. Get
                recommendations on how to improve."
                imageSrc="uw_package_3.svg"
              />
            </div>
          </div>
        </Partner>
        {width > 800 && packageAd}
        {width > 800 && (
          <div
            className="d-flex align-items-center justify-content-center w-100 py-5"
            style={{
              background:
                "linear-gradient(92.92deg, #3B68DF -8.48%, #8D32D5 95.28%)",
            }}
          >
            <Fade direction="right">
              <div className="d-flex flex-column align-items-center py-5">
                <div
                  className="fw-bold"
                  style={{ fontSize: "28px", color: "white" }}
                >
                  Want to learn more about what Cledge does?
                </div>
                <Button
                  key=""
                  color="#F7BC76"
                  fixedWidth={true}
                  className={classNames("px-3 w-50")}
                  onClick={() => {}}
                >
                  Learn More
                </Button>
              </div>
            </Fade>
          </div>
        )}
      </Container>
      <Footer
        onFeatureClick={(featureIndex) => {
          setCurrFeature(featureIndex);
          //console.log(slideShowRef.current.offsetTop);
          document.body.scrollTo({
            top: slideShowRef.current.offsetTop,
            behavior: "smooth",
          });
        }}
      />
    </PageErrorBoundary>
  );
};

export default UWCSLandingPage;
