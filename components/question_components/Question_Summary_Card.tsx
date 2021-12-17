import React, { useEffect, useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import MCQQuestion from "./mcq_question";
import CheckBoxQuestion from "./checkbox_question";
import TextInputQuestion from "./textinput_question";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface QuestionSummaryCardProps {
  question: Question;
  userAnswer: any;
}

export default function QuestionSummaryCard({
  question,
  userAnswer,
}: QuestionSummaryCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);

  const getQuestionType = (): JSX.Element => {
    if (question.type === "TextInput") {
      return <TextInputQuestion question={question} userAnswer={userAnswer} />;
    }
    if (question.type === "MCQ") {
      return (
        <MCQQuestion
          question={question}
          userAnswer={userAnswer}
          onChange={undefined}
        />
      );
    }
    if (question.type === "CheckBox") {
      return (
        <CheckBoxQuestion
          question={question}
          userAnswers={userAnswer}
          onChange={() => {}}
        />
      );
    }
    return (
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
          <div className="w-75">{userAnswer}</div>
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
      <span className="ps-4 pb-4">{userAnswer}</span>
      <Modal
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
      </Modal>
    </div>
  );
}
