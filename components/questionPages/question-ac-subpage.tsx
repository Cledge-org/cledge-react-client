import React, { useState } from "react";
import ACQuestionSummaryCard from "../../components/question_components/ec_question_summary_card";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ACEditor from "../../components/question_components/ec-editor";
import { useSession } from "next-auth/react";
import { store } from "../../utils/store";
import { updateQuestionResponsesAction } from "../../utils/actionFunctions";
import {
  calculateACActivityTier,
  calculateClassTiers,
  calculateGPATier,
  getAllClassesFormatted,
} from "../../utils/metricsCalculations";

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
  const getAcademics = (chunkResponses): Academics => {
    let classTypes = chunkResponses.semesterQuestions.reduce(
      (prevResponses, responses) => {
        const semesterCourses = responses.find(
          ({ questionId }) => questionId === "627950c272f6d134f0b63665"
        ).response.questionsResponses;
        const courseNumTypes = semesterCourses;
        return prevResponses.concat(courseNumTypes);
      },
      []
    );
    let applicantLevel = userResponses.find(
      ({ questionId }) => questionId == "627e8fe7e97c3c14537dc7f5"
    )?.response;
    if (!applicantLevel) {
      applicantLevel = "Average";
    }
    const gpa = parseFloat(
      chunkResponses.generalQuestions.find(
        ({ questionId }) => questionId === "62435e6620b74f4eb00ac8f5"
      ).response
    );
    if (!gpa) {
      return null;
    }
    const applicantLevelNum =
      applicantLevel === "Competitive"
        ? 2
        : applicantLevel === "Average"
        ? 1
        : 0;
    const gpaTier = calculateGPATier(applicantLevelNum, gpa);
    const everyClassTier = getAllClassesFormatted(classTypes);
    const classTiers = calculateClassTiers(
      classTypes.map(({ courseLevel }) => courseLevel)
    );
    const overallTier = calculateACActivityTier(
      applicantLevelNum,
      gpa,
      classTypes
    );
    //!IMPORTANT
    //TODO: Figure out how to id this asap
    return {
      _id: "FIGURE THIS OUT",
      classes: everyClassTier,
      overallClassTier: classTiers,
      gpa,
      gpaTier,
      satScore: parseInt(
        userResponses.find(
          ({ questionId }) => questionId == "627a7bff145665a4e88ace07"
        )?.response
      ),
      actScore: parseInt(
        userResponses.find(
          ({ questionId }) => questionId == "627a7bff145665a4e88ace08"
        )?.response
      ),
      overallTier: overallTier,
    };
  };
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
        let academics = null;
        try {
          academics = await (
            await fetch(`/api/get-academics`, {
              method: "POST",
              body: JSON.stringify({ userId: session.data.user.uid }),
            })
          )?.json();
        } catch (e) {
          academics = null;
        }
        console.log(academics);
        fetch(`/api/put-academics`, {
          method: "POST",
          body: JSON.stringify({
            userId: academics ? session.data.user.uid : null,
            academics: getAcademics(ACResponse.response[chunk.name]),
          }),
        });
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
