import {
  faSortDown,
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
}: {
  chunkList: Array<any>;
  title: string;
  isAll?: boolean;
  percentComplete: number;
  onClick: Function;
  isExtracurricular?: boolean;
  isPathway?: boolean;
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
            <FontAwesomeIcon icon={faSortDown} />
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
        {chunkList.map((chunkTitle: string) => (
          <button
            onClick={() => {
              if (isExtracurricular || isPathway) {
                onClick(chunkTitle);
                return;
              }
              onClick();
            }}
            className={
              currSelectedPath === title + chunkTitle
                ? "progress-dropdown-menu-btn-selected"
                : "progress-dropdown-menu-btn"
            }
          >
            <div
              className="center-child icon"
              style={{ width: "36px", height: "36px" }}
            >
              <FontAwesomeIcon icon={isPathway ? faVideo : faFileAlt} />
            </div>
            <div className="text">{chunkTitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
