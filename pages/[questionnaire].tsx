import React, { useState } from "react";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import ECTextInputQuestion from "../components/question_components/ec_textinput_question";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import MCQQuestion from "../components/question_components/mcq_question";
import Slider from "../components/question_components/slider";
import CheckBoxQuestion from "../components/question_components/checkbox_question";
import QuestionECSubpage from "./questionPages/question_ec_subpage";
import ECQuestionSummaryCard from "../components/question_components/ec_question_summary_card";
import { Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ECEditor from "../components/question_components/EC_editor";
import { NextApplicationPage } from "./_app";
import { GetServerSidePropsContext } from "next";
import YesNoQuestion from "../components/question_components/yes-no-question";
import TextInputQuestion from "../components/question_components/textinput_question";
import { useRouter } from "next/router";
import { ORIGIN_URL } from "../config";
import AuthFunctions from "./api/auth/firebase-auth";
import { useSession } from "next-auth/react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    let firstQuestionnaire = ctx.query.questionnaire.indexOf(",");
    let userResponses = await (
      await fetch(`${ORIGIN_URL}/api/get-question-responses`, {
        method: "POST",
        body: JSON.stringify({
          //THIS WORKS
          userId: AuthFunctions.userId,
        }),
      })
    ).json();
    let questionnaire = await (
      await fetch(`${ORIGIN_URL}/api/get-question-list`, {
        method: "POST",
        body: JSON.stringify({
          //THIS WORKS
          listName: ctx.query.questionnaire.substring(
            0,
            firstQuestionnaire === -1
              ? ctx.query.questionnaire.length
              : firstQuestionnaire
          ) as string,
        }),
      })
    ).json();
    //console.error(questionnaireChunks);
    let questionnaireData = questionnaire.chunks[0].questions;
    for (let i = 1; i < questionnaire.chunks.length; i++) {
      questionnaireData = questionnaireData.concat(
        questionnaire.chunks[i].questions
      );
    }
    return {
      props: {
        questionnaireData,
        userResponses,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Questionnaire: NextApplicationPage<{
  questionnaireData: Question[];
  userResponses: UserResponse[];
}> = ({ questionnaireData, userResponses }) => {
  const [isShowingContinue, setIsShowingContinue] = useState(true);
  const [isShowingStart, setIsShowingStart] = useState(false);
  const [progress, changeProgress] = useState(0);
  const [page, changePage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserResponses, setNewUserResponses] = useState(userResponses);
  const hiddenFileInput = React.useRef(null);

  const transcriptUpload = () => {
    hiddenFileInput.current.click();
  };
  const session = useSession();
  const router = useRouter();

  const goBack = (e) => {
    e.preventDefault();
    changeProgress(progress - 100 / (questionnaireData.length - 1));
    if (page > 0) changePage(page - 1);
  };

  const goForward = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    changeProgress(progress + 100 / (questionnaireData.length - 1));
    if (page < questionnaireData.length - 1) changePage(page + 1);
  };

  const submitForm = async (e: { preventDefault: () => void }) => {
    //REMOVE CHECK IN FROM LIST AND UPLOAD DATA
    let checkInList = [];
    let queriedList = router.query.questionnaire.slice();
    //THESE WORK
    while (queriedList.indexOf(",") !== -1) {
      checkInList.push(queriedList.substring(0, queriedList.indexOf(",")));
      queriedList = queriedList.substring(queriedList.indexOf(",") + 1);
    }
    checkInList.push(queriedList);
    checkInList.splice(0, 1);
    console.log(AuthFunctions.userId);
    await Promise.all([
      fetch(`${ORIGIN_URL}/api/update-user`, {
        method: "POST",
        body: JSON.stringify({
          userId: AuthFunctions.userId,
          userInfo: { checkIns: checkInList },
        }),
      }),
      fetch(`${ORIGIN_URL}/api/put-question-responses`, {
        method: "POST",
        body: JSON.stringify({
          responses: newUserResponses,
          userId: AuthFunctions.userId,
        }),
      }),
    ]).then((values) => {
      values.forEach((value) => {
        console.log(value.status);
      });
    });
    router.push({ pathname: "/dashboard" });
  };

  const questionnairePages = questionnaireData.map((question) => {
    const updateFunc = (value) => {
      newUserResponses.find(
        (questionResponse) => questionResponse.questionId === question._id
      )
        ? (newUserResponses[
            newUserResponses.findIndex(
              (questionResponse) => questionResponse.questionId === question._id
            )
          ]["response"] = value)
        : newUserResponses.push({
            questionId: question._id,
            response: value,
          });
    };
    if (question.type === "TextInput") {
      return (
        <TextInputQuestion
          question={question}
          userAnswer={""}
          onChange={updateFunc}
        />
      );
    }
    if (question.type === "MCQ") {
      return (
        <MCQQuestion
          question={question}
          userAnswer={""}
          onChange={updateFunc}
        />
      );
    }
    if (question.type === "CheckBox") {
      return (
        <CheckBoxQuestion
          question={question}
          userAnswers={[]}
          onChange={updateFunc}
        />
      );
    }
    if (question.type === "YesNo") {
      return (
        <YesNoQuestion
          question={question}
          userAnswer={undefined}
          onChange={updateFunc}
        />
      );
    }
    return (
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
          <div className="w-75">
            Uh Oh. It appears there was an error loading this question
          </div>
        </div>
      </div>
    );
  });
  if (isShowingContinue) {
    return (
      <div className="container-fluid d-flex flex-column bg-cl-blue justify-content-center align-items-center vh-100">
        <span style={{ color: "white", fontWeight: "bold", fontSize: "2em" }}>
          Welcome to Cledge!
        </span>
        <span style={{ color: "white", fontSize: "1.8em" }}>
          Before we get started, tell us a little more about yourself
        </span>
        <button
          onClick={() => {
            setIsShowingContinue(false);
            setIsShowingStart(true);
          }}
          className="btn btn-light mt-3 cl-blue"
        >
          Click here to continue
        </button>
      </div>
    );
  }
  if (isShowingStart) {
    return (
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          style={{ width: "60%" }}
          className="vh-50 d-flex flex-row justify-content-between align-items-center"
        >
          <div
            className="cl-dark-text d-flex flex-column"
            style={{ fontSize: "1em", width: "40%" }}
          >
            <span className="fw-bold mb-3" style={{ fontSize: "2.4em" }}>
              Start the questionnaire
            </span>
            Help us help you better! <br />
            Tell us about yourself and we'll show you content and suggestions
            that relevant to you
            <br />
            <br />
            Be sure to answer carefully and accurately. You can always access
            this questionnaire again through the home page to make changes.
            <button
              className="btn cl-btn-blue mt-3"
              style={{ fontSize: "1.1em", width: "30%" }}
              onClick={() => {
                setIsShowingStart(false);
              }}
            >
              Start
            </button>
          </div>
          <img
            style={{ width: "60%" }}
            src="images/questionLandingGraphic.png"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="questionnaire-container container-fluid d-flex flex-column overflow-auto">
      <div className="row col-md-5 d-md-flex mx-auto mt-5 pt-5 flex-column justify-content-center text-center questionnaire-question">
        {questionnairePages[page]}
      </div>
      <div
        className="auth-bottom-nav align-self-center"
        style={{ position: "fixed", bottom: "16vh", width: "30%" }}
      >
        <div className="px-0">
          {page > 0 && (
            <button type="button" className="btn cl-btn-gray" onClick={goBack}>
              Back
            </button>
          )}
        </div>

        <div className="px-0">
          {page < questionnairePages.length - 1 && (
            <button
              type="button"
              className="btn cl-btn-blue"
              onClick={goForward}
            >
              Next
            </button>
          )}
          {page === questionnairePages.length - 1 && (
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
      <div
        className="align-self-center"
        style={{ position: "fixed", bottom: "10vh", width: "80%" }}
      >
        <ProgressBar now={progress} />
      </div>
    </div>
  );
};
Questionnaire.requireAuth = true;
export default Questionnaire;
