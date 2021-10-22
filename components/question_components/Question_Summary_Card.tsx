import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import MCQQuestion from "./mcq_question";
import CheckBoxQuestion from "./checkbox_question";
import TextInputQuestion from "./textinput_question";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface QuestionSummaryCardProps {
  question: Question;
  userAnswer: string;
}

export default function QuestionSummaryCard({
  question,
  userAnswer,
}: QuestionSummaryCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3">
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        {question.question}
        <button className="icon-btn center-child">
          <div
            onClick={() => {
              setDisplayingQuestion(true);
            }}
            style={{ width: "40%" }}
          >
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
        <TextInputQuestion />
      </Modal>
    </div>
  );
}
