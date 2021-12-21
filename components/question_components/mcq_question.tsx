import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";

interface MCQQuestionProps {
  question: Question;
  userAnswer: string;
  onChange: Function;
}

export default function MCQQuestion({
  question,
  userAnswer,
  onChange,
}: MCQQuestionProps) {
  const [selected, setSelected] = useState(userAnswer);
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {question.data.map(({ op, tag }) => {
          return (
            <button
              onClick={() => {
                setSelected(tag);
                onChange(tag);
              }}
              className={
                selected === tag ? "mcq-answer-btn-selected" : "mcq-answer-btn"
              }
            >
              {op}
            </button>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
