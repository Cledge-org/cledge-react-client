import dynamic from "next/dynamic";

import IntroContent from "./content/IntroContent.json";
import AboutContent from "./content/AboutContent.json";
import MissionContent from "./content/MissionContent.json";
import ProductContent from "./content/ProductContent.json";
import ContactContent from "./content/ContactContent.json";
import MiddleBlockContent from "./content/MiddleBlockContent.json";
import PartnerContent from "./content/PartnerContent.json";
import {  useRef, useState } from "react";
import Footer from "./components/Footer/Footer";
import styled from "styled-components";
import { Fade, FadeProps } from "react-awesome-reveal";
import { Button } from "./components/Button/Button";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import UWCSLandingPage from "./components/UWCSLandingPage/UWCSLandingPage";
import { useLocation } from "src/utils/hooks/useLocation";
import FormCarousel from "./components/FormCarousel/FormCarousel";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import UWRightContentBlock from "src/main-pages/WelcomePage/components/UWCSLandingPage/components/UWRightContentBlock/UWRightContentBlock";
import classNames from "classnames";
import { useRouter } from "next/router";
import LeftContentBlock from "src/main-pages/WelcomePage/components/ContentBlock/components/LeftContentBlock/LeftContentBlock";
import { GettingStartedSteps } from "src/main-pages/WelcomePage/content/GettingStartedSteps";

const MiddleBlock = dynamic(
  () => import("./components/MiddleBlock/MiddleBlock")
);
const Container = dynamic(() => import("./components/Container/Container"));

const UWLandingFooter = dynamic(
  () => import("./components/UWCSLandingPage/components/footer/UWLandingFooter")
);

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: center / cover url("images/landing_bg.svg") no-repeat;
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
    text-align: center;
  }

  #intro h6 {
    font-size: 84px;
  }
  #intro p {
    padding: 0 20px;
    font-size: 20px;
  }
  #intro button {
    margin: 0 auto;
  }
`;

const Metric = styled(FullWidthContainer)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px 150px;

  @media only screen and (max-width: 767px) {
    padding: 30px 18px;
  }

  & > div {
    padding: 20px;
    max-width: 400px;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }
  }

  div h2,
  div p {
    color: white;
  }

  p {
    font-size: 14px;
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
  background-color: white;

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
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80vw;
    height: 50vh;
    border: 1px solid transparent;
    background: center / cover url("images/gradient-blob.svg") no-repeat;
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

const CarouselDiv = styled.div`
  margin: auto;
  width: 100%;
  height: fit-content;
`;

const WelcomePage = ({ data }) => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  const windowOrigin = useLocation();
  if (windowOrigin.includes("uw")) {
    return <UWCSLandingPage blogData={data} />;
  }
  const { width, height } = useWindowSize();
  const isMobile = width <= 810;

  const router = useRouter();
  return (
    <PageErrorBoundary>
      <Container className="bg-light-blue">
        <Intro
          className="container-margin"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Fade triggerOnce={true} className="w-100" direction="right">
            <div
              style={{
                color: "white",
                width: "100%",
                marginBottom: "10vh",
              }}
              className={classNames(
                `d-flex flex-column justify-content-center ${
                  isMobile ? "px-3" : "px-5"
                }`
              )}
            >
              <div
                className="w-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  marginTop: isMobile ? "6rem" : null,
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "48px" : "96px",
                    textAlign: "center",
                    lineHeight: "1.25em",
                  }}
                >
                  Meet the Future of
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "48px" : "96px",
                    textAlign: "center",
                    lineHeight: "1.25em",
                  }}
                  className="mb-4"
                >
                  College Advising.
                </div>
                {isMobile ? null : (
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "15px" : "25px",
                      textAlign: "center",
                      lineHeight: "1.6em",
                    }}
                    className="my-3"
                  >
                    Maximize your chances to get into your best-fit colleges. We
                    use AI
                    <br />
                    and data driven tools to give you an edge on your
                    application.
                  </div>
                )}
                <Button
                  key="buy-now-btn"
                  color="#F7BC76"
                  fixedWidth={true}
                  className={classNames(`${isMobile ? "w-50" : "w-25 mt-4"}`)}
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                >
                  Sign Up For Free
                </Button>
              </div>
            </div>
          </Fade>
        </Intro>
        <div className="d-flex center-child w-100 px-5 py-5 bg-dark-blue">
            <Fade triggerOnce={true} direction="right">
              <CarouselDiv>
                  <FormCarousel
                    collegeData={data.collegeData}
                    questionData={data.checkinQuestions.chunks[0].questions}
                  />
              </CarouselDiv>
            </Fade>
        </div>

        <div className="pb-5 pt-5">
          <h6 className="text-center py-2 pt-4 mt-4">How it Works:</h6>
          {GettingStartedSteps.map((block, _i) => (
            <Fade
              triggerOnce={true}
              direction={block.fadeDirection as FadeProps["direction"]}
            >
                  <LeftContentBlock
                    title={
                      <div>
                        <StepNumber isMobile={isMobile} step={(_i + 1)+""} />
                        <br />
                        <div style={{ fontSize: isMobile ? 22 : 32 }}>
                          {block.title}
                        </div>
                      </div>
                    }
                    content={""}
                    icon={block.icon}
                    id={block.id}
                  />
            </Fade>
          ))}
        </div>
        {/* <BlobBlock>
          <Fade direction="right" className="center-child w-100">
            <div className="BlobContainer flex-wrap">
              <div
                className="d-flex flex-column justify-content-end ps-5"
                style={{
                  color: "white",
                  width: width < 800 ? "100%" : "50%",
                  height: width < 800 ? "50%" : "75%",
                }}
              >
                <div
                  className="center-child px-3 fw-bold"
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
                    fontSize: width < 800 ? "18px" : "52px",
                  }}
                >
                  Cledge is now available for University of Washington CS
                  Admissions
                </div>
              </div>
              <div
                className="d-flex flex-row-reverse align-items-end pe-5"
                style={{
                  width: width < 800 ? "100%" : "50%",
                  height: width < 800 ? "50%" : "75%",
                }}
              >
                <Button
                  key="subscribe-btn"
                  color="#F7BC76"
                  fixedWidth={false}
                  className={width < 800 ? "w-75 mb-3" : "w-25"}
                  onClick={() => {
                    window.open("https://uw.cledge.org", "_blank");
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Fade>
        </BlobBlock> */}
        <Metric id="metric" className="d-flex bg-dark-blue">
          <div>
            <h2 className="title ">100+ metrics</h2>
            <p>used to give you personalized feedback</p>
          </div>
          <div>
            <h2 className="title">50+ hours of content</h2>
            <p>
              at your disposal to help you navigate all all parts of the
              application and preparation process
            </p>
          </div>
          <div>
            <h2 className="title">90% of users</h2>
            <p>
              increased confidence in college related decisions using Cledge
            </p>
          </div>
        </Metric>
        <MiddleBlock
          id="goal"
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          width={width}
        />
      </Container>
      <UWLandingFooter />
    </PageErrorBoundary>
  );
};

export default WelcomePage;

const StepNumber = styled.div.attrs({ className: "bg-cl-blue cl-white" })<{
  step: string;
  isMobile: boolean;
}>`
  width: ${props => props.isMobile ? 70 : 100}px;
  height: ${props => props.isMobile ? 70 : 100}px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:46px;
  font-family: Pragati Narrow;
  font-weight:400;
  &::before {
    content: "${(props) => props.step}";
  }
`;
