import React, { useEffect, useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import CheckBox from "../common/CheckBox";

interface CheckBoxQuestionProps {
  question: Question;
  userAnswers: string[];
  onChange: Function;
}

export default function CheckBoxQuestion({
  question,
  userAnswers,
  onChange,
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState(userAnswers ?? []);
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
    onChange(value);
  };
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {question.data.map(({ op, tag }) => {
          return (
            <button
              key={op}
              onClick={() => {
                console.log(tag);
                changeSelected(tag);
              }}
              className={
                selected.includes(tag)
                  ? "checkbox-mcq-variant-selected"
                  : "checkbox-mcq-variant"
              }
            >
              {op}
              <CheckBox
                selected={selected.includes(tag)}
                setSelected={() => {
                  changeSelected(tag);
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
