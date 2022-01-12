import React, { useState } from "react";
import ECQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECEditor from "../../components/question_components/ec-editor";
import { ORIGIN_URL } from "../../config";
interface QuestionECSubpageProps {
  userResponses: any[];
  isShowing: boolean;
  chunk: QuestionChunk;
}

export default function QuestionECSubpage({
  userResponses,
  isShowing,
  chunk,
}: QuestionECSubpageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currECIndex, setCurrECIndex] = useState(
    userResponses["Extracurricular"] &&
      userResponses["Extracurricular"][chunk.name]
      ? userResponses["Extracurricular"][chunk.name].length
      : 0
  );
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ECEditor
      index={currECIndex}
      isEditing={isEditing}
      onSave={async (newAnswers) => {
        userResponses["Extracurricular"][chunk.name][currECIndex] = newAnswers;
        fetch(`${ORIGIN_URL}/api/put-question-responses`, {
          method: "POST",
          body: JSON.stringify({
            responses: [],
            userId: (await (await fetch(`${ORIGIN_URL}/api/get-uid`)).json())
              .uid,
          }),
        });
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponse={
        userResponses["Extracurricular"] &&
        userResponses["Extracurricular"][chunk.name] &&
        userResponses["Extracurricular"][chunk.name][currECIndex]
          ? userResponses["Extracurricular"][chunk.name][currECIndex]
          : []
      }
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
        {userResponses["Extracurricular"] &&
        userResponses["Extracurricular"][chunk.name]
          ? userResponses["Extracurricular"][chunk.name].map(
              (response, index) => {
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
              }
            )
          : []}
      </div>
    </div>
  );
}
