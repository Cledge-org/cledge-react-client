import React, { useEffect, useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import CheckBox from "../common/CheckBox";

interface CheckBoxQuestionProps {
  question: Question;
  userAnswer: boolean;
  onChange: Function;
}

export default function YesNoQuestion({
  question,
  userAnswer,
  onChange,
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState(userAnswer ?? false);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const changeSelected = (value: boolean) => {
    setSelected(value);
    onChange(value);
  };
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {["Yes", "No"].map((op) => {
          return (
            <div
              key={op}
              className="w-50 d-flex flex-row align-items-center mb-3"
            >
              <div
                className="center-child me-2"
                onClick={() => {
                  changeSelected(op === "Yes");
                }}
                style={{
                  width: "24px",
                  height: "24px",
                  border: "1px solid #656565",
                  borderRadius: "12px",
                }}
              >
                {(selected && op === "Yes") || (!selected && op === "No") ? (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "1px solid #2651ed",
                      backgroundColor: "#2651ed",
                      borderRadius: "8px",
                    }}
                  />
                ) : null}
              </div>
              {op}
            </div>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
