import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/QuestionSubPage_Header";
import QuestionSummaryCard from "../../components/question_components/Question_Summary_Card";

export default function QuestionSummarySubpage() {
  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <QuestionSubPageHeader title="9th Grade" percentage={67} />
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "85%" }}
      >
        <span className="pt-3 cl-dark-text fw-bold">
          9th Grade - 1st Quarter Check-in
        </span>
        <QuestionSummaryCard />
      </div>
    </div>
  );
}
