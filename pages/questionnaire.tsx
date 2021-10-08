import React, { useState } from "react";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../components/question_components/question_summary_card";
import ECTextInputQuestion from "../components/question_components/ec_textinput_question";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import { ProgressBar } from "react-bootstrap";

export default function Questionnaire() {
  const goBack = (e) => {
    e.preventDefault();
    console.log("whee");
  };

  const goForward = (e) => {
    e.preventDefault();
    console.log("whee");
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column">
        <div className="col-md-5 d-md-flex mx-auto mt-5 flex-column justify-content-center align-middle"
        style={{ width: "30%" }}
        >
            <div className="question-subpage-title">
                Question placeholder
            </div>
            <ECTextInputQuestion />
            <ECDropDown/>
            
            <div className="auth-bottom-nav">
                <div className="px-0">
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={goBack}
                    >
                    Back
                    </button>
                </div>

                <div className="px-0">
                    <button
                    type="button"
                    className="btn cl-btn-blue"
                    onClick={goForward}
                    >
                    Next
                    </button>
                </div>
            </div>
        </div>
        <div className="align-self-center" style={{position: "fixed", bottom: "10vh", width: "80%"}}>
            <ProgressBar now={60} />
        </div>
    </div>
  );
}
