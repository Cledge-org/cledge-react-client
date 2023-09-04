import React, { useEffect } from "react";
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion/MultipleChoiceQuestion";
import styles from "./FormCarousel.module.scss";
import cs from "classnames";
import styled from "styled-components";
import Image from "next/image";
import Splash from "./components/Splash/Splash";
import Results from "./components/Results/Results";
import getQuestionMappings, { MappedValues, UnMappedValues } from '../../../../ClientSideFunctions/getQuestionMappings';
import CheckinQuestions from '../../content/CheckinQuestions';

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
  const initialFormData: UnMappedValues = {};
  questionData.map((data) => (
    initialFormData[data._id] = data.data[0].tag
  ));
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [formData, setFormData] = React.useState<UnMappedValues>(initialFormData);
  const numSlides = questionData.length + 2;
  const addSlide = () => setCurrentSlide(currentSlide + 1);
  const subtractSlide = () => setCurrentSlide(currentSlide - 1);
  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentSlide === numSlides) return;
    addSlide();
  }
  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentSlide === -1) return;
    subtractSlide();
  }
  const handleSubmit = async () => {
    let preferences = addPreferenceLevel(getQuestionMappings(formData, CheckinQuestions));
    const requestBody = {
      preferences: preferences,
      ECTier: 0,
      courseworkTier: 0,
      GPATier: 0,
      studFirstGen: 0,
      studSATScore: 0,
      studACTScore: 0,
      studentType: 0
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/metrics/get-college-fit-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return data;
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const collegeResults = await fetchData();
    console.log(collegeResults);

  };

  const handleFormData = (data: UnMappedValues) => {
    const questionId = Object.keys(data)[0];
    setFormData(p => ({ ...p, [questionId]: data[questionId] }));
    if (currentSlide === numSlides - 2) {
      handleSubmit().then().catch(err => console.log('There was an error', err));
    }
    addSlide();
  }

  function addPreferenceLevel(results: MappedValues) {
    const newResults: MappedValues = {};
    for (const [key, value] of Object.entries(results)) {
      newResults[key] = {
        ...value,
        preferenceLevel: 1,
      };
    }
    return newResults;
  }

  const handleSignUp = () => {
    return;
  }


  return (
    <div className={cs(styles.carouselContainer)}>
      <div className={cs(styles.carousel)}>
        <form onSubmit={currentSlide === numSlides - 1 ? handleSignUp : (e) => e.preventDefault()}>
          <div className={styles.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <Splash classNames={styles.slide} buttonHandler={nextSlide} />
            {questionData.map((data) => (
              <MultipleChoiceQuestion key={data._id} classNames={styles.slide} _id={data._id} question={data.question} answers={data.data} handler={handleFormData} />
            ))}
            <Results classNames={styles.slide} />
          </div>
        </form>
      </div>
      <button disabled={currentSlide === 0 || currentSlide === numSlides - 1} className={styles.prevButton} onClick={prevSlide}>
        <Image width={60} height={60} src="/icons/arrow.svg" alt="previous slide" />
      </button>
      <button disabled={currentSlide === numSlides - 1} className={styles.nextButton} onClick={nextSlide}>
        <Image width={60} height={60} src="/icons/arrow.svg" alt="next slide" />
      </button>
      {<Dots>
        {[... new Array(numSlides)].map((d, _i) =>
          <Dot
            key={_i}
            onClick={
              () => (currentSlide !== numSlides - 1 && setCurrentSlide(_i))
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
