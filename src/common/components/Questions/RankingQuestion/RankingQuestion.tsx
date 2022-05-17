import React, { useEffect, useState } from "react";
import { Question } from "../../../../types/types";
import DropDownQuestion from "../DropdownQuestion/DropdownQuestion";

interface RankingQuestionProps {
  question: Question;
  userAnswers: string[];
  onChange: Function;
  tags: string[];
}

export default function RankingQuestion({
  question,
  userAnswers,
  onChange,
  tags,
}: RankingQuestionProps) {
  const [selected, setSelected] = useState(
    userAnswers !== null ? userAnswers.slice() : question.data.map(() => "")
  );
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  let changeRank = (value: string, index: number) => {
    let selectedCopy = selected.slice();
    let indexOfValue = selectedCopy.indexOf(value);
    if (indexOfValue !== index && indexOfValue !== -1) {
      selectedCopy[indexOfValue] = "";
    }
    selectedCopy[index] = value;
    setSelected(selectedCopy);
    onChange(selectedCopy);
  };
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        {question.data.map(({ op, tag }, index) => {
          return (
            <div className="row mb-3 align-items-center justify-content-between w-100">
              <div style={{ fontSize: "1.2em", width: "fit-content" }}>
                {index + 1 + "."}
              </div>
              <div style={{ width: "90%" }}>
                <DropDownQuestion
                  rankings={selected}
                  defaultValue={selected[index]}
                  isForWaitlist
                  onChange={(value) => {
                    changeRank(value, index);
                  }}
                  placeholder={"Pick for rank " + (index + 1)}
                  valuesList={question.data.map(({ op }) => op)}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
