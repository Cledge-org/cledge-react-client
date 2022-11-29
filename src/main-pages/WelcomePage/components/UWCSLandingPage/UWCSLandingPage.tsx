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
import UWQuestionsExplained from "src/main-pages/WelcomePage/components/UWCSLandingPage/components/UWPackageFeature/UWQuestionsExplained";
import UWQuotes from "src/main-pages/WelcomePage/components/UWCSLandingPage/components/UWPackageFeature/UWStudentQuotes";
import NewBlogsCarousel from "src/main-pages/WelcomePage/components/blogsCarousel/NewBlogsCarousel";


const Contact = dynamic(() => import("../ContactForm/ContactForm"));
const MiddleBlock = dynamic(() => import("../MiddleBlock/MiddleBlock"));
const Container = dynamic(() => import("../Container/Container"));
const ContentBlock = dynamic(() => import("../ContentBlock/ContentBlock"));

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: url("images/gates-center-background_1.jpg") no-repeat;
  height: 65vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: right;
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
  
  button {
    // margin-top: 200px;
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
    width: 65vw;
    height: 52vh;
    border: 1px solid transparent;
    // border-radius: 15px;
    background-color: #EFF2FE
    ;
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

const Partner = styled(FullWidthContainer)`
background: #0B1142;
// margin-top: 1rem;
`;

const Partner2 = styled(FullWidthContainer)`
background: #DCE1FB;
// margin-top: 1rem;


`;

const Quotes = styled(FullWidthContainer)`
background: #0B1142;
// margin-top: 1rem;

`;

// const BlogsCarousel = styled(FullWidthContainer)`
// background: #0B1142;
// // margin-top: 1rem;
// BlogsCarousel
// `;

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

const UWCSLandingPage = ({ data }) => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  const [width, height] = useWindowSize();
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState(false);
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
              <div style={{ fontSize: width < 800 ? "28px" : "36px"}}>
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
              "100 questions to ask the Cledge AI Advisor",
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
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#F7BC76",
                    fontSize: width < 800 ? "24px" : "40px",
                  }}
                >
                 Cledge improve your chances for
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: width < 800 ? "20px" : "22px",
                    // width: "370px",
                    // textAlign: "center",
                    // position: "relative",
                    // left: "160px",
                  }}
                >
                  University of Washington 
                  Computer Science Admissions
                </div>
              </div>
              
              <div className={classNames({ "w-100": width < 800 })}>                
                <div style={{ width: width < 800 ? "100%" : "300px", position: "relative", bottom: "170px"}}>
                  <Button
                    key="buy-now-btn"
                    color="#F7BC76"
                    fixedWidth={false}
                    className={classNames("px-5", { "w-100": width < 800 })}
                    onClick={() => {
                      if (width < 800) {
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
            </div>
          </Fade>
        </Intro>
        <Partner className="py-3 pb-5">
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              background: "#0B1142",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWPackageFeature
                className="me-2"
                title="New to the application process?"
                description="Learn From succesful UW CS profiles and the Cledge courses curated for you."
                imageSrc="application_process.svg"
              />
              <UWPackageFeature
                className="mx-2"
                title="Have Specific Questions?"
                description="Get answers from your assigned college counselor and the Cledge AI."
                imageSrc="specific_questions.svg"
              />
              <UWPackageFeature
                className="ms-2"
                title="Not sure how to improve?"
                description="Get personalized metrics on where you stand and how to improve your
                academics or extracurriculars"
                imageSrc="how_to_improve.svg"
              />
            </div>
          </div>
        </Partner>
        {width > 800 && packageAd}
        <Quotes className="py-3 pb-5">
        <div
          style={{
          fontWeight: "bold",
          color: "#FFFFFF",
          fontSize:  "24px",
          position: "relative",
          top: "80px",
          left: "200px",
          }}
          >
          Trusted by both students and parents
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
              <UWQuotes
                className="me-2"
                description="I prefer Cledge's Chatbot over Google. It provides straightforward 
                information and eliminates the navigation of multiple websites."
                imageSrc="quotation_icon.svg"
              />
               <UWQuotes
                className="me-2"
                description="Cledge's platform is far more personalized compared to alternatives. 
                Cledge provides actionable steps to achieve academic success."
                imageSrc="quotation_icon.svg"
              />
              <UWQuotes
                className="me-2"
                description="I have never seen online college counseling provide such an advanced chatbot feature. 
                Each response was very detailed and helped answer my questions in a concise manner"
                imageSrc="quotation_icon.svg"
              />                          
            </div>
          </div>
        </Quotes>

        <Partner2 className="py-3 pb-5">
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              background: "#DCE1FB",
              overflowWrap: "break-word",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWQuestionsExplained
                className="me-2"
                LogoSrc="one_icon.svg"
                description="Get dynamic help based off what you tell us and what type of applicant you are."
                imageSrc="ai_page.svg"
              />
            </div>
          </div>
        </Partner2>

        <Partner2 className="py-3 pb-5">
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              // overflowX: "auto",
              // overflowY: "hidden",
              // width: "100%",
              background: "#DCE1FB",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWQuestionsExplained
                className="me-2"
                LogoSrc="two_icon.svg"
                description="Get started with learning pathways guiding you to successfully stand out on your UW CS application."
                imageSrc="my_learning.svg"
              />
            </div>
          </div>
        </Partner2>

        <Partner2 className="py-3 pb-5">
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              background: "#DCE1FB",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWQuestionsExplained
                className="me-2"
                LogoSrc="three_icon.svg"
                description="Get questions answered by your assigned college counselor and AI advisor."
                imageSrc="cledge_ai_landing.svg"
              />
            </div>
          </div>
        </Partner2>

        <Partner2 className="py-3 pb-5">
          <div
            className={classNames({ "px-2": width < 800 })}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              background: "#DCE1FB",
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWQuestionsExplained
                className="me-2"
                LogoSrc="four_icon.svg"
                description="Get personalized metrics on how to improve your application."
                imageSrc="personalized_metrics.svg"
              />
            </div>
          </div>
        </Partner2>

        {/* <NewBlogsCarousel recentBlogs={data.recentBlogs} /> */}

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
                  onClick={() => {
                    window.open("https://cledge.org", "_blank");
                  }}
                >
                  Learn More
                </Button>
              </div>
            </Fade>
          </div>
        )}
      </Container>
      <Footer />
    </PageErrorBoundary>
  );
};

export default UWCSLandingPage;
