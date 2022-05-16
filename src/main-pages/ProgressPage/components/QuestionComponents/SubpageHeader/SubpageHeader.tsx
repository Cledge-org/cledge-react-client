import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface QuestionSubPageHeaderProps {
  title: string;
  percentage: number;
  subText?: string | JSX.Element;
  isExtracurricular?: boolean;
  onAddNew?: Function;
  isMetrics?: boolean;
}
export default function QuestionSubPageHeader({
  title,
  percentage,
  subText,
  isExtracurricular,
  onAddNew,
  isMetrics,
}: QuestionSubPageHeaderProps) {
  return (
    <div
      className={`d-flex flex-row justify-content-${
        isMetrics ? "start" : "between px-3"
      } align-items-center mx-5`}
      style={{ height: "15%" }}
    >
      <div className="question-subpage-title">
        {title}
        <div className="sub-text">{subText}</div>
      </div>
      {isExtracurricular ? (
        <button
          onClick={() => onAddNew()}
          className="cl-btn-blue py-3"
          style={{ paddingLeft: "2.5vw", paddingRight: "2.5vw" }}
        >
          Add New
        </button>
      ) : isMetrics ? null : (
        <div style={{ width: "10vh" }}>
          <CircularProgressbarWithChildren
            strokeWidth={10}
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
      )}
    </div>
  );
}
