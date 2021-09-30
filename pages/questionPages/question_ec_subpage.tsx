import React, { useState } from "react";
import ECEditor from "../../components/question_components/EC_editor";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

export default function QuestionECSubpage() {
  const [isAdding, setIsAdding] = useState(false);
  return isAdding ? (
    <ECEditor />
  ) : (
    <div className="container-fluid h-100 d-flex flex-column">
      <QuestionSubPageHeader
        isExtracurricular
        onAddNew={() => {
          setIsAdding(true);
        }}
        title="Academic Achievement"
        percentage={67}
      />
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "85%" }}
      ></div>
    </div>
  );
}
