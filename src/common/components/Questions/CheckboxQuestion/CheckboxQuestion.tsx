import classNames from "classnames";
import React, { useEffect, useState } from "react";

import CheckBox from "../../CheckBox/CheckBox";
import styles from "./checkbox-question.module.scss";
interface CheckBoxQuestionProps {
  isPathwayQuestion?: boolean;
  question: Question | PathwayQuestion;
  userAnswers: string[];
  onChange: Function;
  tags: string[];
  inEC?: boolean;
}

export default function CheckBoxQuestion({
  question,
  userAnswers,
  onChange,
  isPathwayQuestion,
  inEC,
  tags,
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState(
    userAnswers ? userAnswers.slice() : []
  );
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  let changeSelected = (value: string) => {
    let selectedCopy = selected.slice();
    if (selectedCopy.includes(value)) {
      selectedCopy.splice(selectedCopy.indexOf(value), 1);
    } else {
      selectedCopy.push(value);
    }
    setSelected(selectedCopy);
    if (!isPathwayQuestion) {
      let oldTags = userAnswers?.map((checkedOp, index) => {
        return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
      });
      onChange(
        selectedCopy,
        selectedCopy.map((checkedOp, index) => {
          return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
        }),
        oldTags
      );
    } else {
      onChange(
        selectedCopy,
        selectedCopy.map((checkedOp, index) => {
          return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
        })
      );
    }
  };
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC
          ? "align-items-start w-100"
          : `container-fluid ${
              isPathwayQuestion ? "align-items-start" : "align-items-center"
            }`
      } justify-content-evenly w-100 cl-dark-text fw-bold`}
    >
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div
        className={`d-flex flex-column justify-content-evenly ${
          inEC ? "align-items-start" : "align-items-center"
        } h-75 w-100`}
      >
        {question.data.map((singleData) => {
          const { op, tag } = singleData;
          return (
            <button
              key={isPathwayQuestion ? singleData : op}
              onClick={() => {
                if (isPathwayQuestion) {
                  changeSelected(singleData);
                  return;
                }
                console.log(tag);
                changeSelected(op);
              }}
              className={classNames(
                selected.includes(op)
                  ? styles.checkboxMcqVariantSelected
                  : styles.checkboxMcqVariant,
                "py-2 my-2",
                { ["ps-4 px-4"]: !isPathwayQuestion }
              )}
              style={
                inEC
                  ? { width: "100%" }
                  : isPathwayQuestion
                  ? {
                      justifyContent: "start",
                      backgroundColor: "white",
                      width: "100%",
                    }
                  : {}
              }
            >
              {isPathwayQuestion && (
                <CheckBox
                  selected={selected.includes(
                    isPathwayQuestion ? singleData : op
                  )}
                  setSelected={() => {
                    if (isPathwayQuestion) {
                      changeSelected(singleData);
                      return;
                    }
                    changeSelected(op);
                  }}
                />
              )}
              {isPathwayQuestion ? singleData : op}
              {!isPathwayQuestion && (
                <CheckBox
                  selected={selected.includes(op)}
                  setSelected={() => {
                    changeSelected(op);
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
