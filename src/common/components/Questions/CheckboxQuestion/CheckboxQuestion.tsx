import React, { useEffect, useState } from "react";
import { Question } from "../../../../types/types";
import CheckBox from "../../CheckBox/CheckBox";
import styles from "./checkbox-question.module.scss";
interface CheckBoxQuestionProps {
  question: Question;
  userAnswers: string[];
  onChange: Function;
  tags: string[];
  inEC?: boolean;
}

export default function CheckBoxQuestion({
  question,
  userAnswers,
  onChange,
  inEC,
  tags,
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState(
    userAnswers !== null ? userAnswers.slice() : []
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
    let oldTags = userAnswers?.map((checkedOp, index) => {
      return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
    });
    setSelected(selectedCopy);
    onChange(
      selectedCopy,
      selectedCopy.map((checkedOp, index) => {
        return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
      }),
      oldTags
    );
  };
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC ? "align-items-start w-100" : "container-fluid align-items-center"
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
        {question.data.map(({ op, tag }) => {
          return (
            <button
              key={op}
              onClick={() => {
                console.log(tag);
                changeSelected(op);
              }}
              className={
                selected.includes(op)
                  ? styles.checkboxMcqVariantSelected
                  : styles.checkboxMcqVariant
              }
              style={inEC ? { width: "100%" } : {}}
            >
              {op}
              <CheckBox
                selected={selected.includes(op)}
                setSelected={() => {
                  changeSelected(op);
                }}
              />
            </button>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
