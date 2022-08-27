import React, { useState } from "react";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import CheckBoxQuestion from "../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../../common/components/Questions/MCQQuestion/MCQQuestion";
import RankingQuestion from "../../common/components/Questions/RankingQuestion/RankingQuestion";
import TextInputQuestion from "../../common/components/Questions/TextInputQuestion/TextInputQuestion";

import {
  updateAccountAction,
  updateTagsAndCheckInsAction,
  updateQuestionResponsesAction,
} from "../../utils/redux/actionFunctions";
import { store } from "../../utils/redux/store";
import styles from "./check-in-page.module.scss";
import { callPutQuestionResponses } from "src/utils/apiCalls";
import classNames from "classnames";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CompositeQuestion from "src/common/components/Questions/CompositeQuestion/CompositeQuestion";

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
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserResponses, setNewUserResponses] = useState(userResponses);
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

  const submitForm = async (e: { preventDefault: () => void }) => {
    //REMOVE CHECK IN FROM LIST AND UPLOAD DATA
    let checkInList = [];
    let queriedList = new String(router.query.checkIn.slice());
    //THESE WORK
    while (queriedList.indexOf(",") !== -1) {
      checkInList.push(queriedList.substring(0, queriedList.indexOf(",")));
      queriedList = queriedList.substring(queriedList.indexOf(",") + 1);
    }
    checkInList.push(queriedList);
    checkInList.splice(0, 1);
    userTags.length === 0
      ? (userTags = newTags)
      : (userTags = userTags.concat(newTags));
    let newGrade = newUserResponses.find(
      ({ questionId }) => questionId === "61de0b617c405886579656ec"
    )?.response;
    await Promise.all([
      fetch(`/api/update-user`, {
        method: "POST",
        body: JSON.stringify({
          userInfo: {
            checkIns: checkInList,
            tags: userTags,
            grade: newGrade
              ? parseInt(
                  newGrade.includes("9")
                    ? "9"
                    : newGrade.substring(0, newGrade.indexOf("t"))
                )
              : grade,
          },
          userId: session.data.user.uid,
        }),
      }),
      callPutQuestionResponses(newUserResponses),
    ]).then((values) => {
      store.dispatch(
        updateAccountAction({
          ...store.getState().accountInfo,
          grade: newGrade
            ? parseInt(
                newGrade.includes("9")
                  ? "9"
                  : newGrade.substring(0, newGrade.indexOf("t"))
              )
            : grade,
          _id: undefined,
        })
      );
      store.dispatch(updateTagsAndCheckInsAction(userTags, checkInList));
      store.dispatch(updateQuestionResponsesAction(newUserResponses));
    });
    router.push({ pathname: "/chatbot" });
  };
  const filterDuplicates = (toFilter: any[]) => {
    return toFilter.filter((element, index, self) => {
      let indexOfDuplicate = self.findIndex((value) => value === element);
      return indexOfDuplicate === -1 || index === indexOfDuplicate;
    });
  };
  const checkInPages = checkInData.chunks.map(({ questions }) => {
    return (
      <div>
        {questions.map((question) => {
          const updateFunc = (value, newQTags, oldTags) => {
            newUserResponses.find(
              (questionResponse) =>
                questionResponse.questionId === question?._id.toString()
            )
              ? (newUserResponses[
                  newUserResponses.findIndex(
                    (questionResponse) =>
                      questionResponse.questionId === question?._id.toString()
                  )
                ]["response"] = value)
              : newUserResponses.push({
                  questionId: question?._id.toString(),
                  response: value,
                });
            if (newQTags) {
              setNewTags(filterDuplicates(newTags.concat(newQTags)));
            }
          };
          //console.log(question);
          if (question?.type === "TextInput") {
            return (
              <TextInputQuestion
                key={question?._id.toString()}
                question={question}
                userAnswer={""}
                onChange={updateFunc}
              />
            );
          }
          if (question?.type === "Ranking") {
            return (
              <RankingQuestion
                question={question}
                key={question?._id.toString()}
                userAnswers={[]}
                onChange={updateFunc}
                tags={userTags}
              />
            );
          }
          if (question?.type === "MCQ") {
            return (
              <MCQQuestion
                question={question}
                key={question?._id.toString()}
                userAnswer={""}
                onChange={updateFunc}
                tags={userTags}
              />
            );
          }
          if (question?.type === "CheckBox") {
            return (
              <CheckBoxQuestion
                key={question?._id.toString()}
                question={question}
                userAnswers={[]}
                onChange={updateFunc}
                tags={userTags}
              />
            );
          }
          if (question?.type === "CompositeQuestion") {
            return (
              <CompositeQuestion
                responses={[]}
                onChange={(value, index, questionId) => {
                  let currRes = newUserResponses.find(
                    (questionResponse) =>
                      questionResponse.questionId === question?._id.toString()
                  );
                  if (currRes) {
                    newUserResponses[
                      newUserResponses.findIndex(
                        (questionResponse) =>
                          questionResponse.questionId === question?._id.toString()
                      )
                    ]["response"][index] = value;
                  } else {
                    let newResArr = [];
                    newResArr[index] = value;
                    newUserResponses.push({
                      questionId: question?._id.toString(),
                      response: newResArr,
                    });
                  }
                }}
                title={question.question}
                questions={question.data}
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
  });
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
      {page > 0 && (
        <button
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
          }}
          className="position-fixed center-child top-0 left-0 mt-5 pt-5 ms-5"
          onClick={goBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
          Back
        </button>
      )}
      <div
        style={{ width: size.width < 800 ? "100%" : "60%" }}
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
          width: size.width < 800 ? "80%" : "50%",
          borderTop: "1px solid #C1C0CE",
        }}
      >
        <div className="px-0">
          <button type="button" className="btn cl-btn-clear">
            Skip
          </button>
        </div>
        <div className="px-0">
          {page < checkInPages.length - 1 && (
            <button
              type="button"
              className="btn cl-btn-blue"
              onClick={goForward}
            >
              Next
            </button>
          )}
          {page === checkInPages.length - 1 && (
            <button
              type="button"
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
  userTags: state.accountInfo.tags,
  grade: state.accountInfo.grade,
  userResponses: state.questionResponses,
}))(CheckIn);