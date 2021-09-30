import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

export default function TextInputQuestion() {
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        Current Home(legal) Address
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Your response..."
        />
      </div>
      <button className="general-submit-btn mt-2">SUBMIT</button>
    </div>
  );
}
