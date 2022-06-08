import React, { useState } from "react";

import styles from "./mcq-question.module.scss";

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
  const [selected, setSelected] = useState(userAnswer?.slice());
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC ? "align-items-start w-100" : "container-fluid align-items-center"
      } justify-content-evenly cl-dark-text fw-bold`}
    >
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {question.data.map(({ op, tag }) => {
          return (
            <button
              onClick={() => {
                let oldTag = question.data.find(
                  ({ op }) => userAnswer === op
                )?.tag;
                setSelected(op);
                onChange(op, [tag], oldTag ? [oldTag] : []);
              }}
              className={`${
                selected === op
                  ? styles.mcqAnswerBtnSelected
                  : styles.mcqAnswerBtn
              } ${inEC ? "w-100" : ""} py-3 ps-4 my-2`}
            >
              {isPathwayQuestion && (
                <div
                  style={{
                    width: "2em",
                    height: "2em",
                    border: "2px solid darkgray",
                    borderRadius: "1em",
                  }}
                >
                  {selected === op && (
                    <div
                      style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: "45%",
                      }}
                    />
                  )}
                </div>
              )}
              {op}
            </button>
          );
        })}
      </div>
    </div>
  );
}
