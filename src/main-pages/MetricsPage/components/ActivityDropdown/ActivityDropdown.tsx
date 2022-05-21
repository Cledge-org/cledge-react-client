import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";
import TierIndicatorAndTips from "../TierIndicatorAndTips/TierIndicatorAndTips";
import styles from "./activity-dropdown.module.scss";

const ActivityDropdown = ({
  title,
  tier,
  content,
  customContent,
}: {
  title: string;
  tier: number;
  content: string;
  customContent?: ReactElement;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="dropdown-container mt-2" style={{ width: "100%" }}>
      <button
        className={`dropdown-btn ${styles.metricsDropdownBtn} bg-cl-super-light-gray`}
        // style={{ backgroundColor: "#FBFCFF" }}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="text">{title}</div>
        <div
          className={
            isExpanded ? "center-child icon-open" : "center-child icon-close"
          }
          style={{
            width: "12px",
            height: "12px",
          }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      <div
        className={classNames(
          {
            [styles.metricsDropdownMenuExpanded]: isExpanded,
            [styles.metricsDropdownMenuClosed]: !isExpanded,
          },
          "pt-2 px-2 flex-column align-items-center justify-content-start mb-3 pb-3"
        )}
        style={{
          borderTop: "none",
        }}
      >
        <div className="py-3 mb-5" style={{ fontSize: "1.2em" }}>
          {content}
        </div>
        <div className="d-flex flex-row align-items-start justify-content-between w-100">
          {customContent ?? <TierIndicatorAndTips tier={tier} />}
        </div>
      </div>
    </div>
  );
};
export default ActivityDropdown;