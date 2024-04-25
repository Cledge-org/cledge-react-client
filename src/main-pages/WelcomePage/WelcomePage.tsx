import dynamic from "next/dynamic";

import IntroContent from "./content/IntroContent.json";
import AboutContent from "./content/AboutContent.json";
import MissionContent from "./content/MissionContent.json";
import ProductContent from "./content/ProductContent.json";
import ContactContent from "./content/ContactContent.json";
import MiddleBlockContent from "./content/MiddleBlockContent.json";
import PartnerContent from "./content/PartnerContent.json";
import { useRef, useState } from "react";
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
import Image from 'next/image'
import Pricing from './components/PricingPlans/Pricing';

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

  const learnMore = useRef(null);
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
      <Container className="bg-white">
        <Intro
          className="container-margin"
          style={{
            backgroundSize: "cover",
          }}
        >
          <Fade triggerOnce={true} className="w-100" direction="right">
            <div className="d-flex flex-row gap-4">
              <div className=" w-100 w-md-50 me-4">
                <div style={{ color: 'white', fontSize: isMobile ? '3rem' : '4rem', fontWeight: '800', wordWrap: 'break-word' }}>Meet the Future of <br />College Advising</div>
                <p style={{ color: 'white', marginTop: '3rem', marginBottom: '3rem', fontWeight: '450', wordWrap: 'break-word' }}>Navigate the maze of college admissions with ease. From pinpointing your ideal college matches to crafting a standout application, our intelligent platform and advisors are your allies in unlocking the door to your educational future. Ready to transform your college journey? Dive in and discover the Cledge advantage today!</p>
                <Button className="me-4"
                  color="#F7BC76"
                  onClick={() => {
                    window.open('https://forms.gle/EyAzS5GMZGcffnGs8', '_blank');
                  }}
                >Sign Up Waitlist</Button>
                <Button
                  color="#7B95F4"
                  onClick={() => {
                    learnMore.current.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </Button>
              </div>
              <div className="justify-content-center d-none d-md-flex " style={{ width: '50%' }}>
                <Image src="/images/amico.svg"
                  alt="Cledge"
                  width={700}
                  height={700}
                />
              </div>
            </div>
          </Fade>
        </Intro>
        {/* <div className="d-flex center-child w-100 px-5 py-5 bg-dark-blue">
          <Fade triggerOnce={true} direction="right">
            <CarouselDiv>
              <FormCarousel
                collegeData={data.collegeData}
                questionData={data.checkinQuestions.chunks[0].questions}
              />
            </CarouselDiv>
          </Fade>
        </div> */}

        <div className="pb-5 pt-5">
          <div className="d-flex flex-column justify-content-center">
            <h6 ref={learnMore} className="text-center py-2 pt-3 mt-2" style={{ color: '#506BED' }}>Start Using Cledge Today</h6>
            <Image src="/images/arrow_landing.svg"
              alt="down arrow"
              width={40}
              height={40}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr' }}>
            {GettingStartedSteps.map((block, _i) => (
              <Fade
                triggerOnce={true}
                direction={block.fadeDirection as FadeProps["direction"]}
              >
                {_i % 2 === 0 ? (
                  <LeftContentBlock
                    title={
                      <div>
                        <StepNumber isMobile={isMobile} step={(_i + 1) + ""} />
                        <br />
                        <div style={{ fontSize: isMobile ? 22 : 32 }}>
                          {block.title}
                        </div>
                      </div>
                    }
                    content={block.content}
                    icon={block.icon}
                    id={block.id}
                    isMobile={isMobile}
                  />
                ) : (
                  <UWRightContentBlock
                    title={
                      <div>
                        <StepNumber isMobile={isMobile} step={(_i + 1) + ""} />
                        <br />
                        <div style={{ fontSize: isMobile ? 22 : 32 }}>
                          {block.title}
                        </div>
                      </div>
                    }
                    content={block.content}
                    icon={block.icon}
                    id={block.id}
                  />

                )}
              </Fade>
            ))}
          </div>
        </div>

        <Pricing />

        {/* <Metric id="metric" className="d-flex bg-dark-blue">
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
        </Metric> */}
        <MiddleBlock
          id="goal"
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          width={width}
        />

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '5rem'}}>
            <Button
              className="me-4"
              color="#F7BC76"
              onClick={() => {
                window.open('https://forms.gle/EyAzS5GMZGcffnGs8', '_blank');
              }}
            >
              Sign up for Waitlist!
            </Button>
        </div>
      </Container>
      <UWLandingFooter />
    </PageErrorBoundary>
  );
};

export default WelcomePage;

const StepNumber = styled.div.attrs({ className: "bg-cl-blue cl-white" }) <{
  step: string;
  isMobile: boolean;
}>`
  width: ${props => props.isMobile ? 50 : 50}px;
  height: ${props => props.isMobile ? 50 : 50}px;
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