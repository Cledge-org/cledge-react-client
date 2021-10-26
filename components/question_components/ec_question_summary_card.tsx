import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import MCQQuestion from "./mcq_question";
import CheckBoxQuestion from "./checkbox_question";
import TextInputQuestion from "./textinput_question";

interface ECQuestionSummaryCardProps {
  response: UserResponse[];
  chunkQuestions: Question[];
  onClick: Function;
}

export default function ECQuestionSummaryCard({
  response,
  chunkQuestions,
  onClick,
}: ECQuestionSummaryCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  const titleQuestion = response.find(
    ({ questionId }) =>
      questionId ===
      chunkQuestions.find(({ question }) => question === "Title").id
  );
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3">
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        {titleQuestion !== undefined
          ? titleQuestion.response
          : "No Title Given"}
        <button onClick={() => onClick()} className="icon-btn center-child">
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
      <div className="w-100 d-flex align-items-center justify-content-center ecsummary-info-container">
        {chunkQuestions.map(({ question, type, id }) =>
          question !== "Title" ? (
            <div className="ecsummary-info-section">
              <div className="name">{question.toLocaleUpperCase()}</div>
              <div className="value">
                {response.find(({ questionId }) => id === questionId) !==
                undefined
                  ? response.find(({ questionId }) => id === questionId)
                      .response
                  : "Not Answered"}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
