import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import MCQQuestion from "./mcq_question";
import CheckBoxQuestion from "./checkbox_question";
import TextInputQuestion from "./textinput_question";
import { ORIGIN_URL } from "../../config";
import AuthFunctions from "../../pages/api/auth/firebase-auth";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface QuestionSummaryCardProps {
  question: Question;
  userAnswers: UserResponse[];
}

export default function QuestionSummaryCard({
  question,
  userAnswers,
}: QuestionSummaryCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  const [userAnswer, setUserAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<UserResponse>>
  ] = useState(
    userAnswers.find((response) => {
      return response.questionId === question._id;
    })
      ? userAnswers.find((response) => {
          return response.questionId === question._id;
        })
      : { questionId: question._id, response: null }
  );
  const getQuestionType = (): JSX.Element => {
    if (question.type === "TextInput") {
      return (
        <TextInputQuestion
          question={question}
          userAnswer={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (question.type === "MCQ") {
      return (
        <MCQQuestion
          question={question}
          userAnswer={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (question.type === "CheckBox") {
      return (
        <CheckBoxQuestion
          question={question}
          userAnswers={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    return (
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
          <div className="w-75">{userAnswer.response ?? "No answer"}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3">
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        {question.question}
        <button
          onClick={() => {
            setDisplayingQuestion(true);
          }}
          className="icon-btn center-child"
        >
          <div style={{ width: "40%" }}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        </button>
      </div>
      <span className="ps-4 pb-4">{userAnswer.response ?? "No answer"}</span>
      <Modal
        ariaHideApp={false}
        style={{
          content: {
            top: "30%",
            left: "35%",
            width: "30%",
            height: "fit-content",
            borderRadius: "20px",
            borderColor: "white",
          },
        }}
        onRequestClose={() => {
          setDisplayingQuestion(false);
        }}
        isOpen={displayingQuestion}
      >
        {getQuestionType()}
        <div className="center-child w-100">
          <button
            onClick={async () => {
              let newUserResponses = userAnswers;
              let indexOfResponse = newUserResponses.findIndex(
                ({ questionId }) => {
                  questionId === userAnswer.questionId;
                }
              );
              if (indexOfResponse !== -1) {
                newUserResponses[indexOfResponse] = userAnswer;
              } else {
                newUserResponses.push(userAnswer);
              }
              fetch(`${ORIGIN_URL}/api/put-question-responses`, {
                method: "POST",
                body: JSON.stringify({
                  responses: newUserResponses,
                  userId: (
                    await (await fetch(`${ORIGIN_URL}/api/get-uid`)).json()
                  ).uid,
                }),
              }).then((res) => {
                console.log(res.status);
                setDisplayingQuestion(false);
              });
            }}
            className="general-submit-btn mt-2"
          >
            SUBMIT
          </button>
        </div>
      </Modal>
    </div>
  );
}
