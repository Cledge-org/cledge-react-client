import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FAQDropdown = ({
  title,
  content,
}: {
  title: string;
  content: string | React.ReactElement;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="dropdown-container mt-2">
      <button
        className="dropdown-btn cl-btn-gray"
        style={{ borderTop: "none" }}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="text">{title}</div>
        <div
          className={
            isExpanded ? "center-child icon-open" : "center-child icon-close"
          }
          style={{ width: "12px", height: "12px" }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      <div
        className={`dropdown-menu-${
          isExpanded ? "expanded" : "closed"
        } ms-1 mt-2`}
        style={{ backgroundColor: "white" }}
      >
        {content}
      </div>
    </div>
  );
};
export default FAQDropdown;
