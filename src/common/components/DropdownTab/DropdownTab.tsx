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
import { purple } from "@mui/material/colors";

export default function DropdownTab({
  chunkList,
  title,
  percentComplete,
  isAll,
  onClick,
  isECAC,
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
  isECAC?: boolean;
  isPathway?: boolean;
  isFinishedContent?: boolean[];
  isFinishedModule?: boolean;
  currSelectedPath?: string;
  icons?: IconProp[];
}) {
  const [isExpanded, setIsExpanded] = useState(true);
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
        style={{ border: "0px", fontWeight: "bold"}}
        onClick={() => {
          if (isAll) {
            onClick();
          }
          setIsExpanded(!isExpanded);
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h6 className="cl-dark-text">{title}</h6>
          {isAll || isPathway || isECAC ? null : (
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
            <div className="center-child icon me-3" style={{ alignSelf: "start", paddingTop: "3px"  }}>
              <ShownIcon
                className={`${
                  isPathway
                    ? isFinishedModule || isFinishedContent[index]
                      ? "cl-blue"
                      : "cl-dark-text"
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
                  icons && icons[index]
                    ? isFinishedModule || isFinishedContent[index]
                      ? "check"
                      : icons[index]
                    : "normal"
                }
              />
            </div>
            <div className="cl-dark-text" style={{ textAlign: "left", maxWidth: "75%" }}>
              <text>
                {isPathway ? chunkTitle.name : chunkTitle}
              </text>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
