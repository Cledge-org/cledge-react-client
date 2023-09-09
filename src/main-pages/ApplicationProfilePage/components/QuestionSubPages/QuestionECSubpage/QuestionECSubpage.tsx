import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  callPutActivities,
  callPutQuestionResponses,
} from "src/utils/apiCalls";
import { updateQuestionResponsesAction } from "../../../../../utils/redux/actionFunctions";
import { store } from "../../../../../utils/redux/store";
import {
  calculateECActivityPoints,
  calculateECActivityTier,
  calculateECTotalPoints,
} from "../../../../../utils/student-metrics/metricsCalculations";
import ECEditor from "../../QuestionComponents/ECEditor/ECEditor";
import ECQuestionSummaryCard from "../../QuestionComponents/ECQuestionSummaryCard/ECQuestionSummaryCard";
import QuestionSubPageHeader from "../../../../../common/components/SubpageHeader/SubpageHeader";

interface QuestionECSubpageProps {
  userResponses: UserResponse[];
  isShowing: boolean;
  inMetrics?: boolean;
  chunk: QuestionChunk;
}

export default function QuestionECSubpage({
  userResponses,
  isShowing,
  inMetrics,
  chunk,
}: QuestionECSubpageProps) {
  const chunkExists =
    userResponses?.find(({ questionId }) => {
      return questionId === "Extracurriculars";
    }) &&
    userResponses?.find(({ questionId }) => {
      return questionId === "Extracurriculars";
    })?.response[chunk.name];
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currECIndex, setCurrECIndex] = useState(
    chunkExists
      ? userResponses?.find(({ questionId }) => {
          return questionId === "Extracurriculars";
        })?.response[chunk.name].length
      : 0
  );
  const session = useSession();
  const getActivities = (chunkResponses): Activities => {
    let activities = chunkResponses.map((responses, index) => {
      const hoursPerWeek = parseInt(
        responses.find(
          ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d8"
        ).response
      );
      const weeksPerYear = parseInt(
        responses.find(
          ({ questionId }) => questionId === "623dfe875e2b2cf43e1b86d7"
        ).response
      );
      let initialObj = {
        activityID: index,
        actTitle: responses.find(
          ({ questionId }) => questionId === "623e07e15e2b2cf43e1b86de"
        ).response,
        actType: responses.find(
          ({ questionId }) => questionId === "61c6b6f2d3054b6dd0f1fc4d"
        ).response,
        hoursYear: hoursPerWeek * weeksPerYear,
        yearsSpent: responses.find(
          ({ questionId }) => questionId === "62546c01f993412f5c26c772"
        ).response,
        recogLevel: responses.find(
          ({ questionId }) => questionId === "623e0e025e2b2cf43e1b86e1"
        ).response,
        description: responses.find(
          ({ questionId }) => questionId === "623dfe865e2b2cf43e1b86d6"
        ).response,
        points: 0,
        tier: 0,
      };
      initialObj.tier = calculateECActivityTier(
        hoursPerWeek,
        weeksPerYear,
        initialObj.yearsSpent,
        initialObj.recogLevel
      );
      initialObj.points = calculateECActivityPoints(initialObj.tier);
      return initialObj;
    });
    const overallPoints = calculateECTotalPoints(
      activities.map(({ tier }) => tier)
    );
    return {
      activities,
      overallTier: Math.round(overallPoints / 150),
      totalPoints: overallPoints,
    };
  };
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
        let ECResponse = userResponses?.find(({ questionId }) => {
          return questionId === "Extracurriculars";
        });
        if (ECResponse === undefined) {
          userResponses.push({
            questionId: "Extracurriculars",
            response: {
              [chunk.name]: [],
            },
          });
          ECResponse = userResponses?.find(({ questionId }) => {
            return questionId === "Extracurriculars";
          });
        }
        if (ECResponse?.response[chunk.name] === undefined) {
          ECResponse.response[chunk.name] = [];
        }
        ECResponse.response[chunk.name][currECIndex] = newAnswers;
        callPutQuestionResponses(userResponses);
        let activities = null;
        try {
          activities = await (
            await fetch(`/api/metrics/get-activities`, {
              method: "POST",
              body: JSON.stringify({ userId: session.data.user.uid }),
            })
          )?.json();
        } catch (e) {
          activities = null;
        }
        callPutActivities(
          getActivities(ECResponse.response[chunk.name]),
          activities
        );
        store.dispatch(updateQuestionResponsesAction(userResponses));
        setIsAdding(false);
        setIsEditing(false);
      }}
      chunkQuestions={chunk.questions}
      userResponse={
        chunkExists &&
        userResponses.find(({ questionId }) => {
          return questionId === "Extracurriculars";
        }).response[chunk.name][currECIndex]
          ? userResponses.find(({ questionId }) => {
              return questionId === "Extracurriculars";
            }).response[chunk.name][currECIndex]
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
                return questionId === "Extracurriculars";
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
