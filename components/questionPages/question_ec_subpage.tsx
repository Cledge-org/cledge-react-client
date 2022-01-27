import React, { useState } from "react";
import ECQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECEditor from "../../components/question_components/ec-editor";
import { ORIGIN_URL } from "../../config";
import { useSession } from "next-auth/react";
interface QuestionECSubpageProps {
  userResponses: UserResponse[];
  isShowing: boolean;
  chunk: QuestionChunk;
}

export default function QuestionECSubpage({
  userResponses,
  isShowing,
  chunk,
}: QuestionECSubpageProps) {
  const chunkExists =
    userResponses?.find(({ questionId }) => {
      return questionId === "Extracurricular";
    }) &&
    userResponses?.find(({ questionId }) => {
      return questionId === "Extracurricular";
    })?.response[chunk.name];
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currECIndex, setCurrECIndex] = useState(
    chunkExists
      ? userResponses?.find(({ questionId }) => {
          return questionId === "Extracurricular";
        })?.response[chunk.name].length
      : 0
  );
  const session = useSession();
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ECEditor
      index={currECIndex}
      isEditing={isEditing}
      onAbort={() => {
        setIsAdding(false);
        setIsEditing(false);
      }}
      onSave={async (newAnswers) => {
        if (
          userResponses.find(({ questionId }) => {
            return questionId === "Extracurricular";
          }) === undefined
        ) {
          userResponses.push({
            questionId: "Extracurricular",
            response: {
              [chunk.name]: [],
            },
          });
        }
        if (
          userResponses?.find(({ questionId }) => {
            return questionId === "Extracurricular";
          })?.response[chunk.name] === undefined
        ) {
          userResponses.find(({ questionId }) => {
            return questionId === "Extracurricular";
          }).response[chunk.name] = [];
        }
        userResponses.find(({ questionId }) => {
          return questionId === "Extracurricular";
        }).response[chunk.name][currECIndex] = newAnswers;
        fetch(`${ORIGIN_URL}/api/put-question-responses`, {
          method: "POST",
          body: JSON.stringify({
            responses: userResponses,
            userId: session.data.user.uid,
          }),
        });
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponse={
        chunkExists &&
        userResponses.find(({ questionId }) => {
          return questionId === "Extracurricular";
        }).response[chunk.name][currECIndex]
          ? userResponses.find(({ questionId }) => {
              return questionId === "Extracurricular";
            }).response[chunk.name][currECIndex]
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
        title={chunk.name}
        percentage={undefined}
      />
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "91%" }}
      >
        {chunkExists
          ? userResponses
              .find(({ questionId }) => {
                return questionId === "Extracurricular";
              })
              .response[chunk.name].map((response, index) => {
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
              })
          : []}
      </div>
    </div>
  );
}
