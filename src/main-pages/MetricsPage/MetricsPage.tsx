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
  function BorderDropdownTab({
    isAll,
    chunkList,
    onClick,
    title,
    percentComplete,
  }) {
    return (
      <div className="border-bottom border-2">
        <DropdownTab
          isAll={isAll}
          chunkList={chunkList}
          onClick={onClick}
          title={title}
          percentComplete={percentComplete}
        />
      </div>
    );
  }
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0 border-top border-2"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="d-flex flex-column bg-extra-light-gray border-end"
          style={{ width: "23%" }}
        >
          <BorderDropdownTab
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
          <BorderDropdownTab
            isAll
            chunkList={[]}
            onClick={(chunk) => setCurrPage("Extracurriculars")}
            title={"Extracurricular Metrics"}
            percentComplete={undefined}
          />
          <BorderDropdownTab
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
                      className="cl-dark-text ms-1"
                      style={{ fontSize: "1.3em" }}
                    >
                      Extracurriculars Metrics
                    </strong>
                  </div>
                  <div
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center pb-3`}
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
                  <div className="soft-gray-border mb-5" style={{ borderTop: "none" }}>
                    <div className="d-flex flex-column py-3 px-3">
                      <h5>Insights:</h5>
                      <text className="pb-3">Based on the extracurricular activities you have shared,
                        it is clear that you have already taken steps towards building a strong profile.
                        However, there are some areas where you can still improve to make your application
                        even more impressive.  </text>
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Tip 1:</strong> Take on leadership roles in your clubs. By taking on leadership
                          roles in your club you can display your willingness to go above and beyond. Additionally you will be able to
                          develop valubale experince in managment and leading a team which are all qualities colleges look for.</li>
                        <li className="list-group-item"><strong>Tip 2:</strong> Participate in community service activities to show your commitment to
                          social responsibility. This involvement shows that you are not only dedicated to your personal growth and development but also
                          have a sense of responsibility towards those around you. Volunteering can take many forms, such as tutoring, mentoring, fundraising,
                          or organizing community events.</li>
                        <li className="list-group-item"><strong>Tip 3:</strong> Attend summer programs that align with your career goals.These programs offer a
                          chance to explore your interests further, gain practical skills, and network with professionals in your field. Attending a summer program can
                          also demonstrate your dedication to pursuing your passions, showing that you are willing to invest your time and energy to achieve your goals.</li>
                      </ul>
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
                    className={`soft-gray-border d-flex pt-2 px-2 flex-row align-items-start justify-content-center w-100`}
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
                  <div className="soft-gray-border mb-5" style={{ borderTop: "none" }}>
                    <div className="d-flex flex-column py-3 px-3">
                      <h5>Insights:</h5>
                      <text className="pb-3">Based on the academic achievements you have shared,
                        it is clear that you have already made strides towards building a strong profile.
                        However, there are some areas where you can still improve to make your application
                        even more impressive. </text>
                      <ul className="list-group">
                        <li className="list-group-item"><strong>Tip 1:</strong> Take on challenging courses in your curriculum. By enrolling in advanced
                          courses like AP, IB, or honors classes, you can display your dedication to academic excellence. This also helps develop a deeper understanding of the subjects and showcases your ability to handle a rigorous workload.</li>
                        <li className="list-group-item"><strong>Tip 2:</strong> Engage in academic extracurriculars to enhance your knowledge in specific subjects. Participating in clubs like the Math Team, Science Olympiad, or Debate Team allows you to hone your skills and interests while demonstrating your commitment to academic growth.</li>
                        <li className="list-group-item"><strong>Tip 3:</strong> Seek out opportunities for academic research or internships in your field of interest. These experiences provide a deeper understanding of your chosen discipline and allow you to connect with professionals in the field. They also demonstrate your passion for learning and your ability to apply your knowledge in real-world situations.</li>
                      </ul>
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
                    <strong className="cl-dark-text" style={{ fontSize: "1.6em" }}>Overall Tier</strong>
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
                  <strong className="cl-dark-text" style={{ fontSize: "1.6em" }}>Individual activity metrics</strong>
                </div>
                {activities?.activities?.map((activity) => {
                  //console.log(activity.tip);
                  return (
                    <ActivityDropdown
                      updateChunk={"All Activities"}
                      updatePage={"Extracurriculars"}
                      title={activity.actTitle}
                      content={activity.description}
                      tier={activity.tier}
                      tip={activity.tip}
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
