import React, { useEffect, useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/QuestionSubPage_Header";
import QuestionSummaryCard from "../../components/question_components/Question_Summary_Card";
import CheckBox from "../common/CheckBox";

export default function CheckBoxQuestion() {
  const [selected, setSelected] = useState([0]);
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const changeSelected = (value: number) => {
    setSelected((selectedCopy): number[] => {
      if (selectedCopy.includes(value)) {
        selectedCopy.splice(selectedCopy.indexOf(value), 1);
      } else {
        selectedCopy.push(value);
      }
      return selectedCopy;
    });
  };
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        Interested Area of Study
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
        <button
          key={0}
          onClick={() => changeSelected(0)}
          className={
            selected.includes(0)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Computer Science
          <CheckBox
            selected={selected.includes(0)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
        <button
          key={1}
          onClick={() => changeSelected(1)}
          className={
            selected.includes(1)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Engineering
          <CheckBox
            selected={selected.includes(1)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
        <button
          key={2}
          onClick={() => changeSelected(2)}
          className={
            selected.includes(2)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Business
          <CheckBox
            selected={selected.includes(2)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
        <button
          key={3}
          onClick={() => changeSelected(3)}
          className={
            selected.includes(3)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Pre-Med
          <CheckBox
            selected={selected.includes(3)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
        <button
          key={4}
          onClick={() => changeSelected(4)}
          className={
            selected.includes(4)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Liberal Arts
          <CheckBox
            selected={selected.includes(4)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
        <button
          key={5}
          onClick={() => changeSelected(5)}
          className={
            selected.includes(5)
              ? "checkbox-mcq-variant-selected"
              : "checkbox-mcq-variant"
          }
        >
          Undecided
          <CheckBox
            selected={selected.includes(5)}
            setSelected={changeSelected.bind(this)}
          />
        </button>
      </div>
      <button className="general-submit-btn">SUBMIT</button>
    </div>
  );
}
