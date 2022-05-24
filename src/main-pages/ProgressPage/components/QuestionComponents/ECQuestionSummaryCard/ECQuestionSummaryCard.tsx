import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

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
        <button
          onClick={() => onClick()}
          className={classNames(styles.iconBtn, "center-child")}
        >
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
      <div
        className={classNames(
          "w-100 d-flex flex-column align-items-center justify-content-center",
          styles.ecsummaryInfoContainer
        )}
      >
        {chunkQuestions.map(({ question, type, _id, data }) => {
          const questionFound = response.find(
            ({ questionId }) => _id === questionId
          );
          return question !== "Title" ? (
            <>
              <div className={classNames(styles.ecsummaryInfoSection, "py-3")}>
                <div className={styles.name}>
                  {question.toLocaleUpperCase()}
                </div>
                <div className={styles.value}>
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
                          <div
                            className={classNames(
                              styles.ecsummaryInfoSection,
                              "py-3"
                            )}
                          >
                            <div className={styles.name}>
                              {question.toLocaleUpperCase() + ` ${index + 1}`}
                            </div>
                            <div className={styles.value}>
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
