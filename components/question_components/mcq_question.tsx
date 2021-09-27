import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/QuestionSubPage_Header";
import QuestionSummaryCard from "../../components/question_components/Question_Summary_Card";

export default function MCQQuestion() {
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4" style={{ fontSize: "1.4em" }}>
        Interested Area of Study
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <button className="mcq-answer-btn">Computer Science</button>
        <button className="mcq-answer-btn">Engineering</button>
        <button className="mcq-answer-btn">Business</button>
        <button className="mcq-answer-btn">Pre-Med</button>
        <button className="mcq-answer-btn">Liberal Arts</button>
        <button className="mcq-answer-btn">Undecided</button>
      </div>
      <button className="general-submit-btn">SUBMIT</button>
    </div>
  );
}
