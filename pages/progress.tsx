import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSortDown } from "@fortawesome/free-solid-svg-icons";

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
        <div>Extracurriculars</div>
        <FontAwesomeIcon icon={faSortDown} color="#000000" size="xs" />
      </button>
      <div
        className={
          isExpanded
            ? "progress-dropdown-menu-expanded"
            : "progress-dropdown-menu-closed"
        }
      >
        <button className="progress-dropdown-menu-btn">Hello</button>
        <button className="progress-dropdown-menu-btn">Hello 2</button>
      </div>
    </div>
  );
}

Progress.requireAuth = false;
