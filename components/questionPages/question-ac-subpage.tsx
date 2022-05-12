import React, { useState } from "react";
import ACQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ACEditor from "../../components/question_components/ec-editor";
import { useSession } from "next-auth/react";
import { store } from "../../utils/store";
import { updateQuestionResponsesAction } from "../../utils/actionFunctions";

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
  const chunkExists =
    userResponses?.find(({ questionId }) => {
      return questionId === "Academics";
    }) &&
    userResponses?.find(({ questionId }) => {
      return questionId === "Academics";
    })?.response[chunk.name];
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currACIndex, setCurrACIndex] = useState(
    chunkExists
      ? userResponses?.find(({ questionId }) => {
          return questionId === "Academics";
        })?.response[chunk.name].length
      : 0
  );
  const session = useSession();
  // const getAcademics = (chunkResponses): Activities => {
  //   let academics = chunkResponses.map((responses) => {
  //     const hoursPerWeek = parseInt(
  //       responses.find(
  //         ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d8"
  //       ).response
  //     );
  //     const weeksPerYear = parseInt(
  //       responses.find(
  //         ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d7"
  //       ).response
  //     );
  //     let initialObj = {
  //       activityID: "???",
  //       actType: responses.find(
  //         ({ questionId }) => questionId === "61c6b6f2d3054b6dd0f1fc4d"
  //       ).response,
  //       hoursYear: hoursPerWeek * weeksPerYear,
  //       yearsSpent: responses.find(
  //         ({ questionId }) => questionId === "62546c01f993412f5c26c772"
  //       ).response,
  //       recogLevel: responses.find(
  //         ({ questionId }) => questionId === "623e0e025e2b2cf43e1b86e1"
  //       ).response,
  //       description: responses.find(
  //         ({ questionId }) => questionId === "623dfe865e2b2cf43e1b86d6"
  //       ).response,
  //       points: 0,
  //       tier: 0,
  //     };
  //     initialObj.tier = calculateActivityTier(
  //       hoursPerWeek,
  //       weeksPerYear,
  //       initialObj.yearsSpent,
  //       initialObj.recogLevel
  //     );
  //     initialObj.points = calculateActivityPoints(initialObj.tier);
  //     return initialObj;
  //   });
  //   const overallPoints = calculateTotalPoints(
  //     academics.map(({ tier }) => tier)
  //   );
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
              [chunk.name]: [],
            },
          });
        }
        if (ACResponse?.response[chunk.name] === undefined) {
          ACResponse.response[chunk.name] = [];
        }
        ACResponse.response[chunk.name][currACIndex] = newAnswers;
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
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponse={
        chunkExists &&
        userResponses.find(({ questionId }) => {
          return questionId === "Academics";
        }).response[chunk.name][currACIndex]
          ? userResponses.find(({ questionId }) => {
              return questionId === "Academics";
            }).response[chunk.name][currACIndex]
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
              .response[chunk.name].map((response, index) => {
                return (
                  <ACQuestionSummaryCard
                    response={response}
                    chunkQuestions={chunk.questions}
                    onClick={() => {
                      setCurrACIndex(index);
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
