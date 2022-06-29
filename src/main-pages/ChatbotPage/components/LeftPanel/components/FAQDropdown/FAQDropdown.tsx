import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import styles from "./faq-dropdown.module.scss";
const FAQDropdown = ({
  title,
  content,
  staticOpen,
}: {
  staticOpen?: boolean;
  title: string | React.ReactElement;
  content: string | React.ReactElement;
}) => {
  const [isExpanded, setIsExpanded] = useState(staticOpen);
  return (
    <div
      className="dropdown-container mt-2"
      style={{ backgroundColor: "#FBFCFF" }}
    >
      <button
        className={classNames(styles.faqDropdownBtn, "py-3")}
        style={{
          borderTop: "none",
          backgroundColor: "#FBFCFF",
          borderBottom: "2px solid #E0DFE8",
          borderRadius: 0,
          paddingLeft: 0,
          paddingRight: 0,
          color: "black",
          fontSize: "1.1em",
          textAlign: "left",
          justifyContent: "space-between",
        }}
        onClick={() => {
          if (!staticOpen) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className={styles.text}>{title}</div>
        {!staticOpen && (
          <div
            className={classNames(
              "center-child",
              isExpanded ? styles.iconOpen : styles.iconClose
            )}
            style={{ width: "12px", height: "12px", marginRight: "5px" }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        )}
      </button>
      <div
        className={`dropdown-menu-${
          isExpanded ? "expanded" : "closed"
        } ms-1 mt-2`}
        style={{ backgroundColor: "#FBFCFF" }}
      >
        {content}
      </div>
    </div>
  );
};
export default FAQDropdown;
