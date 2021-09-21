import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { AppProps } from "next/dist/shared/lib/router/router";
import QuestionSummaryPage from "./questionPages/questionSummaryPage";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
//profile progress/ question summary page
export default function Progress() {
  const [currPage, setCurrPage] = useState("all");
  return (
    <div className="container-fluid vh-100 d-flex flex-row px-0">
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          title="All Sections"
          percentComplete={undefined}
        />
        <DropDownTab
          chunkList={["Academic Achievement", "Volunteer Experience"]}
          title="Extracurricular"
          percentComplete={67}
        />
        <DropDownTab
          chunkList={["Academic Achievement", "Volunteer Experience"]}
          title="Extracurricular"
          percentComplete={67}
        />
      </div>
      <div className="d-flex" style={{ flex: 3 }}>
        {currPage === "all" ? (
          <div className="container-fluid h-100">
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{ height: "15%" }}
            >
              <div>
                Profile Completion <br />
                <span>
                  Complete these sections to get the most relevant admissions
                  advice
                </span>
              </div>
              <div style={{ width: "10vh" }}>
                <CircularProgressbar
                  styles={buildStyles({
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#2651ed",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                  value={67}
                  text={"67%"}
                />
              </div>
            </div>
          </div>
        ) : (
          <QuestionSummaryPage />
        )}
      </div>
    </div>
  );
}

function DropDownTab({
  chunkList,
  title,
  percentComplete,
  isAll,
}: {
  chunkList: Array<any>;
  title: string;
  isAll?: boolean;
  percentComplete: number;
}) {
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
          {title}
          {isAll ? null : (
            <span className="percentage">{percentComplete}%</span>
          )}
        </div>
        {isAll ? null : (
          <div
            className={
              isExpanded ? "center-child icon-open" : "center-child icon"
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
          <button className="progress-dropdown-menu-btn">
            <div
              className="center-child icon"
              style={{ width: "36px", height: "36px" }}
            >
              <FontAwesomeIcon icon={faFileAlt} />
            </div>
            <div className="text">{chunkTitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

Progress.requireAuth = false;
