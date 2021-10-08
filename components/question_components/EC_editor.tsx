import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECCalendarDropDown from "./ec_calendar_dropdown";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";

interface ECEditorProps {
  onSave: Function;
}

export default function ECEditor({ onSave }: ECEditorProps) {
  return (
    <div className="container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative">
      <button
        onClick={() => {
          onSave();
        }}
        className="ec-editor-btn-back"
      >
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
        <ECDropDown isConcatenable />
        <ECTextInputQuestion />
        <ECCalendarDropDown />
      </div>
    </div>
  );
}
