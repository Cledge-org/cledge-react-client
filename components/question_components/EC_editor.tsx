import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";

export default function ECEditor() {
  return (
    <div className="container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative">
      <button className="ec-editor-btn-back">
        <FontAwesomeIcon icon={faArrowLeft} color="#000000" />
      </button>
      <div
        className="align-self-center h-100 w-50 py-3 flex-column"
        style={{ textAlign: "start" }}
      >
        <span
          className="cl-dark-text"
          style={{ fontSize: "1.8em", fontWeight: 800 }}
        >
          Adding a New Experience
        </span>
        <ECDropDown />
        <ECTextInputQuestion />
      </div>
    </div>
  );
}
