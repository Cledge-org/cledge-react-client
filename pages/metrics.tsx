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
import QuestionSummaryPage from "../components/questionPages/question_summary_subpage";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import TabButton from "../components/common/TabButton";
import CardText from "../components/common/Card_Text";
import CardCheckIn from "../components/common/Card_CheckIn";
import QuestionSubPageHeader from "../components/question_components/question_subpage_header";
import QuestionECSubpage from "../components/questionPages/question_ec_subpage";
import { GetServerSidePropsContext } from "next";
import { getQuestionProgress } from "./api/get-question-progress";
import { NextApplicationPage } from "./_app";
import DropDownTab from "../components/common/DropDown_Tab";
import CardTask from "../components/common/Card_Task";
import AuthFunctions from "./api/auth/firebase-auth";
import { ORIGIN_URL } from "../config";
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const activities = await fetch(`${ORIGIN_URL}/api/get-activities`, {
      method: "POST",
      body: JSON.stringify({ activitiesId: (await session).user.uid }),
    });
    let userActivitiesJSON = await activities.json();
    return {
      props: {
        activities: userActivitiesJSON,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Metrics: NextApplicationPage<{
  activities: Activities;
  userTags: string[];
  questionResponses: UserResponse[];
}> = ({ activities, userTags, questionResponses }) => {
  const session = useSession();
  const [currPage, setCurrPage] = useState("all");
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={() => setCurrPage("all")}
          title="Metrics Overview"
          percentComplete={undefined}
        />
        {/* {questionData.map((list, index) => {
          if (list.name === "Extracurriculars" || list.name === "Academics") {
            return (
              <DropDownTab
                isExtracurricular={list.name === "Extracurriculars"}
                chunkList={list.chunks.map((chunk) => chunk.name)}
                onClick={(chunk) => setCurrPage(list.name)}
                title={list.name}
                percentComplete={percentageData.lists[index]}
              />
            );
          }
        })} */}
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={(chunk) => setCurrPage("Extracurriculars")}
          title={"Extracurriculars"}
          percentComplete={undefined}
        />
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={(chunk) => setCurrPage("Academics")}
          title={"Academics"}
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
                  <TierRange tier={7} isOverall isOverview />
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
          []
        )}
      </div>
    </div>
  );
};
const ActivityDropdown = ({
  title,
  tier,
  content,
}: {
  title: string;
  tier: number;
  content: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="progress-dropdown-container mt-2" style={{ width: "100%" }}>
      <button
        className="progress-dropdown-btn metrics-dropdown-btn"
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
        className={`metrics-dropdown-menu-${
          isExpanded ? "expanded" : "closed"
        } pt-2 px-2 flex-column align-items-center justify-content-start mb-3 pb-3`}
        style={{
          backgroundColor: "white",
          borderTop: "none",
        }}
      >
        <div className="py-3 mb-5" style={{ fontSize: "1.2em" }}>
          {content}
        </div>
        <div className="d-flex flex-row align-items-start justify-content-between w-100">
          <TierIndicatorAndTips tier={tier} />
        </div>
      </div>
    </div>
  );
};
const TierIndicatorAndTips = ({
  isOverall,
  tier,
}: {
  tier: number;
  isOverall?: boolean;
}) => {
  return (
    <>
      <TierRange tier={tier} isOverall={isOverall} />
      <div
        style={{ minHeight: "30vh", width: isOverall ? "100%" : "50%" }}
        className="d-flex flex-column align-items-center justify-content-start"
      >
        <TipsCard
          isOverall={isOverall}
          title={
            "You are seasoned at this activity, but you can do even better! To increase your tier, try tips below."
          }
          tips={["Ayo", "WAZZZup"]}
        />
      </div>
    </>
  );
};
const TierRange = ({
  tier,
  isOverall,
  isOverview,
}: {
  tier: number;
  isOverall?: boolean;
  isOverview?: boolean;
}) => {
  const tierIndicator = (minTier) => {
    const offSet = Math.abs((tier - minTier) / 2);
    return (
      <>
        <div
          className="bg-cl-dark-text"
          style={{
            position: "absolute",
            height: "118%",
            width: "34.8%",
            zIndex: 1,
            left: `${offSet * 100 - offSet * 34 - 1}%`,
          }}
        />
        <div
          className="d-flex flex-column align-items-center justify-content-end"
          style={{
            position: "absolute",
            width: "130%",
            top: "130%",
            left: `${
              tier === 1
                ? 0
                : tier === 12
                ? -30
                : offSet * 100 -
                  65 +
                  (tier - minTier === 0
                    ? 17.5
                    : tier - minTier === 2
                    ? -17.5
                    : 0)
            }%`,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: "7px solid #070452",
              alignSelf: tier === 1 ? "start" : tier === 12 ? "end" : "center",
            }}
            className="mx-2"
          ></div>
          <div
            className="px-3 py-2 bg-cl-dark-text"
            style={{
              width: "100%",
              border: "1px solid transparent",
              borderRadius: "10px",
              color: "white",
              textAlign: "center",
            }}
          >
            You are at tier {tier}
          </div>
        </div>
      </>
    );
  };
  const tierRangeComponents = () => {
    let tierRangeComponents = [];
    for (let i = 1; i < 5; i++) {
      const multiplied = i * 3;
      const tiers = [multiplied - 2, multiplied - 1, multiplied];
      tierRangeComponents.push(
        <div
          className="position-relative d-flex flex-row align-items-center justify-content-evenly ms-2 metrics-tier-range"
          style={{ flex: 1, height: "100%" }}
        >
          {tiers.map((currTier, index) => {
            return (
              <div
                className={`h-100 overflow-hidden center-child ${
                  index === 0 ? "" : index === tiers.length - 1 ? "" : "mx-05"
                }`}
                style={{
                  flex: 1,
                  zIndex: 2,
                  borderTopLeftRadius: index === 0 ? "5px" : 0,
                  borderBottomLeftRadius: index === 0 ? "5px" : 0,
                  borderTopRightRadius: index === tiers.length - 1 ? "5px" : 0,
                  borderBottomRightRadius:
                    index === tiers.length - 1 ? "5px" : 0,
                  color: i % 4 === 0 ? "black" : "white",
                }}
              >
                <div
                  className={`center-child ${
                    i % 4 === 1
                      ? "bg-cl-purple"
                      : i % 4 === 2
                      ? "bg-cl-pink-purple"
                      : i % 4 === 3
                      ? "bg-cl-orange-red"
                      : "bg-cl-light-yellow"
                  } h-100`}
                  style={{
                    width: currTier === tier && isOverview ? "50%" : "100%",
                    height: currTier === tier && isOverview ? "50%" : "100%",
                  }}
                >
                  <strong style={{ fontSize: "1.2em" }}>{currTier}</strong>
                </div>
              </div>
            );
          })}
          {tier <= tiers[tiers.length - 1] && tier >= tiers[0]
            ? tierIndicator(tiers[0])
            : null}
        </div>
      );
    }
    return tierRangeComponents;
  };
  return (
    <div
      className="d-flex flex-row align-items-center position-relative px-2 py-1"
      style={{
        borderRadius: "8px",
        height: "8vh",
        background:
          "linear-gradient(90deg, rgba(100, 47, 113, 0.1) 0%, rgba(248, 231, 76, 0.1) 100%)",
        width: isOverall ? "100%" : "49%",
      }}
    >
      {tierRangeComponents()}
    </div>
  );
};
const SubTitle = ({
  title,
  isDivider,
}: {
  title: string;
  isDivider?: boolean;
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="progress-dropdown-container mt-2" style={{ width: "100%" }}>
      <div
        className={`d-flex flex-row align-items-center w-100 cl-dark-text ${
          isDivider ? "mb-2" : "mt-5 mb-2"
        }`}
      >
        <strong style={{ fontSize: "1.6em" }}>{title}</strong>
        <button
          style={{
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            fontSize: "1.7em",
            color: "black",
          }}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="center-child"
        >
          <img src="/images/info-circle.svg" />
        </button>
      </div>
      <div
        className={`progress-dropdown-menu-${
          isExpanded ? "expanded" : "closed"
        } ${isDivider ? "mb-2" : ""}`}
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className={`position-relative d-flex overflow-hidden flex-column align-items-center justify-content-around px-3 pt-3 shadow-sm soft-gray-border`}
          style={{
            height: "30vh",
            borderRadius: "10px",
            width: "50%",
            marginTop: 0,
          }}
        >
          <div
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "1.3em",
            }}
            className={``}
          >
            <strong style={{ fontSize: "1.3em" }}>
              Already tried some of our tips?
            </strong>
            <br />
            <br />
            Update your profile to help us reaccess your tier and provide more
            personalized tips.
          </div>

          <div
            className="position-absolute top-0 w-100"
            style={{ left: 0, backgroundColor: "#070452", height: "1vh" }}
          />
          <div className="d-flex flex-row py-3 align-items-cetner justify-content-end px-2 w-100">
            <button
              onClick={() => {
                router.push({
                  pathname: "/progress",
                  query: { page: "Extracurriculars", chunk: "All Activities" },
                });
              }}
              className="cl-btn-clear"
            >
              Update my profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const TipsCard = ({
  title,
  tips,
  isOverall,
}: {
  title: string;
  tips: string[];
  isOverall?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      className={`position-relative d-flex overflow-hidden flex-${
        isOverall ? "row" : "column"
      } align-items-center justify-content-${
        isOverall ? "between" : "around"
      } w-100 px-3 pt-3 shadow-sm soft-gray-border`}
      style={{
        height: "30vh",
        borderRadius: "10px",
        marginTop: isOverall ? "10vh" : 0,
      }}
    >
      <div
        style={{
          textAlign: "left",
          width: isOverall ? "40%" : "100%",
          height: isOverall ? "100%" : "auto",
        }}
        className={``}
      >
        <strong style={{ fontSize: "1.3em" }}>Tips</strong>
        <br />
        {title}
      </div>
      <div
        className={`d-flex flex-column align-items-center justify-content-evenly`}
        style={{ height: "95%", width: isOverall ? "40%" : "100%" }}
      >
        {tips.map((tip) => (
          <div
            className="py-2 w-100 px-2 center-child soft-gray-border justify-content-start"
            style={{
              height: "5vh",
              borderRadius: "10px",
            }}
          >
            {tip}
          </div>
        ))}
        <div
          className="position-absolute top-0 w-100"
          style={{ left: 0, backgroundColor: "#F2F2F7", height: "1vh" }}
        />
      </div>
      {!isOverall ? (
        <div className="d-flex flex-row py-3 align-items-cetner justify-content-end px-2 w-100">
          <button
            onClick={() => {
              router.push({
                pathname: "/progress",
                query: { page: "Extracurriculars", chunk: "All Activities" },
              });
            }}
            className="cl-btn-clear"
          >
            Update my profile
          </button>
        </div>
      ) : null}
    </div>
  );
};
Metrics.requireAuth = true;
export default connect((state) => {
  return {
    userTags: state.accountInfo.tags,
    questionResponses: state.questionResponses,
  };
})(Metrics);
