import React from "react";
import Slider from "react-slick";
import FormCarouselItem from "src/main-pages/WelcomePage/components/FormCarousel/components/FormCarouselItem";

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
  console.log(questionData);
  return (
    <div>
      <Slider {...settings}>
        {questionData.map((data) => (
          <FormCarouselItem question={data.question} answers={data.data} />
        ))}
        {/* <div>
          <h3>6</h3>
        </div> */}
      </Slider>
    </div>
  );
};

export default FormCarousel;
