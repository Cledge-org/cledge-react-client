import React, { useState } from "react";
import ECQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";
import ECEditor from "../../components/question_components/ec_editor";

export default function QuestionECSubpage() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return isAdding || isEditing ? (
    <ECEditor
      onSave={() => {
        setIsAdding(false);
        setIsEditing(false);
      }}
    />
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
      >
        <ECQuestionSummaryCard />
      </div>
    </div>
  );
}
