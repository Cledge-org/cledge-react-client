import React, { useState } from "react";
import ECQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";
import ECEditor from "../../components/question_components/ec_editor";
interface QuestionECSubpageProps {
  userECResponses: any[];
  isShowing: boolean;
  chunk: QuestionChunk;
}

export default function QuestionECSubpage({
  userECResponses,
  isShowing,
  chunk,
}: QuestionECSubpageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ECEditor
      onSave={() => {
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
    />
  ) : (
    <div className="container-fluid h-100 d-flex flex-column">
      <QuestionSubPageHeader
        isExtracurricular
        onAddNew={() => {
          setIsAdding(true);
        }}
        title="Academic Achievement"
        percentage={undefined}
      />
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "91%" }}
      >
        {userECResponses.map((response) => {
          return (
            <ECQuestionSummaryCard
              response={response}
              chunkQuestions={chunk.questions}
              onClick={() => {
                setIsEditing(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
