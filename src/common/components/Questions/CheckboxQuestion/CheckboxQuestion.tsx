import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";

import CheckBox from "../../CheckBox/CheckBox";
import styles from "./checkbox-question.module.scss";
interface CheckBoxQuestionProps {
  isPathwayQuestion?: boolean;
  question: Question | PathwayQuestion;
  userAnswers: string[];
  onChange: Function;
  tags: string[];
  isCentered?: boolean;
  inEC?: boolean;
}

export default function CheckBoxQuestion({
  question,
  userAnswers,
  onChange,
  isPathwayQuestion,
  inEC,
  isCentered,
  tags,
}: CheckBoxQuestionProps) {
  const [selected, setSelected] = useState(
    userAnswers ? userAnswers.slice() : []
  );
  useEffect(() => {
    //console.log(selected);
  }, [selected]);
  let changeSelected = (value: string) => {
    let selectedCopy = selected.slice();
    if (selectedCopy.includes(value)) {
      selectedCopy.splice(selectedCopy.indexOf(value), 1);
    } else {
      selectedCopy.push(value);
    }
    setSelected(selectedCopy);
    if (!isPathwayQuestion) {
      let oldTags = userAnswers?.map((checkedOp, index) => {
        return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
      });
      onChange(
        selectedCopy,
        selectedCopy.map((checkedOp, index) => {
          return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
        }),
        oldTags
      );
    } else {
      onChange(
        selectedCopy,
        selectedCopy.map((checkedOp, index) => {
          return question.data.find(({ tag, op }) => op === checkedOp)?.tag;
        })
      );
    }
  };
  return (
    <div
      className={`h-100 d-flex flex-column ${
        inEC
          ? "align-items-start w-100"
          : `${!isCentered ? "align-items-start" : "align-items-center"}`
      } justify-content-evenly w-100 cl-dark-text fw-bold`}
    >
      <div
        style={{ width: "90%" }}
        className={classNames("d-flex flex-row pt-4 pb-2 align-items-center", {
          ["justify-content-center"]:
            isCentered && !(question as Question).popUpText,
          ["justify-content-between"]: (question as Question).popUpText,
        })}
      >
        <span className="cl-dark-text fw-bold" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        {(question as Question).popUpText && (
          <Tooltip
            tipId={(question as Question)._id.toString()}
            text={(question as Question).popUpText}
          />
        )}
      </div>
      <div
        className={`d-flex flex-column justify-content-evenly ${
          inEC ? "align-items-start" : "align-items-center"
        } h-75 w-100`}
      >
        {question.data.map((singleData) => {
          const { op, tag } = singleData;
          return (
            <button
              key={isPathwayQuestion ? singleData : op}
              onClick={() => {
                if (isPathwayQuestion) {
                  changeSelected(singleData);
                  return;
                }
                //console.log(tag);
                changeSelected(op);
              }}
              className={classNames(
                selected.includes(op)
                  ? styles.checkboxMcqVariantSelected
                  : styles.checkboxMcqVariant,
                "py-2 my-2",
                { ["ps-4 px-4"]: !isPathwayQuestion }
              )}
              style={{
                justifyContent: "start",
                width: "100%",
              }}
            >
              <CheckBox
                selected={selected.includes(
                  isPathwayQuestion ? singleData : op
                )}
                setSelected={() => {
                  if (isPathwayQuestion) {
                    changeSelected(singleData);
                    return;
                  }
                  changeSelected(op);
                }}
              />
              {isPathwayQuestion ? singleData : op}
            </button>
          );
        })}
      </div>
      {/* <button className="general-submit-btn">SUBMIT</button> */}
    </div>
  );
}
