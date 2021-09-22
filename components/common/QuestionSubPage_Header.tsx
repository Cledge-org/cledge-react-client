import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface QuestionSubPageHeaderProps {
  title: string;
  percentage: number;
  subText?: string;
}
export default function QuestionSubPageHeader({
  title,
  percentage,
  subText,
}: QuestionSubPageHeaderProps) {
  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center px-3"
      style={{ height: "15%" }}
    >
      <div className="question-subpage-title">
        {title}
        <div className="sub-text">{subText}</div>
      </div>
      <div style={{ width: "10vh" }}>
        <CircularProgressbarWithChildren
          children={
            <div
              style={{ fontWeight: "bold", fontSize: "1.3em" }}
            >{`${percentage}%`}</div>
          }
          className="center-child"
          styles={{
            text: {
              fontWeight: "bold",
            },
            trail: {
              stroke: "#d6d6d6",
            },
            path: {
              transition: "stroke-dashoffset 0.5s ease 0s",
              stroke: "#2651ed",
            },
          }}
          value={percentage}
        />
      </div>
    </div>
  );
}
