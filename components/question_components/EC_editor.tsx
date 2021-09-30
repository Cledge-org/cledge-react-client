import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

export default function ECEditor() {
  return (
    <div className="container-fluid h-100 d-flex flex-row w-100">
      <div style={{ width: "2vw" }}>
        <FontAwesomeIcon icon={faArrowLeft} color="#000000" />
      </div>
      <div className="align-self-center" style={{ justifySelf: "center" }}>
        Adding a New Experience
      </div>
    </div>
  );
}
