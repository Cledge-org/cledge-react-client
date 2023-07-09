import React, { useEffect, useState } from "react";
import { NextApplicationPage } from "../AppPage/AppPage";
import { connect } from "react-redux";
import DropdownTab from "../../common/components/DropdownTab/DropdownTab";
import Footer from "../../common/components/Footer/Footer";
import QuestionSubPageHeader from "../../common/components/SubpageHeader/SubpageHeader";
import ActivityDropdown from "./components/ActivityDropdown/ActivityDropdown";
import SubTitle from "./components/SubTitle/SubTitle";
import TierIndicatorAndTips from "./components/TierIndicatorAndTips/TierIndicatorAndTips";
import TierRange from "./components/TierRange/TierRange";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import TipsCard from "src/main-pages/MetricsPage/components/TipsCard/TipsCard";

const Metrics: NextApplicationPage<{
  activities: Activities;
  userTags: string[];
  questionResponses: UserResponse[];
  academics: Academics;
}> = ({ activities, userTags, questionResponses, academics }) => {
  const [currPage, setCurrPage] = useState("all");
  const sideBarSectionData = [
    {
      title: "Metrics Overview",
      page: "all",
    },
    {
      title: "Extracurricular Metrics",
      page: "Extracurriculars",
    },
    {
      title: "Academics Metrics",
      page: "Academics",
    },
  ];
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0 border-top border-2"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="d-flex flex-column border-end"
          style={{ width: "20rem", backgroundColor: "#EFEFF5" }}
        >
          {sideBarSectionData.map((data, _index) => (
            <DropdownTab
              key={_index}
              isAll
              chunkList={[]}
              onClick={() => {
                setCurrPage(data.page);
              }}
              title={data.title}
              percentComplete={undefined}
            />
          ))}
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
                      className="cl-dark-text ms-1"
                      style={{ fontSize: "1.3em" }}
                    >
                      Extracurriculars Metrics
                    </strong>
                  </div>
                  <div
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center mb-5 w-100`}
                    style={{
                      backgroundColor: "white",
                      borderTop: "none",
                      height: "24vh",
                    }}
                  >
                    <div className="d-flex flex-column w-100 mx-3 cl-dark-text">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <text>Least competitive</text>
                        </div>
                        <div>
                          <text>Most competitive</text>
                        </div>
                      </div>
                      <TierRange
                        tier={activities?.overallTier}
                        isOverall
                        isOverview
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 ms-5 w-50">
                  <div className="soft-gray-border d-flex flex-row justify-content-start py-3 px-3">
                    <strong
                      className="cl-dark-text"
                      style={{ fontSize: "1.3em" }}
                    >
                      Academics Metrics
                    </strong>
                  </div>
                  <div
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center mb-5 w-100`}
                    style={{
                      backgroundColor: "white",
                      borderTop: "none",
                      height: "24vh",
                    }}
                  >
                    <div className="d-flex flex-column w-100 mx-3 cl-dark-text">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <text>Least competitive</text>
                        </div>
                        <div>
                          <text>Most competitive</text>
                        </div>
                      </div>
                      <TierRange
                        tier={academics?.overallTier}
                        isOverall
                        isOverview
                      />
                    </div>
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
                title="Extracurriculars Metrics"
                percentage={undefined}
                isMetrics
                subText=""
              />
              <div className="tab-content h-100 mx-5">
                <div
                  style={{ borderBottom: "1px solid #BBBBC0" }}
                  className="pb-5"
                >
                  <div className="d-flex flex-row justify-content-between mb-5">
                    <strong
                      className="cl-dark-text"
                      style={{ fontSize: "1.6em" }}
                    >
                      Overall Tier
                    </strong>
                    <div className="w-50 cl-dark-text">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <text>Least competitive</text>
                        </div>
                        <div>
                          <text>Most competitive</text>
                        </div>
                      </div>

                      <TierIndicatorAndTips
                        tier={activities?.overallTier}
                        isOverall
                        updateChunk={"All Activities"}
                        updatePage={"Extracurriculars"}
                        tip={""}
                        noTip
                        tipTitle={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-3 pb-5">
                  <strong
                    className="cl-dark-text"
                    style={{ fontSize: "1.6em" }}
                  >
                    Individual activity metrics
                  </strong>
                </div>
                {activities?.activities?.map((activity, _index) => (
                  <ActivityDropdown
                    updateChunk={"All Activities"}
                    updatePage={"Extracurriculars"}
                    title={activity.actTitle}
                    content={activity.description}
                    tier={activity.tier}
                    tip={activity.tip}
                    key={_index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="container-fluid d-flex flex-column"
              style={{ flex: 1 }}
            >
              <QuestionSubPageHeader
                title="Academics Metrics"
                percentage={undefined}
                isMetrics
                subText=""
              />
              <div className="tab-content h-100 mx-5">
                <div
                  style={{ borderBottom: "1px solid #BBBBC0" }}
                  className="pb-5"
                >
                  <SubTitle
                    updatePage="Academics"
                    updateChunk="All Academics"
                    title="Overall Academics Tier"
                    isDivider
                  />
                  <div className="d-flex flex-row justify-content-end">
                    <div className="w-50 cl-dark-text">
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <text>Least competitive</text>
                        </div>
                        <div>
                          <text>Most competitive</text>
                        </div>
                      </div>

                      <TierIndicatorAndTips
                        noTip
                        tip=""
                        updateChunk={"All Academics"}
                        updatePage={"Academics"}
                        tipTitle=""
                        tier={academics?.overallTier}
                        isOverall
                      />
                    </div>
                  </div>
                </div>
                <SubTitle
                  updatePage="Academics"
                  updateChunk="All Academics"
                  title="Details"
                />
                <ActivityDropdown
                  title={"GPA"}
                  content={""}
                  updateChunk={"All Academics"}
                  updatePage={"Academics"}
                  tip={academics?.gpaTip}
                  tier={academics?.gpaTier}
                />
                <ActivityDropdown
                  title={"Coursework"}
                  content={""}
                  updateChunk={"All Academics"}
                  updatePage={"Academics"}
                  tip={academics?.classTip}
                  tier={academics?.overallClassTier}
                />
                <ActivityDropdown
                  title={"SAT/ACT"}
                  content={""}
                  updateChunk={"All Academics"}
                  updatePage={"Academics"}
                  tip={academics?.testTip}
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
                                {academics?.satScore}
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
                                {academics?.actScore}
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
                        <TipsCard
                          isOverall={false}
                          title={""}
                          tips={[academics?.testTip]}
                          updatePage={"Academics"}
                          updateChunk={"All Academics"}
                        />
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
      <Footer />
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
