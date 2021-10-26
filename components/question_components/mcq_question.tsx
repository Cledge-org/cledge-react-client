import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

interface MCQProps {
  title?: string;
  defaultValue?: string;
  valuesList?: string[];
  onChange: Function;
  key?: any;
}
export default function MCQQuestion({
  title=undefined,
  defaultValue=null,
  valuesList=["Computer Science", "Engineering", "Business", "Pre-Med", "Liberal Arts", "Undecided", "Other"],
  onChange,
  key
}: MCQProps) {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      {typeof title !== 'undefined' &&
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {title}
        </span>
      }
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {valuesList.map((option) => (
          <button
            key={option}
            onClick={() => {setSelected(option); onChange(option)}}
            className={ selected === option ? "mcq-answer-btn-selected" : "mcq-answer-btn" }
          >
            {option}
          </button>
        ))}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
