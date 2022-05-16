import React, { useState } from "react";
import QuestionSubPageHeader from "../../../../main-pages/ProgressPage/components/QuestionComponents/SubpageHeader/SubpageHeader";
import QuestionSummaryCard from "../../../../main-pages/ProgressPage/components/QuestionComponents/QuestionSummaryCard/QuestionSummaryCard";
import { useSession } from "next-auth/react";
interface TextInputQuestionProps {
  question: Question;
  userAnswer: string;
  onChange: Function;
  isGrade?: boolean;
  isDark?: boolean;
}
export default function TextInputQuestion({
  question,
  userAnswer,
  isGrade,
  onChange,
  isDark,
}: TextInputQuestionProps) {
  const session = useSession();
  const [currValue, setCurrValue] = useState(userAnswer);
  if (isDark) {
    return (
      <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
        <div
          className="fw-bold cl-dark-text pb-3"
          style={{ fontSize: "1.4em" }}
        >
          {question.question}
        </div>
        <input
          value={currValue}
          type="text"
          className="form-control ec-text-input"
          placeholder={question.helpText}
          onChange={(e) => {
            setCurrValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    );
  }
  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
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
          className="form-control w-75"
          placeholder="Your response..."
        />
      </div>
      {/* <button className="general-submit-btn mt-2">SUBMIT</button> */}
    </div>
  );
}
