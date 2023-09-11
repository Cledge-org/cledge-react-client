import React, { useEffect } from "react";
import MultipleChoiceQuestion from "./components/MultipleChoiceQuestion/MultipleChoiceQuestionMobile";
import styles from "./FormCarouselMobile.module.scss";
import cs from "classnames";
import styled from "styled-components";
import Image from "next/image";
import Splash from "./components/Splash/SplashMobile";
import Results from "./components/Results/ResultsMobile";
import getQuestionMappings, { MappedValues, UnMappedValues } from '../../../../ClientSideFunctions/getQuestionMappings';
import CheckinQuestions from '../../content/CheckinQuestions';
import { useRouter } from "next/router";

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
  collegeData: string[][];
}

const FormCarousel = ({ questionData,collegeData }: Props) => {
  const initialFormData: UnMappedValues = {};
  questionData.map((data) => (
    initialFormData[data._id] = data.data[0].tag
  ));
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [formData, setFormData] = React.useState<UnMappedValues>(initialFormData);
  const router = useRouter();
  const numSlides = questionData.length + 2;
  const addSlide = () => setCurrentSlide(currentSlide + 1);
  const subtractSlide = () => setCurrentSlide(currentSlide - 1);
  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentSlide === numSlides) return;
    if (currentSlide === numSlides - 2) {
      // handleSubmit().then().catch(err => console.log('There was an error', err));
    }
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
          body: JSON.stringify(
            {
            preferences: requestBody.preferences,
            ECTier: requestBody.ECTier,
            courseworkTier: requestBody.courseworkTier,
            GPATier: requestBody.GPATier,
            studFirstGen: requestBody.studFirstGen,
            studSATScore: requestBody.studSATScore,
            studACTScore: requestBody.studACTScore,
            studentType: requestBody.studentType
            }
          )
        });
        
          const data = await response.json();
          return data;
        
        
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

  };

  const handleFormData = (data: UnMappedValues) => {
    const questionId = Object.keys(data)[0];
    setFormData(p => ({ ...p, [questionId]: data[questionId] }));
    if (currentSlide === numSlides - 2) {
      // handleSubmit().then().catch(err => console.log('There was an error', err));
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

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: "/auth/signup" });
  }

  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  
  shuffleArray(collegeData);
  const selectedSchools = collegeData.slice(0, 2);

  return (
    <div className={cs(styles.carouselContainer)}>
      <div className={cs(styles.carousel)}>
        <form onSubmit={(e) => (currentSlide === numSlides - 1 ? handleSignUp(e) : e.preventDefault())}>
          <div className={styles.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            <Splash classNames={styles.slide} buttonHandler={nextSlide} />
            {questionData.map((data) => (
              <MultipleChoiceQuestion key={data._id} classNames={styles.slide} _id={data._id} question={data.question} answers={data.data} handler={handleFormData} />
            ))}
            <Results schools={selectedSchools} classNames={styles.slide} />
          </div>
        </form>
      </div>
      <Dots>         
      <button disabled={currentSlide === 0 || currentSlide === numSlides - 1} className={styles.prevButton} onClick={prevSlide}>
        <Image width={100} height={100} src="/icons/arrow.svg" alt="previous slide" />
      </button>
      
        {[... new Array(numSlides)].map((d, _i) =>
          <Dot
            key={_i}
            onClick={
              () => (currentSlide !== numSlides - 1 && setCurrentSlide(_i))
            } className={cs(styles.dot, _i === currentSlide ? "bg-cl-orange" : "bg-cl-white")} />
        )}
        <button disabled={currentSlide === numSlides - 1} className={styles.nextButton} onClick={nextSlide}>
        <Image width={100} height={100} src="/icons/arrow.svg" alt="next slide" />
      </button>
      </Dots>
      
    </div>
  );
};

export default FormCarousel;

const Dots = styled.div`
  display: flex;
  gap:10px;
  justify-content: center;
  align-items:center;
  width: fit-content;
  grid-area: 2/1;
  justify-self: center;
`;

const Dot = styled.button`
  border:none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;
