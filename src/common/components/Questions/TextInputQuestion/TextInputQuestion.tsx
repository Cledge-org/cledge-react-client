import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "./text-input-question.module.scss";
import classNames from "classnames";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";
import { callUpdateUser } from "src/utils/apiCalls";
interface TextInputQuestionProps {
  isPathwayQuestion?: boolean;
  question: Question | PathwayQuestion;
  userAnswer: string;
  onChange: Function;
  isInDouble?: boolean;
  className?: string;
  isGrade?: boolean;
  isCentered?: boolean;
  smallTitle?: boolean;
}
export default function TextInputQuestion({
  question,
  userAnswer,
  isGrade,
  isPathwayQuestion,
  onChange,
  isInDouble,
  className,
  isCentered,
  smallTitle,
}: TextInputQuestionProps) {
  const session = useSession();
  const [currValue, setCurrValue] = useState(userAnswer);
  if ((question as Question).isTextArea) {
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
            className={`pt-4 cl-light-gray pb-1`}
            style={{
              fontSize: "1em",
              width: isInDouble ? "100%" : "90%",
              textAlign: "left",
            }}
          >
            {`${question.question}${
              (question as Question).isRequired ? " *" : ""
            }`}
          </span>
        ) : (
          <div
            style={{ width: "90%" }}
            className={classNames(
              "d-flex flex-row pt-4 pb-2 align-items-center",
              {
                ["justify-content-between"]: (question as Question).popUpText,
              }
            )}
          >
            <span
              className="cl-dark-text fw-bold"
              style={{ fontSize: "1.4em" }}
            >
              {`${question.question}${
                (question as Question).isRequired ? " *" : ""
              }`}
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
            isCentered ? "start" : "center"
          } h-75 w-100`}
        >
          <textarea
            defaultValue={currValue}
            onChange={async (e) => {
              if (isGrade) {
                await fetch(`/api/user/update-user`, {
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
            className={`form-control cl-dark-text fw-bold`}
            style={{
              borderRadius: "10px",
              width: isInDouble || smallTitle ? "90%" : "100%",
            }}
            placeholder={question.placeholder}
          />
        </div>
        {/* <button className="general-submit-btn mt-2">SUBMIT</button> */}
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
          className={`pt-4 cl-light-gray pb-1`}
          style={{
            fontSize: "1em",
            width: isInDouble ? "100%" : "90%",
            textAlign: "left",
          }}
        >
          {`${question.question}${
            (question as Question).isRequired ? " *" : ""
          }`}
        </span>
      ) : (
        <div
          style={{ width: "90%" }}
          className={classNames(
            "d-flex flex-row pt-4 pb-2 align-items-center",
            {
              ["justify-content-between"]: (question as Question).popUpText,
            }
          )}
        >
          <span className="cl-dark-text fw-bold" style={{ fontSize: "1.4em" }}>
            {`${question.question}${
              (question as Question).isRequired ? " *" : ""
            }`}
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
        } h-75`}
        style={{ width: smallTitle ? "100%" : "90%" }}
      >
        <input
          defaultValue={currValue}
          type={(question as Question).numbersOnly ? "number" : "text"}
          onChange={async (e) => {
            if (isGrade) {
              await fetch(`/api/user/update-user`, {
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
          className={`form-control cl-dark-text fw-bold`}
          style={{
            borderRadius: "10px",
            width: isInDouble || smallTitle ? "90%" : "100%",
          }}
          placeholder={question.placeholder ?? "Your response..."}
        />
      </div>
    </div>
  );
}
