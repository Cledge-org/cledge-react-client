import React from "react";
import Slider from "react-slick";
import FormCarouselItem from "src/main-pages/WelcomePage/components/FormCarousel/components/FormCarouselItem";

const FormCarousel = ({ questionData }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {questionData.map((data) => (
          <FormCarouselItem question={data.question} answers={data.answers} />
        ))}
        {/* <div>
          <h3>6</h3>
        </div> */}
      </Slider>
    </div>
  );
};

export default FormCarousel;
