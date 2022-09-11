import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "./text-input-question.module.scss";
import classNames from "classnames";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";
interface TextInputQuestionProps {
  isPathwayQuestion?: boolean;
  question: Question | PathwayQuestion;
  userAnswer: string;
  onChange: Function;
  isTextArea?: boolean;
  className?: string;
  isGrade?: boolean;
  isDark?: boolean;
  isCentered?: boolean;
  smallTitle?: boolean;
}
export default function TextInputQuestion({
  question,
  userAnswer,
  isGrade,
  isTextArea,
  isPathwayQuestion,
  onChange,
  isDark,
  className,
  isCentered,
  smallTitle,
}: TextInputQuestionProps) {
  const session = useSession();
  const [currValue, setCurrValue] = useState(userAnswer);
  if (isTextArea) {
    return (
      <div
        className={classNames(
          `container-fluid h-100 d-flex flex-column align-items-${
            isCentered ? "start" : "center"
          } justify-content-evenly w-100 cl-dark-text fw-bold`,
          className
        )}
      >
        <span
          className={`pt-4 pb-2 ${smallTitle ? "cl-light-gray pb-1" : "pb-3"}`}
          style={{ fontSize: smallTitle ? "1em" : "1.4em" }}
        >
          {question.question}
        </span>
        <div
          className={`d-flex flex-column justify-content-evenly align-items-${
            isCentered ? "start" : "center"
          } h-75 w-100`}
        >
          <textarea
            defaultValue={currValue}
            onChange={async (e) => {
              if (isGrade) {
                await fetch(`/api/update-user`, {
                  method: "POST",
                  body: JSON.stringify({
                    userInfo: { grade: e.target.value },
                    userId: session.data.user.uid,
                  }),
                });
              }
              setCurrValue(e.target.value);
              onChange(e.target.value);
            }}
            rows={8}
            className={`form-control w-${isPathwayQuestion ? "100" : "75"}`}
            placeholder={question.placeholder}
          />
        </div>
        {/* <button className="general-submit-btn mt-2">SUBMIT</button> */}
      </div>
    );
  }
  if (isDark) {
    return (
      <div
        className={classNames(
          "w-100 d-flex flex-column justify-content-evenly pt-5",
          className
        )}
      >
        <div
          className="fw-bold cl-dark-text pb-3"
          style={{ fontSize: "1.4em" }}
        >
          {question.question}
        </div>
        <input
          value={currValue}
          type="text"
          className={classNames("form-control", styles.ecTextInput)}
          placeholder={question.placeholder}
          onChange={(e) => {
            setCurrValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    );
  }
  return (
    <div
      className={classNames(
        `h-100 d-flex flex-column align-items-${
          !isCentered ? "start" : "center"
        } justify-content-evenly w-100 cl-dark-text fw-bold`,
        className
      )}
    >
      {smallTitle ? (
        <span
          className={`pt-4 "cl-light-gray pb-1"`}
          style={{ fontSize: "1em" }}
        >
          {question.question}
        </span>
      ) : (
        <div
          style={{ width: "90%" }}
          className={classNames(
            "d-flex flex-row pt-4 pb-2 align-items-center",
            {
              ["justify-content-center"]:
                isCentered && !(question as Question).popUpText,
              ["justify-content-between"]: (question as Question).popUpText,
            }
          )}
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
      )}
      <div
        className={`d-flex flex-column justify-content-evenly align-items-${
          !isCentered ? "start" : "center"
        } h-75 w-100`}
      >
        <input
          defaultValue={currValue}
          type="text"
          onChange={async (e) => {
            if (isGrade) {
              await fetch(`/api/update-user`, {
                method: "POST",
                body: JSON.stringify({
                  userInfo: { grade: e.target.value },
                  userId: session.data.user.uid,
                }),
              });
            }
            setCurrValue(e.target.value);
            onChange(e.target.value);
          }}
          className={`form-control w-${
            isPathwayQuestion || smallTitle ? "100" : "75"
          } cl-dark-text fw-bold`}
          style={{ borderRadius: "10px" }}
          placeholder={question.placeholder ?? "Your response..."}
        />
      </div>
    </div>
  );
}
