import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

interface ECTextInputQuestionProps {
  questionTitle: string;
  userResponse: string;
}

export default function ECTextInputQuestion({
  questionTitle,
  userResponse,
}: ECTextInputQuestionProps) {
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
      <div className="fw-bold cl-dark-text pb-3" style={{ fontSize: "1.4em" }}>
        {questionTitle}
      </div>
      <input
        defaultValue={userResponse}
        type="text"
        className="form-control ec-text-input"
        placeholder="Your response..."
      />
    </div>
  );
}
