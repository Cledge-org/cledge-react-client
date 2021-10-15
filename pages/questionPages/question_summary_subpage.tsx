import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

export default function QuestionSummarySubpage() {
  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <QuestionSubPageHeader title="9th Grade" percentage={67} />
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "91%" }}
      >
        <span className="pt-3 cl-dark-text fw-bold">
          9th Grade - 1st Quarter Check-in
        </span>
        <QuestionSummaryCard />
      </div>
    </div>
  );
}
