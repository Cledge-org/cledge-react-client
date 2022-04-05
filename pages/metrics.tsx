import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faArrowRight,
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
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const questionResponses = await fetch(
      `${ORIGIN_URL}/api/get-question-progress`
    );
    let userProgressJSON = await questionResponses.json();
    return {
      props: {
        ...userProgressJSON,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Metrics: NextApplicationPage<{
  questionData: QuestionList[];
  userTags: string[];
  questionResponses: UserResponse[];
}> = ({ questionData, userTags, questionResponses }) => {
  const session = useSession();
  const [currPage, setCurrPage] = useState({
    page: "all",
    tab: "extracurriculars",
  });
  const [percentageData, setPercentageData] = useState({
    allLists: 0,
    lists: [],
  });
  const [currUserTags, setCurrUserTags] = useState(userTags);
  const onPercentageUpdate = () => {
    setPercentageData({
      allLists: calculateTotalPercent(questionData),
      lists: questionData.map(({ chunks }) => {
        return calculatePercentComplete(chunks);
      }),
    });
  };
  useEffect(() => {
    //resetResponses();
    onPercentageUpdate();
    console.log(percentageData.lists);
  }, []);
  const isNotEmpty = (element: any) => {
    return (
      element !== undefined &&
      element !== null &&
      element !== "" &&
      element !== []
    );
  };
  const calculatePercentComplete = (chunks: QuestionChunk[]): number => {
    let total: number = 0;
    let finished: number = 0;
    chunks.map((chunk) => {
      total += chunk.questions.length;
      chunk.questions.forEach((question) => {
        let userQuestionIds: string[] = questionResponses.map(
          ({ questionId }) => questionId
        );
        if (
          userQuestionIds.includes(question._id) &&
          isNotEmpty(
            questionResponses[userQuestionIds.indexOf(question._id)].response
          )
        ) {
          finished++;
        }
      });
    });
    return Math.round(total === 0 ? 0 : (finished / total) * 100);
  };
  const calculateTotalPercent = (lists: QuestionList[]) => {
    let finished = 0;
    let total = lists.length * 100;
    lists.forEach((item, index) => {
      finished += calculatePercentComplete(item.chunks);
    });
    return Math.round((finished / total) * 100);
  };
  console.log(percentageData.lists);
  const ECResponses = questionResponses.find(({ questionId }) => {
    return questionId === "Extracurriculars";
  });
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={() => setCurrPage({ page: "all", tab: "extracurriculars" })}
          title="Metrics Overview"
          percentComplete={undefined}
        />
        {questionData.map((list, index) => {
          if (list.name === "Extracurriculars" || list.name === "Academics") {
            return (
              <DropDownTab
                isExtracurricular={list.name === "Extracurriculars"}
                chunkList={list.chunks.map((chunk) => chunk.name)}
                onClick={(chunk) =>
                  setCurrPage({ page: list.name, tab: "data" })
                }
                title={list.name}
                percentComplete={percentageData.lists[index]}
              />
            );
          }
        })}
      </div>
      <div
        className="d-flex"
        style={{
          flex: 3,
        }}
      >
        {currPage.page === "all" ? (
          <div
            className="container-fluid d-flex flex-column"
            style={{ flex: 1 }}
          >
            <QuestionSubPageHeader
              title="Metrics Completion"
              percentage={percentageData.allLists}
              subText=""
            />
            <ul className="nav ms-5" role="tablist">
              <TabButton
                currTab={currPage.tab}
                onClick={(tab) => {
                  setCurrPage({ ...currPage, tab });
                }}
                title={"Extracurriculars"}
              />
              <TabButton
                currTab={currPage.tab}
                onClick={(tab) => {
                  setCurrPage({ ...currPage, tab });
                }}
                title={"Academics"}
              />
            </ul>
            <div className="tab-content h-100">
              <div
                className={`resources-tab-pane mx-5 w-100 flex-column justify-content-start align-items-start
                  ${
                    currPage.tab === "extracurriculars"
                      ? " resources-active  d-flex "
                      : ""
                  }
                `}
                id="extracurriculars"
              >
                {!ECResponses
                  ? "Looks like you have no activities"
                  : questionData
                      .find(({ name }) => name === "Extracurriculars")
                      .chunks.map((chunk) => {
                        return ECResponses.response[chunk.name].map(
                          (response, index) => {
                            const titleQuestion = response.find(
                              ({ questionId }) =>
                                questionId ===
                                chunk.questions.find(
                                  ({ question }) => question === "Title"
                                )?._id
                            );
                            return (
                              <ActivityDropdown
                                title={
                                  titleQuestion.response
                                    ? "No title given"
                                    : titleQuestion.response
                                }
                                content="Great job"
                                tier={7}
                              />
                            );
                          }
                        );
                      })}
                <button className="cl-btn-blue align-self-center w-50">
                  Update Extracurriculars
                </button>
              </div>
              <div
                className={`resources-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currPage.tab === "academics"
                      ? " resources-active  d-flex "
                      : ""
                  }
                `}
                id="academics"
              >
                {}
              </div>
            </div>
          </div>
        ) : currPage.page === "Extracurriculars" ? (
          <div
            className="container-fluid d-flex flex-column"
            style={{ flex: 1 }}
          >
            <QuestionSubPageHeader
              title="Extracurriculars Completion"
              percentage={percentageData.allLists}
              subText=""
            />
            <ul className="nav ms-5" role="tablist">
              <TabButton
                currTab={currPage.tab}
                onClick={(tab) => {
                  setCurrPage({ ...currPage, tab });
                }}
                title={"Data"}
              />
              <TabButton
                currTab={currPage.tab}
                onClick={(tab) => {
                  setCurrPage({ ...currPage, tab });
                }}
                title={"Update"}
              />
            </ul>
            <div className="tab-content h-100">
              {currPage.tab === "data"
                ? !ECResponses
                  ? "Looks like you have no activities"
                  : questionData
                      .find(({ name }) => name === "Extracurriculars")
                      .chunks.map((chunk) => {
                        return ECResponses.response[chunk.name].map(
                          (response, index) => {
                            const titleQuestion = response.find(
                              ({ questionId }) =>
                                questionId ===
                                chunk.questions.find(
                                  ({ question }) => question === "Title"
                                )?._id
                            );
                            return (
                              <ActivityDropdown
                                title={
                                  titleQuestion.response
                                    ? "No title given"
                                    : titleQuestion.response
                                }
                                content="Great job"
                                tier={7}
                              />
                            );
                          }
                        );
                      })
                : questionData.find(({ name }) => name === "Extracurriculars")
                ? questionData
                    .find(({ name }) => name === "Extracurriculars")
                    .chunks.map((chunk) => {
                      return (
                        <QuestionECSubpage
                          inMetrics
                          key={chunk.name}
                          userResponses={questionResponses}
                          chunk={chunk}
                          isShowing={true}
                        />
                      );
                    })
                : []}
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
    <div className="progress-dropdown-container mt-2" style={{ width: "95%" }}>
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
          style={{ width: "12px", height: "12px" }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      <div
        className={`progress-dropdown-menu-${
          isExpanded ? "expanded" : "closed"
        } mt-2 flex-row align-items-start justify-content-between`}
        style={{ backgroundColor: "white" }}
      >
        <div
          className="d-flex flex-row align-items-center position-relative px-2 py-2"
          style={{
            border: "1px solid lightgray",
            borderRadius: "10px",
            height: "fit-content",
            width: "49%",
          }}
        >
          <div
            className="center-child ms-2 metrics-tier-range bg-cl-purple"
            style={{ flex: 1 }}
          >
            1-3
          </div>
          <div
            className="center-child mx-2 metrics-tier-range bg-cl-gray-blue"
            style={{ flex: 1 }}
          >
            4-6
          </div>
          <div
            className="center-child me-2 metrics-tier-range bg-cl-green"
            style={{ flex: 1 }}
          >
            7-9
          </div>
          <div
            className="center-child me-2 metrics-tier-range bg-cl-light-yellow"
            style={{ flex: 1, color: "black" }}
          >
            10-12
          </div>
          <div
            className="bg-cl-blue"
            style={{
              position: "absolute",
              height: "100%",
              width: "4px",
              left: `${(tier / 12) * 100}%`,
            }}
          />
          <div
            className="d-flex flex-column align-items-center justify-content-end"
            style={{
              position: "absolute",
              width: "35%",
              top: "110%",
              left: `calc(${(tier / 12) * 100 - 17.5}% + 2px)`,
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "5px solid gray",
                alignSelf: "center",
              }}
            ></div>
            <div
              className="px-2 py-2"
              style={{
                backgroundColor: "gray",
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
        </div>
        <div
          style={{ width: "49%", minHeight: "50vh" }}
          className="d-flex flex-column align-items-start"
        >
          <TipsCard
            title={
              "You are seasoned at this activity, but you can do even better! To increase your tier, try tips below."
            }
            tips={["Ayo", "WAZZZup"]}
          />
          <div
            className="py-2 px-2 w-100 my-3"
            style={{
              border: "1px solid gray",
              backgroundColor: "gray",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Next steps
          </div>
          <button className="d-flex flex-row w-100 mb-3">
            <div style={{ textAlign: "left" }}>
              <strong>Set a goal</strong>
              <p>
                Update your profile to help us reaccess your tier and provide
                more personalized tips.
              </p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button className="d-flex flex-row w-100">
            <div style={{ textAlign: "left" }}>
              <strong>Set a goal</strong>
              <p>
                Update your profile to help us reaccess your tier and provide
                more personalized tips.
              </p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};
const TipsCard = ({ title, tips }: { title: string; tips: string[] }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between w-100 px-3 pt-3 shadow-sm"
      style={{
        height: "25vh",
        border: "1px solid lightgray",
        borderRadius: "10px",
      }}
    >
      {title}
      <div
        className="d-flex flex-column align-items-center justify-content-evenly w-100"
        style={{ height: "95%" }}
      >
        {tips.map((tip) => (
          <div
            className="py-2 w-100 px-2 center-child justify-content-start"
            style={{
              height: "5vh",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          >
            {tip}
          </div>
        ))}
      </div>
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
