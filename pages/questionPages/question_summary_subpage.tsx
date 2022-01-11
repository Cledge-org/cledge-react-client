import React, { useEffect, useRef, useState } from "react";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

interface QuestionSummarySubpageProps {
  listTitle: string;
  chunks: QuestionChunk[];
  isShowing: boolean;
  userAnswers: UserProgress;
  percentComplete: number;
  onPercentageUpdate: Function;
  viaChunk: string;
  userTags: string[];
}

export default function QuestionSummarySubpage({
  listTitle,
  chunks,
  isShowing,
  userAnswers,
  percentComplete,
  onPercentageUpdate,
  viaChunk,
  userTags,
}: QuestionSummarySubpageProps) {
  const viaChunkRef = useRef(null);
  useEffect(() => {
    if (viaChunkRef.current && isShowing) {
      document.body.scrollTo({
        top:
          viaChunkRef.current.getBoundingClientRect().y +
          window.pageYOffset -
          60,
        behavior: "smooth",
      });
    }
  }, [isShowing, viaChunk, viaChunkRef]);
  console.log(chunks);
  if (!isShowing) {
    return null;
  }
  return (
    <div
      className="container-fluid h-100 d-flex flex-column"
      // style={{ overflowY: "auto" }}
    >
      <QuestionSubPageHeader title={listTitle} percentage={percentComplete} />
      {chunks.map((chunk) => (
        <div
          id={`chunk-name-${chunk.name}`}
          ref={viaChunk === chunk.name ? viaChunkRef : null}
          className="d-flex flex-column justify-content-evenly align-self-center"
          style={{ width: "91%" }}
        >
          <span className="pt-3 cl-dark-text fw-bold">{chunk.name}</span>
          {chunk.questions.map((question) => (
            <QuestionSummaryCard
              userTags={userTags}
              onUpdate={onPercentageUpdate}
              question={question}
              userAnswers={userAnswers.responses}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
