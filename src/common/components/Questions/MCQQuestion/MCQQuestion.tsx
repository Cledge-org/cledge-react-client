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
  isCentered?: boolean;
}

export default function MCQQuestion({
  question,
  userAnswer,
  onChange,
  tags,
  isPathwayQuestion,
  inEC,
  isCentered,
}: MCQQuestionProps) {
  const [selected, setSelected] = useState(userAnswer?.slice());
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC
          ? "align-items-start w-100"
          : `container-fluid ${
              !isCentered ? "align-items-start" : "align-items-center"
            }`
      } justify-content-evenly cl-dark-text fw-bold`}
    >
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div
        className={`d-flex flex-column justify-content-evenly align-items-${
          !isCentered ? "start" : "center"
        } h-75 w-100`}
      >
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
              style={isPathwayQuestion ? { width: "100%" } : {}}
              className={`${
                selected === op
                  ? styles.mcqAnswerBtnSelected
                  : styles.mcqAnswerBtn
              } ${inEC ? "w-100" : ""} py-3 ${
                isPathwayQuestion ? "" : "ps-4"
              } my-2`}
            >
              <div
                className="center-child me-2"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "white",
                  border: `1px solid ${
                    (
                      isPathwayQuestion
                        ? selected === singleData
                        : selected === op
                    )
                      ? palette.clBlue
                      : palette.clLightGray
                  }`,
                  borderRadius: "10px",
                }}
              >
                {(isPathwayQuestion
                  ? selected === singleData
                  : selected === op) && (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#2651ed",
                    }}
                  />
                )}
              </div>
              {isPathwayQuestion ? singleData : op}
            </button>
          );
        })}
      </div>
    </div>
  );
}
