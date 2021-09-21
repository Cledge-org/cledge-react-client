import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
//profile progress/ question summary page
export default function Progress() {
  return (
    <div className="container-fluid vh-100 d-flex flex-row px-0">
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab />
        <DropDownTab />
      </div>
      <div className="d-flex" style={{ flex: 3 }}></div>
    </div>
  );
}

function DropDownTab() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="progress-dropdown-container">
      <button
        className="progress-dropdown-btn"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="text">
          Extracurriculars
          <span className="percentage">67%</span>
        </div>
        <div
          className={
            isExpanded ? "center-child icon-open" : "center-child icon"
          }
          style={{ width: "12px", height: "12px" }}
        >
          <FontAwesomeIcon icon={faSortDown} />
        </div>
      </button>
      <div
        className={
          isExpanded
            ? "progress-dropdown-menu-expanded"
            : "progress-dropdown-menu-closed"
        }
      >
        <button className="progress-dropdown-menu-btn">
          <div
            className="center-child icon"
            style={{ width: "36px", height: "36px" }}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </div>
          <div className="text">Academic Achievement</div>
        </button>
        <button className="progress-dropdown-menu-btn">
          <div
            className="center-child icon"
            style={{ width: "36px", height: "36px" }}
          >
            <FontAwesomeIcon icon={faFileAlt} />
          </div>
          <div className="text">Volunteer Experience</div>
        </button>
      </div>
    </div>
  );
}

Progress.requireAuth = false;
