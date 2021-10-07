import React, { useState } from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import MCQQuestion from "./mcq_question";
import CheckBoxQuestion from "./checkbox_question";
import TextInputQuestion from "./textinput_question";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";
export default function ECQuestionSummaryCard() {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3">
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 question-text">
        Experience Title
        <button className="icon-btn center-child">
          <div
            onClick={() => {
              setDisplayingQuestion(true);
            }}
            style={{ width: "40%" }}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        </button>
      </div>
      <div className="ecsummary-info-section">
        <div className="name">TAGS</div>
        <div className="value">Volunteer, Children, Hospital</div>
      </div>
      <div className="ecsummary-info-section">
        <div className="name">ACCOMPLISHMENT</div>
        <div className="value">Volunteer, Children, Hospital</div>
      </div>
      <div className="ecsummary-info-section">
        <div className="name">TIME</div>
        <div className="value">Volunteer, Children, Hospital</div>
      </div>
      <div className="ecsummary-info-section">
        <div className="name">HOURS</div>
        <div className="value">Volunteer, Children, Hospital</div>
      </div>
    </div>
  );
}
