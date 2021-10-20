import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";
import CheckBox from "../common/CheckBox";

interface CheckBoxQuestionProps {
  title?: string;
  valuesList?: string[];
  key?: any;
}
export default function CheckBoxQuestion({
  title=undefined,
  valuesList=["Computer Science", "Engineering", "Business", "Pre-Med", "Liberal Arts", "Undecided", "Other"],
  key
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState([]);
  const changeSelected = (value: number) => {
    let selectedCopy: number[] = [...selected];
    if (selectedCopy.includes(value)) selectedCopy.splice(selected.indexOf(value), 1);
    else selectedCopy.push(value);
    setSelected(selectedCopy);
  };
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      {typeof title !== 'undefined' &&
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {title}
        </span>
      }

      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {valuesList.map((option, index) => (
          <button
            key={index}
            onClick={() => changeSelected(index)}
            className={
              selected.includes(index)
                ? "checkbox-mcq-variant-selected"
                : "checkbox-mcq-variant"
            }
          >
            {option} {index}
            <CheckBox
              selected={selected.includes(index)}
              setSelected={changeSelected.bind(this)}
            />
          </button>
        ))}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
