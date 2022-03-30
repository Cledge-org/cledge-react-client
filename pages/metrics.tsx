import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
    <div className="progress-dropdown-container mt-2 w-75">
      <button
        className="progress-dropdown-btn cl-btn-gray"
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
        } ms-1 mt-2`}
        style={{ backgroundColor: "white" }}
      >
        <div
          className="d-flex flex-row align-items-center position-relative"
          style={{ border: "1px solid black" }}
        >
          <div
            className="center-child"
            style={{ border: "1px solid black", flex: 1 }}
          >
            1-3
          </div>
          <div
            className="center-child"
            style={{ border: "1px solid black", flex: 1 }}
          >
            4-6
          </div>
          <div
            className="center-child"
            style={{ border: "1px solid black", flex: 1 }}
          >
            7-8
          </div>
          <div
            className="center-child"
            style={{ border: "1px solid black", flex: 1 }}
          >
            9-12
          </div>
          <div
            style={{
              position: "absolute",
              height: "130%",
              width: "4px",
              backgroundColor: "black",
              bottom: "-15%",
              left: `${(tier / 12) * 100}%`,
            }}
          />
        </div>
        <div>{content}</div>
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
