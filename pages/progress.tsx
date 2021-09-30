import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { AppProps } from "next/dist/shared/lib/router/router";
import QuestionSummaryPage from "./questionPages/question_summary_subpage";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import TabButton from "../components/common/TabButton";
import CardText from "../components/common/Card_Text";
import CardCheckIn from "../components/common/Card_CheckIn";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import QuestionECSubpage from "./questionPages/question_ec_subpage";
//profile progress/ question summary page
export default function Progress() {
  const [currPage, setCurrPage] = useState("all");
  const [currAllSectionTab, setCurrAllSectionTab] = useState("upcoming");
  return (
    <div className="container-fluid vh-100 d-flex flex-row px-0">
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={() => setCurrPage("all")}
          title="All Sections"
          percentComplete={undefined}
        />
        <DropDownTab
          chunkList={["Academic Achievement", "Volunteer Experience"]}
          onClick={() => setCurrPage("test")}
          title="Extracurricular"
          percentComplete={67}
        />
        <DropDownTab
          chunkList={["Academic Achievement", "Volunteer Experience"]}
          onClick={() => setCurrPage("extracurricular")}
          title="Extracurricular"
          percentComplete={67}
        />
      </div>
      <div className="d-flex" style={{ flex: 3 }}>
        {currPage === "all" ? (
          <div className="container-fluid h-100">
            <QuestionSubPageHeader
              title="Profile Completion"
              percentage={67}
              subText="This is just a placeholder"
            />
            <ul className="nav" role="tablist">
              <TabButton
                currTab={currAllSectionTab}
                onClick={setCurrAllSectionTab.bind(this)}
                title={"Upcoming"}
              />
              <TabButton
                currTab={currAllSectionTab}
                onClick={setCurrAllSectionTab.bind(this)}
                title={"Finished"}
              />
            </ul>
            <div className="tab-content">
              <div
                className={
                  currAllSectionTab === "upcoming"
                    ? "resources-tab-pane resources-active"
                    : "resources-tab-pane"
                }
                id="resources"
              >
                <CardCheckIn
                  url={undefined}
                  title="Junior Developers"
                  textGradient="light"
                  snippet={""}
                />
                <CardCheckIn
                  url={undefined}
                  title="Junior Developers"
                  textGradient="light"
                  snippet={""}
                />
              </div>
            </div>
          </div>
        ) : currPage === "test" ? (
          <QuestionSummaryPage />
        ) : (
          <QuestionECSubpage />
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
  onClick,
}: {
  chunkList: Array<any>;
  title: string;
  isAll?: boolean;
  percentComplete: number;
  onClick: Function;
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
          <button
            onClick={() => {
              onClick();
            }}
            className="progress-dropdown-menu-btn"
          >
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
