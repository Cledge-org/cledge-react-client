/* eslint-disable react/jsx-key */
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "../Button/Button";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import classNames from "classnames";
import { callPutUWWaitlist } from "src/utils/apiCalls";
import { CircularProgress } from "@mui/material";
import UWQuoteBlock from "./components/UWPackageFeature/UWQuoteBlock";
import UWLandingCard from "./components/UWPackageFeature/UWLandingCard";
import UWRightContentBlock from "src/main-pages/WelcomePage/components/UWCSLandingPage/components/UWRightContentBlock/UWRightContentBlock";
import { Intro, BlobBlock } from "./components/UWPackageFeature/styles";

const UWLandingFooter = dynamic(() => import("./components/footer/UWLandingFooter"));
const Container = dynamic(() => import("../Container/Container"));
const BlogCarouselItem = dynamic(() => import("../blogsCarousel/components/BlogCaroselItem"));

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
  const [width, height] = useWindowSize();
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const router = useRouter();
  const isMobile = width <= 810;
  const packageAd = (
    <BlobBlock className={!isMobile ? "py-5" : ""}>
      <Fade triggerOnce={true} direction="right" className="center-child w-100">
        <div
          className={classNames(
            "d-flex flex-row justify-content-between align-items-center flex-wrap",
            { "my-4 mt-5 mx-3": isMobile }, {"BlobContainer": !isMobile}
          )}
          style={{ height: "fit-content" }}
        >
          <div
            className="d-flex flex-column justify-content-between h-100"
            style={{ width: isMobile ? "100%" : "48%", borderRight: isMobile ? "" : "1px solid #C1C0CE" }}
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
                Full Package
              </div>
              ) : null}
            </div>
            <div className="ms-3">
              {!isMobile ? (
                <div 
                className={classNames("mt-5")}
                style={{
                  width: isMobile ? "100%" : "50%",
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
                className="cl-btn-blue mt-3"
                onClick={() => {
                  window.open(
                    `/auth/uw-purchase`,
                    "_self"
                  );
                }}
                style={{
                  width: isMobile ? "100%" : "50%",
                  borderRadius: "8px",
                  fontSize: "18px",
                }}
              >
                Sign Up
              </button>
              ) : null }
            </div>
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
              "Advice on whether to apply to Computer Engineering or Computer Science",
              "The Cledge AI Advisor & College Search Tool",
            ].map((option) => (
              <div className={classNames("d-flex flex-row ms-3 mt-4 align-items-center", {"mt-3": isMobile})}>
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
                fontSize: "16px",
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
                  `/auth/uw-purchase`,
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
              Sign Up
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
            height: "65vh",
            backgroundPosition: isMobile ? "top left" : "center",
          }}
        >
          <Fade triggerOnce={true} className="w-100 justify-content-center h-100" direction="right">
            <div
              style={{
                color: "white",
                width: "100%",
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
                    fontSize: isMobile ? "20px" : "45px",
                    textAlign: "center",
                    lineHeight: "1.25em"
                  }}
                >
                  { isMobile ? "Cledge improves your chances" : "Cledge improves your chances for"}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "20px" : "52px",
                    textAlign: "center",
                    lineHeight: "1.25em"
                  }}
                >
                  { isMobile ? "for University of Washington" : "University of Washington"}
                  <br />
                  Computer Science Admissions
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
                          `/auth/uw-purchase`,
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
              height: "65vh"
            }}
          >
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "fit-content" }}
            >
              <UWLandingCard
                className="me-2"
                title="Learn from successful student profiles"
                description="Learn from our comprehensive profile analysis and curated courses."
                imageSrc="uwcard1.png"
              />
              <UWLandingCard
                className="mx-2"
                title="Ask a college counselor & AI"
                description="Get answers from your assigned college counselor and the Cledge AI."
                imageSrc="uwcard2.png"
              />
              <UWLandingCard
                className="ms-2"
                title="Personalized improvement metrics"
                description="Get personalized metrics on where you stand and how to improve your academics or extracurriculars."
                imageSrc="uwcard3.svg"
              />
            </div>
          </div>
        </div>
        {packageAd}
        <div className="pt-5" style={{ background: "#0B1142", height: "26rem" }}>
          <div className="d-flex flex-column justify-content-center align-items-center" >
            <div>
              <div className={classNames("d-flex", {"justify-content-center": isMobile})} style={{ fontSize: isMobile ? "4.5vw" : "28px", fontWeight: 700, color: "#FFFFFF" }}>
                Trusted by both students and parents:
              </div>
              <div className="d-flex flex-row justify-content-start">
                <UWQuoteBlock
                  content={
                    "I prefer Cledge's Chatbot over Google. It provides straightforward information and eliminates the navigation of multiple websites."
                  }
                />
                {!isMobile && (
                  <UWQuoteBlock
                    content={
                      "Cledge's platform is far more personalized compared to alternatives. Cledge provides actionable steps to achieve academic success."
                    }
                  />
                )}
                {!isMobile && (
                  <UWQuoteBlock
                    content={
                      "I have never seen online college counseling provide such an advanced chatbot feature. Each response was very detailed and helped answer my questions in a concise manner."
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: "#DCE1FB" }}>
          <Fade triggerOnce={true} direction="right">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <UWRightContentBlock
                  type={"right"}
                  title={
                    <div>
                      <div>
                        <img src={`images/uw_1.svg`} alt="1" />
                      </div>
                      <br />
                      <div style={{ fontSize: isMobile ? 22 : 32 }}>Get personalized help based off what you tell us and what type of applicant you are.</div>
                    </div>
                  }
                  content={
                    ""
                  }
                  icon="images/uw_question.png"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="left">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <UWRightContentBlock
                  type={"right"}
                  title={
                    <div>
                      <div>
                        <img src={`images/uw_2.svg`} alt="2" />
                      </div>
                      <br />
                      <div style={{ fontSize: isMobile ? 22 : 32 }}>Get started with learning pathways guiding you to successfully stand out on your UW CS application.</div>
                    </div>
                  }
                  content={
                    ""
                  }
                  icon="images/uw_pathway.png"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="right">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <UWRightContentBlock
                  type={"right"}
                  title={
                    <div>
                      <div>
                        <img src={`images/uw_3.svg`} alt="3" />
                      </div>
                      <br />
                      <div style={{ fontSize: isMobile ? 22 : 32 }}>Get questions answered by your assigned college counselor and AI advisor.</div>
                    </div>
                  }
                  content={
                    ""
                  }
                  icon="images/uw_chatbot.png"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} direction="left">
            <div style={{background: "#DCE1FB"}}>
              <div className="pt-5 pb-5">
                <UWRightContentBlock
                  type={"right"}
                  title={
                    <div>
                      <div>
                        <img src={`images/uw_4.svg`} alt="4" />
                      </div>
                      <br />
                      <div style={{ fontSize: isMobile ? 22 : 32 }}>Get specific metrics on how to improve your application.</div>
                    </div>
                  }
                  content={
                    ""
                  }
                  icon="images/uw_metric.png"
                  id="mission2"
                />
              </div>
            </div>
          </Fade>
        </div>
        <div className="py-3 pb-5 pt-4 ms-3" style={{ background: "#FFFFFF", height: "30rem" }}>
          <div className="d-flex flex-column py-3 center-child" style={{ padding: "36px" }}>
            <div style={{ width: "85%" }}>
              <div style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 700, color: "#070452" }}>
                Get started with our free expert-written blogs
              </div>

              <div
                className="w-100 mb-2"
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
                  {blogData ? blogData.recentBlogs.articles[0].map((e) => (
                    <BlogCarouselItem className="shadow-none" article={e} />
                  )) : null}
                </div>
              </div>
              
              <Link href="/blogs" style={{ color: "#070452", textDecoration: "underline" }}>View more blogs</Link>
            </div>
          </div>
        </div>
      </Container>
      <UWLandingFooter />
    </PageErrorBoundary>
  );
};

export default UWCSLandingPage;
