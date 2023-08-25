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

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const numSlides = questionData.length;
  const nextSlide = () => {

    setCurrentIndex((currentIndex + 1) % numSlides);
  }
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + numSlides) % numSlides);
  }

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {questionData.map((data) => (
            <FormCarouselItem question={data.question} answers={data.data} />
          ))}
        </div>
      </div>
      <button disabled={currentIndex === 0} className="prev-button" onClick={prevSlide}>
        Previous
      </button>
      <button disabled={currentIndex === numSlides-1} className="next-button" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default FormCarousel;
