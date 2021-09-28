import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/QuestionSubPage_Header";
import QuestionSummaryCard from "../../components/question_components/Question_Summary_Card";
import CheckBox from "../common/CheckBox";

export default function CheckBoxQuestion() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        Interested Area of Study
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <button className="checkbox-mcq-variant">
          Computer Science
          <CheckBox
            selected={selected === 0}
            setSelected={() => {
              setSelected(0);
            }}
          />
        </button>
        <button className="checkbox-mcq-variant">
          Engineering
          <CheckBox
            selected={selected === 1}
            setSelected={() => {
              setSelected(1);
            }}
          />
        </button>
        <button className="checkbox-mcq-variant">
          Business
          <CheckBox
            selected={selected === 2}
            setSelected={() => {
              setSelected(2);
            }}
          />
        </button>
        <button className="checkbox-mcq-variant">
          Pre-Med
          <CheckBox
            selected={selected === 3}
            setSelected={() => {
              setSelected(3);
            }}
          />
        </button>
        <button className="checkbox-mcq-variant">
          Liberal Arts
          <CheckBox
            selected={selected === 4}
            setSelected={() => {
              setSelected(4);
            }}
          />
        </button>
        <button className="checkbox-mcq-variant">
          Undecided
          <CheckBox
            selected={selected === 5}
            setSelected={() => {
              setSelected(5);
            }}
          />
        </button>
      </div>
      <button className="general-submit-btn">SUBMIT</button>
    </div>
  );
}
