import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import ECCalendarDropDown from "./ec_calendar_dropdown";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";
import ECTimeFrame from "./ec_timeframe_question";

interface ECEditorProps {
  onSave: Function;
}

export default function ECEditor({ onSave }: ECEditorProps) {
  return (
    <div
      className="container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative"
      style={{ overflowY: "scroll" }}
    >
      <button
        onClick={() => {
          onSave();
        }}
        className="ec-editor-btn-back"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="#000000" />
      </button>
      <div
        className="align-self-center d-flex h-100 w-50 py-3 flex-column"
        style={{ textAlign: "start" }}
      >
        <span
          className="cl-dark-text"
          style={{ fontSize: "1.8em", fontWeight: 800 }}
        >
          Adding a New Experience
        </span>
        <ECDropDown isConcatenable key="-tags" />
        <ECTextInputQuestion />
        <ECTimeFrame />
        <ECDropDown isConcatenable key="-tags2" />
        <ECDropDown isConcatenable key="-tags3" />
        <button
          onClick={() => onSave()}
          className="cl-btn-blue align-self-center mt-3"
        >
          Save
        </button>
        <div className="py-2" />
      </div>
    </div>
  );
}
