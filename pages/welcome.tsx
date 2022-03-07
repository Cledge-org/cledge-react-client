import dynamic from "next/dynamic";
import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
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
const Container = dynamic(() => import("../common/Container"));
const ScrollToTop = dynamic(() => import("../common/ScrollToTop"));
const ContentBlock = dynamic(() => import("../components/ContentBlock"));

const Intro = styled("div")`
  background: center / cover url("images/landing_bg.svg") no-repeat;
  width: calc(100% + 180px);
  padding: 0 90px;
  position: relative;
  left: -90px;
  height: 100vh;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    width: calc(100% + 120px);
    left: -60px;
    padding: 0 60px;
  }

  @media only screen and (max-width: 768px) {
    width: calc(100% + 36px);
    left: -18px;
    padding: 0 18px;
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

const Metric = styled.div`
  position: relative;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  width: 100vw;
  left: -60px;

  @media only screen and (max-width: 768px) {
    left: -18px;
  }

  & > div {
    width: 33.3%;
    flex: 1 0 auto;
    padding: 20px;

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

const Home = () => {
  const slideShowRef = useRef(null);
  const [currFeature, setCurrFeature] = useState(0);

  return (
    <>
      <Container>
        <ScrollToTop />
        <Intro>
          <ContentBlock
            type="right"
            title={IntroContent.title}
            content={IntroContent.text}
            button={IntroContent.button}
            icon="landing_video.svg"
            id="intro"
          />
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
        <MiddleBlock
          id="partner"
          title={PartnerContent.title}
          content={PartnerContent.text}
        />
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
