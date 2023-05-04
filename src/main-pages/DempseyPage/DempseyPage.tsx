import React, { useMemo, useState } from "react";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import CheckBoxQuestion from "../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../../common/components/Questions/MCQQuestion/MCQQuestion";
import RankingQuestion from "../../common/components/Questions/RankingQuestion/RankingQuestion";
import TextInputQuestion from "../../common/components/Questions/TextInputQuestion/TextInputQuestion";
import getCollegeFitList from "src/pages/api/metrics/get-college-fit-list";

import {
  updateAccountAction,
  updateTagsAndCheckInsAction,
  updateQuestionResponsesAction,
  initialStateAction,
} from "../../utils/redux/actionFunctions";
import { store } from "../../utils/redux/store";
import styles from "./check-in-page.module.scss";
import { callPutQuestionResponses } from "src/utils/apiCalls";
import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CompositeQuestion from "src/common/components/Questions/CompositeQuestion/CompositeQuestion";
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import DoubleDropdownQuestion from "src/common/components/Questions/DoubleDropdownQuestion/DoubleDropdownQuestion";

const CheckIn: NextApplicationPage<{
  checkInData: QuestionList;
  userResponses: UserResponse[];
  userTags: string[];
  grade: number;
}> = ({ checkInData, userResponses, userTags, grade }) => {
  const [isShowingStart, setIsShowingStart] = useState(true);
  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);
  const [newTags, setNewTags] = useState([]);
  const [newUserResponses, setNewUserResponses] = useState([]);
  const hiddenFileInput = React.useRef(null);
  const size = useWindowSize();
  const transcriptUpload = () => {
    hiddenFileInput.current.click();
  };
  const session = useSession();
  const router = useRouter();

  const goBack = (e) => {
    e.preventDefault();
    changeProgress(progress - 100 / (checkInData.chunks.length - 1));
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    changeProgress(progress + 100 / (checkInData.chunks.length - 1));
    if (page < checkInData.chunks.length - 1) changePage(page + 1);
  };

  const canGoForward = useMemo(() => {
    for (let i = 0; i < checkInData.chunks[page].questions.length; i++) {
      if (
        checkInData.chunks[page].questions[i].isRequired &&
        !newUserResponses.find(
          ({ questionId }) =>
            questionId === checkInData.chunks[page].questions[i]._id.toString()
        )?.response
      ) {
        return false;
      }
    }
    return true;
  }, [checkInData, page, newUserResponses]);

  const submitForm = async (e: { preventDefault: () => void }) => {

    let res = newUserResponses;

    let schoolSizeLow = null;
    let schoolSizeHigh = null;
    let costOfAttendanceLow = null;
    let costOfAttendanceHigh = null;
    let privatePublic = null;
    let locale = null;
    let state = null;
    let classSize = null;
    let finNeedLow = null;
    let finNeedHigh = null;
    let finMeritLow = null;
    let finMeritHigh = null;

    for (let i = 0; i < res.length; i++) {
      if (res[i].questionId == "schoolSize") {
        if (res[i].tag == "a") {
          schoolSizeLow = 0;
          schoolSizeHigh = 5000;
        } else if (res[i].tag == "b") {
          schoolSizeLow = 5000;
          schoolSizeHigh = 15000;
        } else if (res[i].tag == "c") {
          schoolSizeLow = 15000;
          schoolSizeHigh = null;
        }
      }

      if (res[i].questionId == "costOfAttendance") {
        if (res[i].tag == "a") {
          costOfAttendanceLow = 0;
          costOfAttendanceHigh = 30000;
        } else if (res[i].tag == "b") {
          costOfAttendanceLow = 30000;
          costOfAttendanceHigh = 50000;
        } else if (res[i].tag == "c") {
          costOfAttendanceLow = 70000;
          costOfAttendanceHigh = null;
        }
      }

      if (res[i].questionId == "schoolPreference") {
        if (res[i].tag == "a") {
          privatePublic = 1;
        } else if (res[i].tag == "b") {
          privatePublic = 2;
        }
      }

      if (res[i].questionId == "localePreference") {
        if (res[i].tag == "a") {
          locale = 1;
        } else if (res[i].tag == "b") {
          locale = 2;
        } else if (res[i].tag == "c") {
          locale = 3;
        }
      }

      if (res[i].questionId == "finAidNeed") {
        if (res[i].tag == "a") {
          finNeedLow = 0;
          finNeedHigh = 30000;
        } else if (res[i].tag == "b") {
          finNeedLow = 30000;
          finNeedHigh = 60000;
        } else if (res[i].tag == "c") {
          finNeedLow = 60000;
          finNeedHigh = null;
        }
      }

      if (res[i].questionId == "finAidMerit") {
        if (res[i].tag == "a") {
          finMeritLow = 0;
          finMeritHigh = 10000;
        } else if (res[i].tag == "b") {
          finMeritLow = 10000;
          finMeritHigh = 20000;
        } else if (res[i].tag == "c") {
          finMeritLow = 20000;
          finMeritHigh = null;
        }
      }

      if (res[i].questionId == "statePreference") {
        if (res[i].tag == "a") {
          state = res[4].response;
        } else if (res[i].tag == "b") {
          state = null;
        }
      }
    }

    const requestFormat = {
      preferences: {
        schoolSize: {
          low_val: schoolSizeLow,
          high_val: schoolSizeHigh,
          preferenceLevel: 0
        },
        costOfAttendance: {
          low_val: costOfAttendanceLow,
          high_val: costOfAttendanceHigh,
          preferenceLevel: 0
        },
        schoolPreference: {
          low_val: privatePublic,
          high_val: privatePublic,
          preferenceLevel: 0
        },
        localePreference: {
          low_val: locale,
          high_val: locale,
          preferenceLevel: 0
        },
        statePreference: {
          low_val: state,
          high_val: state,
          preferenceLevel: 0
        },
        classSize: {
          low_val: classSize,
          high_val: classSize,
          preferenceLevel: 0,
        },
        finAidNeed: {
          low_val: finNeedLow,
          high_val: finNeedHigh,
          preferenceLevel: 0,
        },
        finAidMerit: {
          low_val: finMeritLow,
          high_val: finMeritHigh,
          preferenceLevel: 0,
        }
      },
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
          body: JSON.stringify({
            preferences: requestFormat.preferences,
            ECTier: requestFormat.ECTier,
            courseworkTier: requestFormat.courseworkTier,
            GPATier: requestFormat.GPATier,
            studFirstGen: requestFormat.studFirstGen,
            studSATScore: requestFormat.studSATScore,
            studACTScore: requestFormat.studACTScore,
            studentType: requestFormat.studentType
          })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Do something with the data
          return data;
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    
    console.log(JSON.stringify(requestFormat));
    const result = await fetchData(); // Store the result in a variable
    console.log(result); // Do something with the result    

    await store.dispatch(
      initialStateAction({
        collegeListData: result,
      })
    );

    //const result = await callGetCollegeListDempsey(requestFormat.preferences, requestFormat.ECTier, requestFormat.courseworkTier, requestFormat.GPATier, requestFormat.studFirstGen, requestFormat.studSATScore, requestFormat.studACTScore, requestFormat.studentType); // Store the result in a variable
  };
  const filterDuplicates = (toFilter: any[]) => {
    return toFilter.filter((element, index, self) => {
      let indexOfDuplicate = self.findIndex((value) => value === element);
      return indexOfDuplicate === -1 || index === indexOfDuplicate;
    });
  };
  const checkInPages = useMemo(
    () =>
      checkInData.chunks.map(({ questions }) => {
        return (
          <div>
            <div className="cl-blue fw-bold" style={{ fontSize: "18px" }}>
              Questions with * are required
            </div>
            {questions.map((question) => {
              const currQuestionResponse = newUserResponses.find(
                (questionResponse) =>
                  questionResponse.questionId === question?._id.toString()
              );
              const currQuestionResponseIndex = newUserResponses.findIndex(
                (questionResponse) =>
                  questionResponse.questionId === question?._id.toString()
              );
              const updateFunc = (
                value: any,
                newQTags = undefined,
                oldTags = undefined
              ) => {
                let realTag;
                if (newQTags) {
                  realTag = newQTags[0];
                }
                currQuestionResponse
                  ? (newUserResponses[currQuestionResponseIndex]["response"] =
                      value)
                  : newUserResponses.push({
                      questionId: question?._id.toString(),
                      response: value,
                      tag: realTag,
                    });
                  // if (newQTags) {
                  //   setNewTags(newTags.concat(newQTags));
                  // }
                setNewUserResponses([...newUserResponses]);
              };
              if (question?.type === "TextInput") {
                return (
                  <TextInputQuestion
                    key={question?._id.toString()}
                    question={question}
                    userAnswer={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      ""
                    }
                    isCentered
                    onChange={updateFunc}
                  />
                );
              }
          
              if (question?.type === "MCQ") {
                return (
                  <MCQQuestion
                    question={question}
                    key={question?._id.toString()}
                    userAnswer={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      ""
                    }
                    isCentered
                    onChange={updateFunc}
                    tags={userTags}
                  />
                );
              }           
    
              return (
                <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
                  <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
                    {question?.question}
                  </span>
                  <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
                    <div className="w-75">
                      Uh Oh. It appears there was an error loading this question
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }),
    [newUserResponses, checkInData]
  );
  if (isShowingStart) {
    return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          style={{ width: size.width < 800 ? "80%" : "70%" }}
          className="vh-50 d-flex flex-row justify-content-between align-items-center flex-wrap"
        >
          <img
            style={{ width: size.width < 800 ? "100%" : "60%" }}
            src="../images/questionLandingGraphic.png"
          />
          <div
            className="cl-dark-text d-flex flex-column"
            style={{
              fontSize: "1em",
              width: size.width < 800 ? "100%" : "40%",
            }}
          >
            <span className="fw-bold mb-3" style={{ fontSize: "2.4em" }}>
              Receive personalized suggestions
            </span>
            This will only take 3 minutes. Tell us about yourself and we’ll
            provide you with personalized content and suggestions.
            <br />
            <br />
            Be sure to answer carefully and accurately. You can always access
            this questionnaire again to make changes.
            <button
              className="btn cl-btn-blue mt-3"
              style={{ fontSize: "1.1em", width: "50%" }}
              onClick={() => {
                setIsShowingStart(false);
              }}
            >
              Start the quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-100 d-flex flex-column">
      <div
        className="d-flex flex-row w-100 px-3 py-2 position-fixed"
        style={{
          borderBottom: "2px solid #E0DFE8",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <div
          className={`navbar-brand mx-4`}
          style={{ fontSize: "1.5em", fontWeight: 600 }}
        >
          <span className={`cl-blue`}>cledge.</span>
        </div>
        <div
          className="d-flex flex-row align-items-center justify-content-center"
          style={{ flex: 1 }}
        >
          {checkInData.chunks.map(({ name }, index) => (
            <div
              style={{ color: page === index ? "#506BED" : "#808099" }}
              className="d-flex flex-row align-items-center ms-3"
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "17.5px",
                  backgroundColor: page === index ? "#506BED" : "#808099",
                  color: "white",
                }}
                className="center-child me-3"
              >
                {index + 1}
              </div>
              <div>{name}</div>
              {!(index + 1 === checkInData.chunks.length) && (
                <div
                  className="ms-3"
                  style={{
                    backgroundColor: page === index ? "#506BED" : "#808099",
                    height: "1px",
                    width: "180px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
        }}
        className="align-self-center row col-md-5 d-md-flex mx-auto mt-5 pt-5 flex-column justify-content-center text-center checkIn-question"
      >
        {checkInPages[page]}
      </div>
      <div
        className={classNames(
          styles.authBottomNav,
          "align-self-center my-3 pt-4"
        )}
        style={{
          bottom: "16vh",
          width: size.width < 800 ? "100%" : size.width < 1400 ? "60%" : "40%",
          borderTop: "1px solid #C1C0CE",
        }}
      >
        <div className="px-0">
          <button
            type="button"
            disabled={page === 0}
            className="btn cl-btn-clear"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        <div className="px-0">
          {page < checkInPages.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={goForward}
            >
              Next
            </button>
          )}
          {page === checkInPages.length - 1 && (
            <button
              type="button"
              disabled={!canGoForward}
              className="btn cl-btn-blue"
              onClick={submitForm}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
CheckIn.requireAuth = true;
export default connect((state) => ({
  // userTags: state.accountInfo.tags,
  // grade: state.accountInfo.grade,
  // userResponses: state.questionResponses,
}))(CheckIn);