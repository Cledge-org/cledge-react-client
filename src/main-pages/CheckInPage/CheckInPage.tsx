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
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import DoubleDropdownQuestion from "src/common/components/Questions/DoubleDropdownQuestion/DoubleDropdownQuestion";
import DropdownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";

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
  const [newUserResponses, setNewUserResponses] = useState(userResponses);
  const hiddenFileInput = React.useRef(null);
  const size = useWindowSize();
  const transcriptUpload = () => {
    hiddenFileInput.current.click();
  };
  const session = useSession();
  const router = useRouter();

  console.log(checkInData);

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
    const newGrade = newUserResponses.find(
      ({ questionId }) => questionId === "61c6b6f2d3054b6dd0f1fc64"
    )?.response;
    const newAddress = newUserResponses.find(
      ({ questionId }) => questionId === "631fc0482734f1eb370771cc"
    )?.response;
    const newName = newUserResponses.find(
      ({ questionId }) => questionId === "6319632cd1e56282060ad38a"
    )?.response;
    await Promise.all([
      fetch(`/api/user/update-user`, {
        method: "POST",
        body: JSON.stringify({
          userInfo: {
            checkIns: checkInList,
            tags: userTags,
            address: newAddress.reduce(
              (prev, curr) =>
                prev
                  ? prev +
                    ", " +
                    (curr instanceof Array
                      ? curr.reduce(
                          (prev, curr) => (prev ? prev + ", " + curr : curr),
                          ""
                        )
                      : curr)
                  : curr,
              ""
            ),
            name: newName.reduce(
              (prev, curr) => (prev ? prev + " " + curr : curr),
              ""
            ),
            grade: newGrade,
          },
          userId: session.data.user.uid,
        }),
      }),
      callPutQuestionResponses(newUserResponses),
    ]).then((values) => {
      store.dispatch(
        updateAccountAction({
          ...store.getState().accountInfo,
          address: newAddress.reduce(
            (prev, curr) =>
              prev
                ? prev +
                  ", " +
                  (curr instanceof Array
                    ? curr.reduce(
                        (prev, curr) => (prev ? prev + ", " + curr : curr),
                        ""
                      )
                    : curr)
                : curr,
            ""
          ),
          name: newName.reduce(
            (prev, curr) => (prev ? prev + " " + curr : curr),
            ""
          ),
          grade: newGrade,
          _id: undefined,
        })
      );
      store.dispatch(updateTagsAndCheckInsAction(userTags, checkInList));
      store.dispatch(updateQuestionResponsesAction(newUserResponses));
    });
    router.push({ pathname: "/application-profile" });
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
                currQuestionResponse
                  ? (newUserResponses[currQuestionResponseIndex]["response"] =
                      value)
                  : newUserResponses.push({
                      questionId: question?._id.toString(),
                      response: value,
                    });
                if (newQTags) {
                  setNewTags(filterDuplicates(newTags.concat(newQTags)));
                }
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
              if (question?.type === "Ranking") {
                return (
                  <RankingQuestion
                    question={question}
                    key={question?._id.toString()}
                    userAnswers={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
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
              if (question?.type === "CheckBox") {
                return (
                  <CheckBoxQuestion
                    key={question?._id.toString()}
                    question={question}
                    isCentered
                    userAnswers={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    onChange={updateFunc}
                    tags={userTags}
                  />
                );
              }
              if (question?.type === "CompositeQuestion") {
                return (
                  <CompositeQuestion
                    question={question}
                    responses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    onChange={(value, index, questionId) => {
                      let currRes = newUserResponses.find(
                        (questionResponse) =>
                          questionResponse.questionId ===
                          question?._id.toString()
                      );
                      if (currRes) {
                        newUserResponses[
                          newUserResponses.findIndex(
                            (questionResponse) =>
                              questionResponse.questionId ===
                              question?._id.toString()
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
              if (question?.type === "DoubleTextInputQuestion") {
                return (
                  <DoubleTextInputQuestion
                    userResponses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    question={question}
                    onChange={(value) => {
                      updateFunc(value);
                    }}
                  />
                );
              }
              if (question?.type === "DoubleTextInputQuestion") {
                return (
                  <DoubleDropdownQuestion
                    userResponses={
                      newUserResponses[currQuestionResponseIndex]?.response ||
                      []
                    }
                    question={question}
                    onChange={(value) => {
                      updateFunc(value);
                    }}
                  />
                );
              }
              if (question?.type === "ECDropDown") {
                return (
                  <DropdownQuestion
                    isConcatenable={question.isConcatenable}
                    valuesList={question.data}
                    onChange={(value) => {
                      updateFunc(value)
                    }}
                    key={question._id.toString()}
                    questionTitle={question.question}
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
  userTags: state.accountInfo.tags,
  grade: state.accountInfo.grade,
  userResponses: state.questionResponses,
}))(CheckIn);
