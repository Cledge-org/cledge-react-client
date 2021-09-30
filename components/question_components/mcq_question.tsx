import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

export default function MCQQuestion() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        Interested Area of Study
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <button
          onClick={() => setSelected(0)}
          className={
            selected === 0 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Computer Science
        </button>
        <button
          onClick={() => setSelected(1)}
          className={
            selected === 1 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Engineering
        </button>
        <button
          onClick={() => setSelected(2)}
          className={
            selected === 2 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Business
        </button>
        <button
          onClick={() => setSelected(3)}
          className={
            selected === 3 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Pre-Med
        </button>
        <button
          onClick={() => setSelected(4)}
          className={
            selected === 4 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Liberal Arts
        </button>
        <button
          onClick={() => setSelected(5)}
          className={
            selected === 5 ? "mcq-answer-btn-selected" : "mcq-answer-btn"
          }
        >
          Undecided
        </button>
      </div>
      <button className="general-submit-btn">SUBMIT</button>
    </div>
  );
}
