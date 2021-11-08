import React, { useState, useRef } from "react";
import Slider from "react-slick";
import FeatureCard from "./FeatureCard";
import QuestionsIMG from "../../public/images/landing_questions.png";
import VideoIMG from "../../public/images/landing_video.png";
import ChatbotIMG from "../../public/images/landing_chatbot.png";
import SearchIMG from "../../public/images/landing_search_tool.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faChalkboardTeacher,
  faComments,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  afterChange: function (index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
};

export default () => {
  const sliderRef = useRef<Slider>();

  const handleOnClick = (index) => {
    sliderRef.current.slickGoTo(index);
    setIndex(index);
  };

  const [index, setIndex] = useState(0);

  return (
    <div
      className="pt-0 pt-md-4 pb-0 h-100"
      style={{ backgroundColor: "#f5f5f5", height: "90vh" }}
    >
      <div className="row">
        <div className="shadow-sm text-center col-12 col-md-11 col-lg-9 bg-white rounded-lg feature-tabbar mx-auto">
          <h2 className="pt-3 fs-4 fw-bold">Features</h2>
          <div className="row p-3 justify-content-evenly">
            <div className="col-6 col-lg-3">
              <FeatureTab
                index={0}
                curr={index}
                title={"Personalization Quizes"}
                icon={faEdit}
                onClick={() => handleOnClick(0)}
              />
            </div>
            <div className="col-6 col-lg-3">
              <FeatureTab
                index={1}
                curr={index}
                title={"Video Learning Pathway"}
                icon={faChalkboardTeacher}
                onClick={() => handleOnClick(1)}
              />
            </div>
            <div className="col-6 col-lg-3">
              <FeatureTab
                index={2}
                curr={index}
                title={"AI Counselor"}
                icon={faComments}
                onClick={() => handleOnClick(2)}
              />
            </div>
            <div className="col-6 col-lg-3">
              <FeatureTab
                index={3}
                curr={index}
                title={"College Search Tool"}
                icon={faSearch}
                onClick={() => handleOnClick(3)}
              />
            </div>
          </div>
        </div>
      </div>
      <Slider className="pb-0" {...settings} ref={sliderRef}>
        <FeatureCard
          title={"PERSONALIZATION QUIZZES"}
          description={
            "Discover schools that match what’s important to you – location, majors, campus life, cost."
          }
          image={QuestionsIMG}
        />
        <FeatureCard
          title={"VIDEO LEARNING PATHWAYS"}
          description={
            "Every single student is unique in their interests and goals. Cledge looks to provide tailored learning experiences for every student that addresses these interests and goals."
          }
          image={VideoIMG}
        />
        <FeatureCard
          title={"AI COUNSELOR"}
          description={
            "An AI assistant will answer questions and provide personalized guidance based on historical data."
          }
          image={ChatbotIMG}
        />
        <FeatureCard
          title={"COLLEGE SEARCH TOOL"}
          description={
            "Discover schools that match what’s important to you – location, majors, campus life, cost."
          }
          image={SearchIMG}
        />
      </Slider>
    </div>
  );
};

interface FeatureTabProps {
  icon: any;
  title: string;
  onClick: Function;
  curr: number;
  index: number;
}

const FeatureTab = ({ icon, title, onClick, curr, index }: FeatureTabProps) => {
  const borderColor = curr == index ? "#2651ed" : "#f2f2f7";
  return (
    <div
      className="feature-tab d-flex flex-column justify-content-between"
      onClick={(e) => onClick()}
      style={{ borderColor: borderColor }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ height: "2.4em" }}
        className="cl-blue"
      />
      <p
        className="pt-3 m-0 cl-darktext text-nowrap overflow-hidden"
        style={{ fontSize: "0.9em" }}
      >
        {title}
      </p>
    </div>
  );
};
