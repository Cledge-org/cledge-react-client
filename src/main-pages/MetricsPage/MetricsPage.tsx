import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faArrowRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { AppProps } from "next/dist/shared/lib/router/router";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../AppPage/AppPage";
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import DropdownTab from "../../common/components/DropdownTab/DropdownTab";

import QuestionSubPageHeader from "../../common/components/SubpageHeader/SubpageHeader";
import ActivityDropdown from "./components/ActivityDropdown/ActivityDropdown";
import SubTitle from "./components/SubTitle/SubTitle";
import TierIndicatorAndTips from "./components/TierIndicatorAndTips/TierIndicatorAndTips";
import TierRange from "./components/TierRange/TierRange";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

const Metrics: NextApplicationPage<{
  activities: Activities;
  userTags: string[];
  questionResponses: UserResponse[];
  academics: Academics;
}> = ({ activities, userTags, questionResponses, academics }) => {
  const session = useSession();
  //console.log(activities);
  const [currPage, setCurrPage] = useState("all");
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
          <DropdownTab
            isAll
            chunkList={[]}
            onClick={() => setCurrPage("all")}
            title="Metrics Overview"
            percentComplete={undefined}
          />
          {/* {questionData.map((list, index) => {
          if (list.name === "Extracurriculars" || list.name === "Academics") {
            return (
              <DropdownTab
                isExtracurricular={list.name === "Extracurriculars"}
                chunkList={list.chunks.map((chunk) => chunk.name)}
                onClick={(chunk) => setCurrPage(list.name)}
                title={list.name}
                percentComplete={percentageData.lists[index]}
              />
            );
          }
        })} */}
          <DropdownTab
            isAll
            chunkList={[]}
            onClick={(chunk) => setCurrPage("Extracurriculars")}
            title={"Extracurricular Metrics"}
            percentComplete={undefined}
          />
          <DropdownTab
            isAll
            chunkList={[]}
            onClick={(chunk) => setCurrPage("Academics")}
            title={"Academics Metrics"}
            percentComplete={undefined}
          />
        </div>
        <div
          className="d-flex"
          style={{
            flex: 3,
          }}
        >
          {currPage === "all" ? (
            <div
              className="container-fluid d-flex flex-column"
              style={{ flex: 1 }}
            >
              <QuestionSubPageHeader
                title="My Application Metrics"
                percentage={undefined}
                isMetrics
                subText=""
              />
              <div className="tab-content h-100">
                <div className="mt-2 ms-5" style={{ width: "50%" }}>
                  <div className="soft-gray-border d-flex flex-row justify-content-start py-3 px-3">
                    <strong
                      className="cl-dark-text"
                      style={{ fontSize: "1.3em" }}
                    >
                      Extracurriculars Metrics
                    </strong>
                  </div>
                  <div
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center mb-3 w-100`}
                    style={{
                      backgroundColor: "white",
                      borderTop: "none",
                      height: "20vh",
                    }}
                  >
                    <TierRange
                      tier={activities?.overallTier}
                      isOverall
                      isOverview
                    />
                  </div>
                </div>
                <div className="mt-2 ms-5" style={{ width: "50%" }}>
                  <div className="soft-gray-border d-flex flex-row justify-content-start py-3 px-3">
                    <strong
                      className="cl-dark-text"
                      style={{ fontSize: "1.3em" }}
                    >
                      Academics Metrics
                    </strong>
                  </div>
                  <div
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center mb-3 w-100`}
                    style={{
                      backgroundColor: "white",
                      borderTop: "none",
                      height: "20vh",
                    }}
                  >
                    <TierRange
                      tier={academics?.overallTier}
                      isOverall
                      isOverview
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : currPage === "Extracurriculars" ? (
            <div
              className="container-fluid d-flex flex-column"
              style={{ flex: 1 }}
            >
              <QuestionSubPageHeader
                title="Extracurriculars Completion"
                percentage={undefined}
                isMetrics
                subText=""
              />
              <div className="tab-content h-100 mx-5">
                <div
                  style={{ borderBottom: "1px solid #BBBBC0" }}
                  className="pb-5"
                >
                  <SubTitle title="Overall Tier" isDivider />
                  <div className="d-flex flex-column">
                    <TierIndicatorAndTips
                      tier={activities?.overallTier}
                      isOverall
                    />
                  </div>
                </div>
                <SubTitle title="Individual Activities" />
                {activities?.activities?.map((activity) => {
                  return (
                    <ActivityDropdown
                      title={"TBD"}
                      content={activity.description}
                      tier={activity.tier}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              className="container-fluid d-flex flex-column"
              style={{ flex: 1 }}
            >
              <QuestionSubPageHeader
                title="Acamdemics Metrics"
                percentage={undefined}
                isMetrics
                subText=""
              />
              <div className="tab-content h-100 mx-5">
                <div
                  style={{ borderBottom: "1px solid #BBBBC0" }}
                  className="pb-5"
                >
                  <SubTitle title="Overall Academics Tier" isDivider />
                  <div className="d-flex flex-column">
                    <TierIndicatorAndTips
                      tier={academics?.overallTier}
                      isOverall
                    />
                  </div>
                </div>
                <SubTitle title="Details" />
                <ActivityDropdown
                  title={"GPA"}
                  content={""}
                  tier={academics.gpaTier}
                />
                <ActivityDropdown
                  title={"Coursework"}
                  content={""}
                  tier={academics.overallClassTier}
                />
                <ActivityDropdown
                  title={"SAT/ACT"}
                  content={""}
                  customContent={
                    <>
                      <div
                        style={{ width: "49%" }}
                        className="d-flex flex-column align-items-center"
                      >
                        <div className="w-75">
                          {academics?.satScore && (
                            <>
                              <div
                                className="cl-dark-text fw-bold py-2 w-100"
                                style={{
                                  borderBottom: "2px solid lightgray",
                                  fontSize: "1.3em",
                                }}
                              >
                                Your SAT score
                              </div>
                              <div
                                className="py-2"
                                style={{ fontSize: "1.2em" }}
                              >
                                {academics.satScore}
                              </div>
                            </>
                          )}
                          {academics?.actScore && (
                            <>
                              <div
                                className="cl-dark-text fw-bold py-2 w-100"
                                style={{
                                  borderBottom: "2px solid lightgray",
                                  fontSize: "1.4em",
                                }}
                              >
                                Your SAT score
                              </div>
                              <div
                                className="py-2"
                                style={{ fontSize: "1.3em" }}
                              >
                                {academics.actScore}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          minHeight: "30vh",
                          width: "50%",
                        }}
                        className="d-flex flex-column align-items-center justify-content-start"
                      >
                        {/* <TipsCard
                        isOverall={false}
                        title={
                          "You definitely know what you are doing! To increase your tier, try our tips and update your profile to help us reaccess your tier."
                        }
                        tips={[]}
                      /> */}
                      </div>
                    </>
                  }
                  tier={-1}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageErrorBoundary>
  );
};

Metrics.requireAuth = true;
export default connect((state) => {
  return {
    userTags: state.accountInfo.tags,
    questionResponses: state.questionResponses,
  };
})(Metrics);
