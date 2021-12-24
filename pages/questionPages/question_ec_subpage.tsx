import React, { useState } from "react";
import ECQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
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
  const [currECIndex, setCurrECIndex] = useState(userECResponses.length);
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ECEditor
      index={currECIndex}
      isEditing={isEditing}
      onSave={() => {
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponses={userECResponses}
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
        {userECResponses.map((response, index) => {
          return (
            <ECQuestionSummaryCard
              response={response}
              chunkQuestions={chunk.questions}
              onClick={() => {
                setCurrECIndex(index);
                setIsEditing(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
