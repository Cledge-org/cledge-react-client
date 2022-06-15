import React, { useState } from "react";

import styles from "./mcq-question.module.scss";
import palette from "src/common/styles/palette.module.scss";
interface MCQQuestionProps {
  isPathwayQuestion?: boolean;
  question: Question | PathwayQuestion;
  userAnswer: string;
  onChange: Function;
  tags: string[];
  inEC?: boolean;
}

export default function MCQQuestion({
  question,
  userAnswer,
  onChange,
  tags,
  isPathwayQuestion,
  inEC,
}: MCQQuestionProps) {
  console.log(userAnswer);
  const [selected, setSelected] = useState(userAnswer?.slice());
  console.log(palette);
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC
          ? "align-items-start w-100"
          : `container-fluid ${
              isPathwayQuestion ? "align-items-start" : "align-items-center"
            }`
      } justify-content-evenly cl-dark-text fw-bold`}
    >
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {question.data.map((singleData) => {
          const { op, tag } = singleData;
          return (
            <button
              onClick={() => {
                if (isPathwayQuestion) {
                  setSelected(singleData);
                  onChange(singleData);
                  return;
                }
                let oldTag = question.data.find(
                  ({ op }) => userAnswer === op
                )?.tag;
                setSelected(op);
                onChange(op, [tag], oldTag ? [oldTag] : []);
              }}
              style={
                isPathwayQuestion
                  ? { backgroundColor: "white", width: "100%" }
                  : {}
              }
              className={`${
                selected === op
                  ? styles.mcqAnswerBtnSelected
                  : styles.mcqAnswerBtn
              } ${inEC ? "w-100" : ""} py-3 ${
                isPathwayQuestion ? "" : "ps-4"
              } my-2`}
            >
              {isPathwayQuestion && (
                <div
                  className="center-child me-3"
                  style={{
                    width: "2em",
                    height: "2em",
                    border: "2px solid darkgray",
                    borderRadius: "1em",
                  }}
                >
                  {selected === singleData && (
                    <div
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        borderRadius: "0.75em",
                        backgroundColor: "#2651ed",
                      }}
                    />
                  )}
                </div>
              )}
              {isPathwayQuestion ? singleData : op}
            </button>
          );
        })}
      </div>
    </div>
  );
}
