import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";

interface ECTextInputQuestionProps {
  questionTitle: string;
  userResponse: string;
  placeholder: string;
  onChange: Function;
}

export default function ECTextInputQuestion({
  questionTitle,
  userResponse,
  placeholder,
  onChange,
}: ECTextInputQuestionProps) {
  const [value, setValue] = useState(userResponse);
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
      <div className="fw-bold cl-dark-text pb-3" style={{ fontSize: "1.4em" }}>
        {questionTitle}
      </div>
      <input
        value={value}
        type="text"
        className="form-control ec-text-input"
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
