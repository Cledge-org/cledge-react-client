import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import styles from "./subpage-header.module.scss";
interface SubPageHeaderProps {
  title: string;
  percentage: number;
  subText?: string | JSX.Element;
  isExtracurricular?: boolean;
  onAddNew?: Function;
  isMetrics?: boolean;
}
export default function SubPageHeader({
  title,
  percentage,
  subText,
  isExtracurricular,
  onAddNew,
  isMetrics,
}: SubPageHeaderProps) {
  return (
    <div
      className={`d-flex flex-row justify-content-${
        isMetrics ? "start" : "between px-3"
      } align-items-center mx-5`}
      style={{ height: "15%" }}
    >
      <div className={styles.questionSubpageTitle}>
        {title}
        <div className={styles.subText}>{subText}</div>
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
