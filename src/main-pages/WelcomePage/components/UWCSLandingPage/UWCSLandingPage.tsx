/* eslint-disable react/jsx-key */
import dynamic from "next/dynamic";

import IntroContent from "../../content/IntroContent.json";
import MissionContent from "../../content/MissionContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import PartnerContent from "../../content/PartnerContent.json";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Footer from "../../../../common/components/Footer/Footer";
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
import { callPutUWWaitlist } from "src/utils/apiCalls";
import { CircularProgress } from "@mui/material";
import UWQuoteBlock from "./components/UWPackageFeature/UWQuoteBlock";
import UWLandingCard from "./components/UWPackageFeature/UWLandingCard";
import BlogCarouselItem from "../blogsCarousel/components/BlogCaroselItem";

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
  background: #FFFFFF;

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
    background-color: #DCE1FB4D;
  }

  .MobileBlobContainer {
    padding: 36px;
    width: 80vw;
    height: 52vh;
    border: 1px solid transparent;
    border-radius: 15px;
    background-color: #DCE1FB4D;
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

const UWCSLandingPage = ({
  blogData,
}: {
  blogData: any;
}) => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  const [width, height] = useWindowSize();
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const router = useRouter();
  const isMobile = width <= 810;
  const packageAd = (
    <BlobBlock>
      <Fade triggerOnce={true} direction="right" className="center-child w-100">
        <div
          className={classNames(
            "d-flex flex-row justify-content-between align-items-center flex-wrap",
            { "my-4 mt-5 mx-3": isMobile }, {"BlobContainer": !isMobile}
          )}
        >
          <div
            className="d-flex flex-column justify-content-between h-100"
            style={{ width: isMobile ? "100%" : "48%" }}
          >
            <div className="cl-dark-text fw-bold ms-3">
              <div className="mb-3 w-75" style={{ fontSize: isMobile ? "28px" : "28px", lineHeight: isMobile ? "30.46px" : "" }}>
                UW CS Application Prep Package
              </div>
              <div className="cl-mid-gray" style={{ fontSize: isMobile ? "14px" : "16px"}}>
                Early bird price
              </div>
              <div
                className="d-flex flex-row align-items-center"
                style={{ fontSize: "44px" }}
              >
                $99
                <div
                  className="fw-bold center-child ms-3 px-3 py-2"
                  style={{
                    fontSize: isMobile ? "16px" : "16px",
                    background:
                      "linear-gradient(92.92deg, rgba(80, 107, 237, 0.2) -8.48%, #F7BC76 95.28%)",
                    borderRadius: "4px",
                  }}
                >
                  1 YEAR
                </div>
              </div>
              {!isMobile ? (
              <div style={{ fontSize: "18px" }}>
                for everything
              </div>
              ) : null}
            </div>
            {!isMobile ? (
            <div className={classNames("ms-3 cl-dark-text fw-bold")} style={{ fontSize: "14px" }}>
                Releasing September
            </div>
            ) : null }
            {!isMobile ? (
              <div 
              className={classNames("mb-3 ms-3")}
              style={{
                width: width < 800 ? "100%" : "50%",
                border: "1px solid #C1C0CE",
                borderRadius: "4px"
              }}
            >
              <input
                value={email}
                style={{ color: "black" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter your email"
              />
            </div>
            ) : null}
            {!isMobile ? (
            <button
              className="cl-btn-blue ms-3"
              onClick={() => {
                window.open(
                  `/uw-interest-form?ref=${router.query.ref}`,
                  "_self"
                );
              }}
              style={{
                width: isMobile ? "100%" : "35%",
                borderRadius: "8px",
                fontSize: "18px",
              }}
            >
              Join the Waitlist
            </button>
            ) : null }
          </div>
          <div
            className={classNames({
              "mx-3": !isMobile,
              "my-3": isMobile,
            })}
            style={{
              height: isMobile ? "0" : "100%",
              width: isMobile ? "100%" : "0",
              border: "1px solid #D9D9D9",
            }}
          />
          <div
            className="d-flex flex-column justify-content-evenly h-100"
            style={{ width: isMobile ? "100%" : "48%" }}
          >
            <div
              className="cl-dark-text my-2 ms-3"
              style={{ 
                fontWeight: 700, 
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              What you get with the package
            </div>
            {[
              "Analysis of 5+ successful applications & why they worked",
              "Insider look at how UW CS scores your application",
              "How to approach the UW supplemental essays",
              "Should you apply to Computer Engineering or Computer Science?",
              "The Cledge AI Advisor & College Search Tool",
            ].map((option) => (
              <div className={classNames("d-flex flex-row ms-3 align-items-center", {"mt-3": isMobile})}>
                <div
                  className="me-3 center-child"
                  style={{
                    background:
                      "linear-gradient(92.92deg, #506BED -8.48%, #F7BC76 95.28%)",
                    color: "white",
                    width: "25px",
                    minWidth: "25px",
                    height: "25px",
                    borderRadius: "12.5px",
                    lineHeight: "20px"
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div
                  className="cl-dark-text"
                  style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: 500 }}
                >
                  {option}
                </div>
              </div>
            ))}
            <div
              className="p-3 mt-4 mx-3"
              style={{
                background: "rgba(80, 107, 237, 0.2)",
                border: "1px solid #E0DFE8",
                borderRadius: "10px",
                fontSize: "18px",
                width: "fit-content",
                fontWeight: 600
              }}
            >
              Plus a free 30 min consultation with your college
              counselor
            </div>
            {isMobile ? (
              <div
                className={classNames("my-4")}
                style={{
                  height: isMobile ? "0" : "100%",
                  width: isMobile ? "100%" : "0",
                  border: "1px solid #D9D9D9",
                }}
              />
            ) : null}
            {isMobile ? (
            <div className={classNames("d-flex flex-column justify-content-center mx-3")}>
            <div className={classNames("cl-dark-text fw-bold mb-3")} style={{ fontSize: "14px" }}>
                Releasing September
            </div>
            <div 
              className={classNames("mb-3")}
              style={{
                width: width < 800 ? "100%" : "50%",
                border: "1px solid #C1C0CE",
                borderRadius: "4px"
              }}
            >
              <input
                value={email}
                style={{ color: "black" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={() => {
                window.open(
                  `/uw-interest-form?ref=${router.query.ref}`,
                  "_self"
                );
              }}
              style={{
                width: isMobile ? "100%" : "35%",
                borderRadius: "8px",
                fontSize: "18px",
                background: '#506BED',
                color: "#FFFFFF",
                fontWeight: 600
              }}
            >
              Join the Waitlist
            </button>

            </div>
            ) : null}
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
            height: "40rem",
            backgroundPosition: isMobile ? "top left" : "center",
          }}
        >
          <Fade triggerOnce={true} className="w-100 justify-content-center h-100" direction="right">
            <div
              style={{
                color: "white",
                width: width < 1850 ? (width < 1350 ? "100%" : "70%") : "50%",
              }}
              className={classNames(
                `d-flex flex-column justify-content-center h-100 ${
                  isMobile ? "px-3" : "px-5"
                }`,
                { "align-items-center": isMobile }
              )}
            >
              <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#F7BC76",
                    fontSize: isMobile ? "22px" : "45px",
                    textAlign: "center",
                    lineHeight: "1.25em"
                  }}
                >
                  { isMobile ? "Cledge improves your chances" : "Cledge improves your chances for"}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "22px" : "52px",
                    textAlign: "center",
                    lineHeight: "1.25em"
                  }}
                >
                  { isMobile ? "for University of Washington Computer Science Admissions" : "University of Washington Computer Science Admissions"}
                </div>
                <Button
                    key="buy-now-btn"
                    color="#F7BC76"
                    fixedWidth={false}
                    className={classNames(`${ isMobile ? "w-50" : "w-25" } mt-4`)}
                    onClick={() => {
                      if (isMobile) {
                        setSubmittedEmail(true);
                        callPutUWWaitlist({
                          email,
                          ref: router.query.ref,
                        }).then(() => {
                          setSubmittedEmail(false);
                          setEmail("");
                        });
                      } else {
                        window.open(
                          `/uw-interest-form?ref=${router.query.ref}`,
                          "_self"
                        );
                      }
                    }}
                  >
                    {submittedEmail ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
              </div>
            </div>
          </Fade>
        </Intro>
        <div className="py-3 pb-5" style={{ background: "#0B1142" }}>
          <div
            className="d-flex"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              height: "40rem"
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWLandingCard
                className="me-2"
                title="New to the application process?"
                description="Learn from successful UW CS profiles and the Cledge courses curated for you"
                imageSrc="uwcard1.png"
              />
              <UWLandingCard
                className="mx-2"
                title="Have specific questions?"
                description="Get answers from your assigned college counselor and the Cledge AI."
                imageSrc="uwcard2.png"
              />
              <UWLandingCard
                className="ms-2"
                title="Not sure how to improve?"
                description="Get personalized metrics on where you stand and how to improve your academics or extracurriculars."
                imageSrc="uwcard3.svg"
              />
            </div>
          </div>
        </div>
        {packageAd}
        <div className="py-3 pb-5" style={{ background: "#0B1142", height: "26rem" }}>
          <div className="d-flex flex-column py-3 center-child" style={{ padding: "36px" }}>
            <div style={{ width: "80vw", height: "52vh" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#FFFFFF" }}>
                Trusted by both students and parents:
              </div>
              <div className="d-flex flex-row justify-content-between">
                <UWQuoteBlock
                  content={
                    "I prefer Cledge's Chatbot over Google. It provides straightforward information and eliminates the navigation of multiple websites."
                  }
                />
                <UWQuoteBlock
                  content={
                    "I prefer Cledge's Chatbot over Google. It provides straightforward information and eliminates the navigation of multiple websites."
                  }
                />
                <UWQuoteBlock
                  content={
                    "I prefer Cledge's Chatbot over Google. It provides straightforward information and eliminates the navigation of multiple websites."
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#DCE1FB" }}>
          <Fade triggerOnce={true} direction="right">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <ContentBlockContent
                  type={"right"}
                  title={"Get personalized help based off what you tell us and what type of applicant you are."}
                  content={
                    ""
                  }
                  icon="uw_question.svg"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="left">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <ContentBlockContent
                  type={"right"}
                  title={"Get started with learning pathways guiding you to successfully stand out on your UW CS application."}
                  content={
                    ""
                  }
                  icon="uw_pathway.svg"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="right">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <ContentBlockContent
                  type={"right"}
                  title={"Get questions answered by your assigned college counselor and AI advisor"}
                  content={
                    ""
                  }
                  icon="uw_chatbot.svg"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="left">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <ContentBlockContent
                  type={"right"}
                  title={"Get specific metrics on how to improve your application"}
                  content={
                    ""
                  }
                  icon="uw_metric.svg"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
        </div>
        <div className="py-3 pb-5 pt-4 ms-3" style={{ background: "#FFFFFF", height: "30rem" }}>
          <div className="d-flex flex-column py-3 center-child" style={{ padding: "36px" }}>
            <div style={{ width: "80vw", height: "52vh" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#070452" }}>
                Get started with our free expert-written blogs
              </div>

              <div
                className="w-100 center-child mb-2"
                style={{
                  height: "50%",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className={classNames(
                    "d-flex flex-row py-3",
                  )}
                  style={{ overflowX: "auto" }}
                >
                  {blogData.recentBlogs.articles[0].map((e) => (
                    <BlogCarouselItem className="shadow-none" article={e} />
                  ))}
                </div>
              </div>
              
              <a href="/blogs" style={{ color: "#070452", textDecoration: "underline" }}>View more blogs</a>
            </div>
          </div>
        </div>


      </Container>
      <Footer />
    </PageErrorBoundary>
  );
};

export default UWCSLandingPage;
