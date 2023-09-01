import React from "react";
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion/MultipleChoiceQuestion";
import styles from "./FormCarousel.module.scss";
import cs from "classnames";
import styled from "styled-components";
import Image from "next/image";
import Splash from "./components/Splash/Splash";
import FitSchools from "./components/FitSchools/FitSchools";

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

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const numSlides = questionData.length+2;
  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentSlide === numSlides) return;
    setCurrentSlide((currentSlide + 1));
  }
  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(currentSlide === -1) return;
    setCurrentSlide((currentSlide - 1));
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  return (
    <div className={cs(styles.carouselContainer)}>
      <div className={cs(styles.carousel)}>
        <form onSubmit={currentSlide === numSlides - 1 ? handleSubmit : (e) => e.preventDefault()}>
          <div className={styles.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <Splash classNames={styles.slide} buttonHandler={nextSlide}/>
            {questionData.map((data) => (
              <MultipleChoiceQuestion classNames={styles.slide} question={data.question} answers={data.data} />
            ))}
            <FitSchools  />
          </div>
        </form>
      </div>
      <button disabled={currentSlide === 0} className={styles.prevButton} onClick={prevSlide}>
        <Image width={60} height={60} src="/icons/arrow.svg" alt="previous slide" />
      </button>
      <button disabled={currentSlide === numSlides-1} className={styles.nextButton} onClick={nextSlide}>
        <Image width={60} height={60} src="/icons/arrow.svg" alt="next slide" />
      </button>
      {<Dots>
        {[... new Array(numSlides)].map((d, _i) =>
          <Dot onClick={
            () => setCurrentSlide(_i)
          } className={cs(styles.dot, _i === currentSlide ? "bg-cl-orange" : "bg-cl-white")} />
        )}
      </Dots>}
    </div>
  );
};

export default FormCarousel;

const Dots = styled.div`
  display: flex;
  gap:10px;
  justify-content: center;
  width: fit-content;
  grid-row: 2/3;
  position:absolute;
  justify-self:center;
  align-self:end;
  bottom:15px;
`;

const Dot = styled.button`
  border:none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;
