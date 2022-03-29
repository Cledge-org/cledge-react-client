import dynamic from "next/dynamic";
import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
import AboutContent from "../content/AboutContent.json";
import MissionContent from "../content/MissionContent.json";
import ProductContent from "../content/ProductContent.json";
import ContactContent from "../content/ContactContent.json";
import PartnerContent from "../content/PartnerContent.json";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Footer from "../components/common/Footer";

const Contact = dynamic(() => import("../components/ContactForm"));
const MiddleBlock = dynamic(() => import("../components/MiddleBlock"));
const Container = dynamic(() => import("../components/common/Container"));
const ContentBlock = dynamic(() => import("../components/ContentBlock"));

const FullWidthContainer = styled("div")`
  position: relative;
  width: 100vw;
`;

const Intro = styled(FullWidthContainer)`
  background: center / cover url("images/landing_bg.svg") no-repeat;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 90px;

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
  background: #F9FAFF;
  margin-top: 4rem;
`;

export const SubscribeWrapper = styled("div")`
  background: #0b1142;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  display: block;
  width: calc(100% - 180px);

  @media only screen and (max-width: 767px) {
    width: calc(100% - 36px);
  }

  & > * {
    color: white !important;
  }
`;

const Home = () => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);

  return (
    <>
      <Container>
        <Intro className="container-margin">
          <ContentBlock
            type="right"
            title={IntroContent.title}
            content={IntroContent.text}
            button={IntroContent.button}
            video={<YoutubeEmbed videoId="Bly0QbY3fV4" />}
            id="intro"
          />
          <SubscribeWrapper>
            <h2>
              Join the Cledge Community & get started with our free resources
            </h2>
            <p>
              Get monthly access to free live webinars & tips from college
              advisors!
            </p>
          </SubscribeWrapper>
        </Intro>
        <MiddleBlock
          id="goal"
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
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
        <ContentBlock
          type="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="landing_2.svg"
          id="mission"
        />
        <ContentBlock
          type="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="landing_3.svg"
          id="product"
        />
        <Partner>
          <MiddleBlock
            id="partner"
            title={PartnerContent.title}
            content={PartnerContent.text}
          />
        </Partner>
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
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
    </>
  );
};

export default Home;
