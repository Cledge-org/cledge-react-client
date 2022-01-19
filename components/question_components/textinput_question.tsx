import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question-summary-card";
interface TextInputQuestionProps {
  question: Question;
  userAnswer: string;
  onChange: Function;
}
export default function TextInputQuestion({
  question,
  userAnswer,
  onChange,
}: TextInputQuestionProps) {
  const [currValue, setCurrValue] = useState(userAnswer);
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <input
          defaultValue={currValue}
          type="text"
          onChange={(e) => {
            setCurrValue(e.target.value);
            onChange(e.target.value);
          }}
          className="form-control w-75"
          placeholder="Your response..."
        />
      </div>
      {/* <button className="general-submit-btn mt-2">SUBMIT</button> */}
    </div>
  );
}
