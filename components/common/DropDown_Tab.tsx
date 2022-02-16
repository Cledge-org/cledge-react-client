import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faFileAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function DropDownTab({
  chunkList,
  title,
  percentComplete,
  isAll,
  onClick,
  isExtracurricular,
  isPathway,
  currSelectedPath,
  isFinishedModule,
  isFinishedContent,
}: {
  chunkList: Array<any>;
  title: string;
  isAll?: boolean;
  percentComplete: number;
  onClick: Function;
  isExtracurricular?: boolean;
  isPathway?: boolean;
  isFinishedContent?: boolean[];
  isFinishedModule?: boolean;
  currSelectedPath?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="progress-dropdown-container">
      <button
        className="progress-dropdown-btn"
        onClick={() => {
          if (isAll) {
            onClick();
          }
          setIsExpanded(!isExpanded);
        }}
        style={isFinishedModule ? { borderBottomColor: "#2651ed" } : {}}
      >
        <div className="text">
          {title}
          {isAll || isPathway ? null : (
            <span className="percentage">{percentComplete}%</span>
          )}
        </div>
        {isAll ? null : (
          <div
            className={
              isExpanded ? "center-child icon-open" : "center-child icon-close"
            }
            style={{ width: "12px", height: "12px" }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        )}
      </button>
      <div
        className={
          isExpanded
            ? "progress-dropdown-menu-expanded"
            : "progress-dropdown-menu-closed"
        }
      >
        {chunkList.map((chunkTitle, index) => (
          <button
            onClick={() => {
              // if (isExtracurricular || isPathway) {
              //   onClick(chunkTitle);
              //   return;
              // }
              onClick(isPathway ? chunkTitle.name : chunkTitle);
            }}
            className={
              currSelectedPath ===
              title + (isPathway ? chunkTitle.name : chunkTitle)
                ? "progress-dropdown-menu-btn-selected"
                : "progress-dropdown-menu-btn"
            }
          >
            <div
              className="center-child icon"
              style={{ width: `36px`, height: `36px` }}
            >
              <FontAwesomeIcon
                className={`${
                  isPathway
                    ? isFinishedModule || isFinishedContent[index]
                      ? "cl-blue"
                      : ""
                    : ""
                }`}
                style={
                  isPathway
                    ? isFinishedModule || isFinishedContent[index]
                      ? { fontSize: "1.3em" }
                      : {}
                    : {}
                }
                icon={
                  isPathway
                    ? isFinishedModule || isFinishedContent[index]
                      ? faCheckCircle
                      : chunkTitle.type.toLowerCase() === "article"
                      ? faFileAlt
                      : faVideo
                    : faFileAlt
                }
              />
            </div>
            <div className="text">
              {isPathway ? chunkTitle.name : chunkTitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
