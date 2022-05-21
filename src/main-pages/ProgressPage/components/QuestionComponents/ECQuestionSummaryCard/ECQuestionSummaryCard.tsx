import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { UserResponse, Question } from "../../../../../@types/types";

Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";
import styles from "./ec-question-summary-card.module.scss";
import classNames from "classnames";
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
  console.log(response);
  const titleQuestion = response.find(
    ({ questionId }) =>
      questionId ===
      chunkQuestions.find(({ question }) => question === "Title")?._id
  );
  console.log(response);
  return (
    <div
      className={classNames(
        "w-100 d-flex flex-column justify-content-evenly",
        styles.qsummaryCardContainer,
        "mt-3"
      )}
    >
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        {titleQuestion ? titleQuestion.response : "No Title Given"}
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
<<<<<<< HEAD:src/main-pages/ProgressPage/components/QuestionComponents/ECQuestionSummaryCard/ECQuestionSummaryCard.tsx
      <div
        className={classNames(
          "w-100 d-flex flex-column align-items-center justify-content-center",
          styles.ecsummaryInfoContainer
        )}
      >
        {chunkQuestions.map(({ question, type, _id }) => {
=======
      <div className="w-100 d-flex flex-column align-items-center justify-content-center ecsummary-info-container">
        {chunkQuestions.map(({ question, type, _id, data }) => {
>>>>>>> master:components/question_components/ec_question_summary_card.tsx
          const questionFound = response.find(
            ({ questionId }) => _id === questionId
          );
          return question !== "Title" ? (
            <>
              <div className="ecsummary-info-section">
                <div className="name">{question.toLocaleUpperCase()}</div>
                <div className="value">
                  {questionFound !== undefined
                    ? type === "ListQuestion"
                      ? questionFound.response.numResponse
                      : questionFound.response instanceof Array
                      ? questionFound.response.reduce((prev, curr) => {
                          return prev === "" ? curr : prev + ", " + curr;
                        }, "")
                      : questionFound.response
                    : "Not Answered"}
                </div>
              </div>
              {type === "ListQuestion"
                ? questionFound.response.questionsResponses.map(
                    (questionResponse) => {
                      return data.map(({ question, _id }, index) => {
                        const subQuestionFound = questionResponse[_id];
                        return (
                          <div className="ecsummary-info-section">
                            <div className="name">
                              {question.toLocaleUpperCase() + ` ${index + 1}`}
                            </div>
                            <div className="value">
                              {subQuestionFound !== undefined
                                ? subQuestionFound instanceof Array
                                  ? subQuestionFound.reduce((prev, curr) => {
                                      return prev === ""
                                        ? curr
                                        : prev + ", " + curr;
                                    }, "")
                                  : subQuestionFound
                                : "Not Answered"}
                            </div>
                          </div>
                        );
                      });
                    }
                  )
                : null}
            </>
          ) : null;
        })}
      </div>
    </div>
  );
}
