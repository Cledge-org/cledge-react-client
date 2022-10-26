import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { updateQuestionResponsesAction } from "../../../../../utils/redux/actionFunctions";
import { store } from "../../../../../utils/redux/store";
import {
  calculateACActivityTier,
  calculateGPATier,
  getAllClassesFormatted,
  calculateClassTiers,
} from "../../../../../utils/student-metrics/metricsCalculations";
import ACEditor from "../../QuestionComponents/ECEditor/ECEditor";
import ACQuestionSummaryCard from "../../QuestionComponents/ECQuestionSummaryCard/ECQuestionSummaryCard";
import QuestionSubPageHeader from "../../../../../common/components/SubpageHeader/SubpageHeader";
import QuestionSummaryCard from "../../QuestionComponents/QuestionSummaryCard/QuestionSummaryCard";
import {
  callPutAcademics,
  callPutActivities,
  callPutQuestionResponses,
} from "src/utils/apiCalls";
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

    return {
      classes: everyClassTier,
      overallClassTier: classTiers,
      gpa,
      gpaTier,
      satScore: parseInt(
        chunkResponses.generalQuestions.find(
          ({ questionId }) => questionId == "627a7bff145665a4e88ace07"
        )?.response
      ),
      actScore: parseInt(
        chunkResponses.generalQuestions.find(
          ({ questionId }) => questionId == "627a7bff145665a4e88ace08"
        )?.response
      ),
      overallTier: overallTier,
      classTip: "",
      gpaTip: "",
      testTip: "",
    };
  };
  if (!isShowing) {
    return null;
  }
  return isAdding || isEditing ? (
    <ACEditor
      index={currACIndex}
      editText="Editing Courses"
      addingText="Adding Courses"
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
        callPutQuestionResponses(userResponses);
        let academics = null;
        try {
          academics = await (
            await fetch(`/api/metrics/get-academics`, {
              method: "POST",
              body: JSON.stringify({ userId: session.data.user.uid }),
            })
          )?.json();
        } catch (e) {
          academics = null;
        }
        //console.log(academics);
        callPutAcademics(getAcademics(ACResponse.response[chunk.name]));
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
                    altText="Courses"
                    response={response}
                    chunkQuestions={chunk.questions.filter(
                      ({ _id }) => _id.toString() === "627950c272f6d134f0b63665"
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
          question._id.toString() === "627950c272f6d134f0b63665" ? null : (
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