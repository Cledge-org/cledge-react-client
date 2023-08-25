import React from "react";
import FormCarouselItem from "src/main-pages/WelcomePage/components/FormCarousel/components/FormCarouselItem";
import styles from "FormCarousel.module.scss";

interface Props {
  questionData: {
    _id: string;
    data: {
      op: string;
      tag: string;
    }[];
    helpText: string;
    helpVid: string;
    isConcatenable: boolean;
    isRequired: boolean;
    question: string;
    type: string;
  }[];
}

const FormCarousel = ({ questionData }: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="carousel">
      <div className="slides">
          {questionData.map((data) => (
            <FormCarouselItem question={data.question} answers={data.data} />
          ))}
        {/* <Slider {...settings}>
          {/* <div>
            <h3>6</h3>
          </div> 
        </Slider> */}
      </div>
  </div>
  );
};

export default FormCarousel;
