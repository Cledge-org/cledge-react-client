import React, { useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

interface QuestionSummarySubpageProps {
  listTitle: string;
  chunks: QuestionChunk[];
  isShowing: boolean;
  userAnswers: UserProgress;
  percentComplete: number;
}

export default function QuestionSummarySubpage({
  listTitle,
  chunks,
  isShowing,
  userAnswers,
  percentComplete,
}: QuestionSummarySubpageProps) {
  if (!isShowing) {
    return null;
  }
  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <QuestionSubPageHeader title={listTitle} percentage={percentComplete} />
      {chunks.map((chunk) => (
        <div
          className="d-flex flex-column justify-content-evenly align-self-center"
          style={{ width: "91%" }}
        >
          <span className="pt-3 cl-dark-text fw-bold">{chunk.name}</span>
          {chunk.questions.map((question) => (
            <QuestionSummaryCard
              question={question}
              userAnswer={
                userAnswers.responses.find((response) => {
                  return response.questionId === question.id;
                }).response
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
