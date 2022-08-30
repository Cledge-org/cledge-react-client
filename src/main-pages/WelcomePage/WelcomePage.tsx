import dynamic from "next/dynamic";

import IntroContent from "./content/IntroContent.json";
import AboutContent from "./content/AboutContent.json";
import MissionContent from "./content/MissionContent.json";
import ProductContent from "./content/ProductContent.json";
import ContactContent from "./content/ContactContent.json";
import MiddleBlockContent from "./content/MiddleBlockContent.json";
import PartnerContent from "./content/PartnerContent.json";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Footer from "./components/Footer/Footer";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { Button } from "./components/Button/Button";
import DropDownQuestion from "../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import YoutubeEmbed from "../../common/components/YoutubeEmbed/YoutubeEmbed";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import NewBlogsCarousel from "src/main-pages/WelcomePage/components/blogsCarousel/NewBlogsCarousel";
import { NextPage } from "next";
import { NextApplicationPage } from "src/main-pages/AppPage/AppPage";

const Contact = dynamic(() => import("./components/ContactForm/ContactForm"));
const MiddleBlock = dynamic(
  () => import("./components/MiddleBlock/MiddleBlock")
);
const Container = dynamic(() => import("./components/Container/Container"));
const ContentBlock = dynamic(
  () => import("./components/ContentBlock/ContentBlock")
);

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: center / cover url("images/landing_bg.svg") no-repeat;
  min-height: 110vh;
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

const WelcomePage = ({data}) => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);
  const [width, height] = useWindowSize();

  return (
    <PageErrorBoundary>
      <Container>
        <Intro className="container-margin">
          <div className="w-100">
            <ContentBlock
              type="right"
              title={IntroContent.title}
              content={IntroContent.text}
              button={IntroContent.button}
              video={<YoutubeEmbed videoId="Bly0QbY3fV4" />}
              id="intro"
              width={width}
            />
          </div>
          <SubscribeWrapper>
            <h2>Get started with our free resources</h2>
            <p>
              Get monthly access to free live webinars & tips from college
              advisors!
            </p>
            <div className="input d-flex flex-row flex-wrap align-items-end justify-content-evenly">
              <div className="flex-fill">
                <label>I am a</label>
                <DropDownQuestion
                  isForWaitlist
                  valuesList={["Parent", "Student"]}
                />
              </div>
              <div className="flex-fill">
                <label>Email</label>
                <input
                  type="text"
                  style={{ color: "black" }}
                  placeholder="Your email"
                />
              </div>
              <Button
                key="subscribe-btn"
                color="#F7BC76"
                fixedWidth={true}
                onClick={() => {
                  window.open("https://forms.gle/M1GxLK45Yi3Esfn5A", "_blank");
                }}
              >
                Subscribe to our monthly tips
              </Button>
            </div>
          </SubscribeWrapper>
          <div
            style={{
              bottom: "5vh",
              left: 0,
              width: "100%",
              margin: "30px 0",
            }}
            className="d-flex flex-row flex-wrap justify-content-center align-items-center"
          >
            <MediaButton
              onClick={() =>
                window.open("https://rebrand.ly/c1f9dl6", "_blank")
              }
            >
              <img src="images/whatsapp.svg" />
              WhatsApp Community
            </MediaButton>
            <MediaButton
              onClick={() =>
                window.open("https://discord.gg/CnJcZeb3", "_blank")
              }
            >
              <img src="images/discord.svg" />
              Discord Community
            </MediaButton>
          </div>
        </Intro>
        <MiddleBlock
          id="goal"
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          width={width}
        />
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
        <ContentBlock
          type="left"
          title={AboutContent.title}
          content={AboutContent.text}
          icon="landing_1.svg"
          id="about"
        />
        {width < 576 ? (
          <ContentBlock
            type="left"
            title={MissionContent.title}
            content={MissionContent.text}
            icon="landing_2.svg"
            id="mission"
          />
        ) : (
          <ContentBlock
            type="right"
            title={MissionContent.title}
            content={MissionContent.text}
            icon="landing_2.svg"
            id="mission"
          />
        )}
        <ContentBlock
          type="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="landing_3.svg"
          id="product"
        />
        <NewBlogsCarousel recentBlogs={data.recentBlogs}/>
        <Partner>
          <MiddleBlock
            id="partner"
            title={PartnerContent.title}
            content={PartnerContent.text}
            width={width}
          />
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
          console.log(slideShowRef.current.offsetTop);
          document.body.scrollTo({
            top: slideShowRef.current.offsetTop,
            behavior: "smooth",
          });
        }}
      />
    </PageErrorBoundary>
  );
};

  export default WelcomePage;