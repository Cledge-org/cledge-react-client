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

const Contact = dynamic(() => import("../ContactForm/ContactForm"));
const MiddleBlock = dynamic(() => import("../MiddleBlock/MiddleBlock"));
const Container = dynamic(() => import("../Container/Container"));
const ContentBlock = dynamic(() => import("../ContentBlock/ContentBlock"));

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: center / cover url("images/uw-landing-bg.svg") no-repeat;
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

const Metric = styled(FullWidthContainer)`
  margin-top: 100px;
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
  background: center / cover url("images/gradient-blob.svg") no-repeat;

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
    padding: 5rem 18px;

    button {
      width: 100%;
    }

    p {
      margin-top: 1rem;
    }

    & img {
      width: 100%;
      margin: 3rem 0;
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

    .BlobContainer {
      width: 80vw;
      height: 50vh;
      border: 1px solid transparent;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.3);

      button {
        width: 20vw;
      }

      & img {
        width: 100%;
      }

      div:last-child {
        position: absolute;
      }
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

  return (
    <PageErrorBoundary>
      <Container>
        <Intro className="container-margin">
          <div
            style={{ color: "white" }}
            className="d-flex flex-column justify-content-around w-50 h-100 px-5"
          >
            <div>
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
                  fontSize: "52px",
                }}
              >
                Cledge is now available for University of Washington CS
                Admissions
              </div>
            </div>
            <div>
              <div style={{ fontSize: "20px" }}>
                Utilize the power of Cledge to gain an edge on your UW CS
                application. Get insider access to how UW CS scores your
                application, view successful applicant profiles, and then get
                help writing the UW supplemental essay. Still need help? You
                will get one 30 minute consultation with a college advisor and
                access to Cledge AI tools.
              </div>
              <div style={{ width: "200px" }}>
                <Button
                  key="buy-now-btn"
                  color="#F7BC76"
                  fixedWidth={false}
                  className="px-5"
                  onClick={() => {
                    //   window.open("https://forms.gle/M1GxLK45Yi3Esfn5A", "_blank");
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Intro>
        <ContentBlock
          type="left"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="uw_landing_1.svg"
          id="mission"
        />
        <ContentBlock
          type="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="uw_landing_2.svg"
          id="mission2"
        />
        <Partner>
          <div className="d-flex flex-column py-3 align-items-center">
            <div style={{ fontSize: "48px", fontWeight: 700 }}>
              Plus, you get:
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <UWPackageFeature
              title="AI Advisor"
              description="Get instant answers from our AI college advisor chat. Not satisfied? Upload it to ask a real counselor."
              imageSrc="uw_package_1.svg"
            />
            <UWPackageFeature
              title="College Search"
              description="Use our college search tool to get information on acceptance rate ratios between male/female applicants, average salary after graduation and more."
              imageSrc="uw_package_2.svg"
            />
            <UWPackageFeature
              title="Metrics"
              description="See how you are doing in academics and extracurriculars. Get
                recommendations on how to improve."
              imageSrc="uw_package_3.svg"
            />
          </div>
        </Partner>
        <BlobBlock>
          <Fade direction="right" className="center-child w-100">
            <div className="BlobContainer">
              <div style={{ color: "white" }}>
                <strong style={{ fontSize: "2em" }}>
                  Ready to take the next step towards your dreams?
                </strong>
                <p style={{ color: "white" }}>
                  Join our Insider Program to get first access to the 24/7
                  college chat service
                </p>
              </div>
              <img src="images/insider-blob.svg" />
              <div style={{ bottom: "-2vh", left: "5vw" }}>
                <Button
                  key="subscribe-btn"
                  color="#F7BC76"
                  fixedWidth={false}
                  onClick={() => {
                    window.open(
                      "https://forms.gle/M1GxLK45Yi3Esfn5A",
                      "_blank"
                    );
                  }}
                >
                  Join Insider Program for Free ➜
                </Button>
              </div>
            </div>
          </Fade>
        </BlobBlock>
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
