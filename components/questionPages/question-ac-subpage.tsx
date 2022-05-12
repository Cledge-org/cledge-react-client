import React, { useState } from "react";
import ACQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ACEditor from "../../components/question_components/ec-editor";
import { useSession } from "next-auth/react";
import { store } from "../../utils/store";
import { updateQuestionResponsesAction } from "../../utils/actionFunctions";
import { calculateACActivityTier } from "../../utils/metricsCalculations";
import QuestionSummaryCard from "../question_components/question-summary-card";

interface QuestionACSubpageProps {
  userResponses: UserResponse[];
  isShowing: boolean;
  inMetrics?: boolean;
  chunk: QuestionChunk;
}

export default function QuestionACSubpage({
  userResponses,
  isShowing,
  inMetrics,
  chunk,
}: QuestionACSubpageProps) {
  const chunkResponses = userResponses?.find(({ questionId }) => {
    return questionId === "Academics";
  });
  const chunkExists = chunkResponses?.response[chunk.name]?.semesterQuestions;
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currACIndex, setCurrACIndex] = useState(
    chunkExists
      ? userResponses?.find(({ questionId }) => {
          return questionId === "Academics";
        })?.response[chunk.name].semesterQuestions.length
      : 0
  );
  const session = useSession();
  // const getAcademics = (chunkResponses) => {
  //   let academics = chunkResponses.map((responses) => {
  //     const semesterGPA = parseInt(
  //       responses.find(
  //         ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d8"
  //       ).response
  //     );
  //     const semesterClasses = parseInt(
  //       responses.find(
  //         ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d7"
  //       ).response
  //     );
  //     let initialObj = {
  //       points: 0,
  //       tier: 0,
  //     };
  //     return initialObj;
  //   });
  //   const overallTier = calculateACActivityTier(
  //     , ,
  //   )
  //   return {
  //     activities: academics,
  //     overallTier: Math.round(overallPoints / 150),
  //     totalPoints: overallPoints,
  //   };
  // };
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ACEditor
      index={currACIndex}
      isEditing={isEditing}
      onAbort={() => {
        setIsAdding(false);
        setIsEditing(false);
      }}
      onSave={async (newAnswers) => {
        const ACResponse = userResponses?.find(({ questionId }) => {
          return questionId === "Academics";
        });
        if (ACResponse === undefined) {
          userResponses.push({
            questionId: "Academics",
            response: {
              [chunk.name]: { semesterQuestions: [], generalQuestions: [] },
            },
          });
        }
        if (ACResponse?.response[chunk.name] === undefined) {
          ACResponse.response[chunk.name].semesterQuestions = [];
        }
        ACResponse.response[chunk.name].semesterQuestions[currACIndex] =
          newAnswers;
        fetch(`/api/put-question-responses`, {
          method: "POST",
          body: JSON.stringify({
            responses: userResponses,
            userId: session.data.user.uid,
          }),
        });
        // let academics = null;
        // try {
        //   academics = await (
        //     await fetch(`/api/get-academics`, {
        //       method: "POST",
        //       body: JSON.stringify({ userId: session.data.user.uid }),
        //     })
        //   )?.json();
        // } catch (e) {
        //   academics = null;
        // }
        // console.log(academics);
        // fetch(`/api/put-academics`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     userId: academics ? session.data.user.uid : null,
        //     academics: getAcademics(ACResponse.response[chunk.name]),
        //   }),
        // });
        store.dispatch(updateQuestionResponsesAction(userResponses));
        if (isAdding) {
          setCurrACIndex((currACIndex) => currACIndex + 1);
        }
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponse={
        chunkExists &&
        userResponses.find(({ questionId }) => {
          return questionId === "Academics";
        }).response[chunk.name].semesterQuestions[currACIndex]
          ? userResponses.find(({ questionId }) => {
              return questionId === "Academics";
            }).response[chunk.name].semesterQuestions[currACIndex]
          : []
      }
    />
  ) : (
    <div className="container-fluid h-100 d-flex flex-column">
      {inMetrics ? null : (
        <QuestionSubPageHeader
          isExtracurricular
          onAddNew={() => {
            setIsAdding(true);
          }}
          title={chunk.name}
          percentage={undefined}
        />
      )}
      <div
        className="d-flex flex-column justify-content-evenly align-self-center"
        style={{ width: "91%" }}
      >
        {chunkExists
          ? userResponses
              .find(({ questionId }) => {
                return questionId === "Academics";
              })
              .response[chunk.name].semesterQuestions.map((response, index) => {
                return (
                  <ACQuestionSummaryCard
                    response={response}
                    chunkQuestions={chunk.questions.filter(
                      ({ _id }) => _id === "627950c272f6d134f0b63665"
                    )}
                    onClick={() => {
                      setCurrACIndex(index);
                      setIsEditing(true);
                    }}
                  />
                );
              })
          : []}
        {chunk.questions.map((question) =>
          question._id === "627950c272f6d134f0b63665" ? null : (
            <QuestionSummaryCard
              userTags={[]}
              isAC
              onUpdate={() => {}}
              question={question}
              allAnswers={userResponses}
              userAnswers={
                chunkResponses?.response[chunk.name]?.generalQuestions
              }
            />
          )
        )}
      </div>
    </div>
  );
}
