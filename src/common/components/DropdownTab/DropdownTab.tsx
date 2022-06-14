import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faFileAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { RiFileTextFill } from "react-icons/ri";
import styles from "./dropdown-tab.module.scss";

export default function DropdownTab({
  chunkList,
  title,
  percentComplete,
  isAll,
  onClick,
  isExtracurricular,
  icons,
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
  icons?: IconProp[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ShownIcon = ({ className, style, icon }) => {
    return icon === "video" ? (
      <AiOutlineYoutube className={className} style={style} />
    ) : icon === "check" ? (
      <FaCheckCircle className={className} style={style} />
    ) : icon === "question" ? (
      <BsPencilSquare className={className} style={style} />
    ) : icon === "text" ? (
      <FaBookOpen className={className} style={style} />
    ) : (
      <RiFileTextFill className={className} style={style} />
    );
  };
  return (
    <div className="dropdown-container">
      <button
        className="dropdown-btn"
        onClick={() => {
          if (isAll) {
            onClick();
          }
          setIsExpanded(!isExpanded);
        }}
        style={isFinishedModule ? { borderTopColor: "#2651ed" } : {}}
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
          isExpanded ? "dropdown-menu-expanded" : "dropdown-menu-closed"
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
                ? "dropdown-menu-btn-selected"
                : "dropdown-menu-btn"
            }
            key={index.toString()}
          >
            <div className="center-child icon">
              <ShownIcon
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
                  icons[index]
                    ? isFinishedModule || isFinishedContent[index]
                      ? "check"
                      : icons[index]
                    : "normal"
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
