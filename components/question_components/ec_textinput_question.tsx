import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

export default function ECTextInputQuestion() {
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly">
      <span>Name</span>
      <input
        type="text"
        className="form-control w-75 ec-text-input"
        placeholder="Your response..."
      />
    </div>
  );
}
