import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

export default function ECTextInputQuestion() {
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
      <div className="fw-bold cl-dark-text pb-3" style={{ fontSize: "1.4em" }}>
        Title
      </div>
      <input
        type="text"
        className="form-control ec-text-input"
        placeholder="Your response..."
      />
    </div>
  );
}
