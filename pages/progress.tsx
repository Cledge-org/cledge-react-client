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
    const session = await getSession(ctx);
    const questionResponses = await fetch(
      `${ORIGIN_URL}/api/get-question-progress`,
      { method: "POST", body: JSON.stringify({ userId: session.user.uid }) }
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
const Progress: NextApplicationPage<{
  questionData: QuestionList[];
  userTags: string[];
  questionResponses: UserResponse[];
}> = ({ questionData, userTags, questionResponses }) => {
  const session = useSession();
  const [currPage, setCurrPage] = useState({ page: "all", chunk: "" });
  const [currAllSectionTab, setCurrAllSectionTab] = useState("upcoming");
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
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={() => setCurrPage({ page: "all", chunk: "" })}
          title="All Sections"
          percentComplete={undefined}
        />
        {questionData.map((list, index) => {
          return (
            <DropDownTab
              isExtracurricular={list.name === "Extracurriculars"}
              chunkList={list.chunks.map((chunk) => chunk.name)}
              onClick={(chunk) =>
                setCurrPage({ page: list.name, chunk: chunk })
              }
              title={list.name}
              percentComplete={percentageData.lists[index]}
            />
          );
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
              title="Profile Completion"
              percentage={percentageData.allLists}
              subText="This is just a placeholder"
            />
            <ul className="nav ms-5" role="tablist">
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
            <div className="tab-content h-100">
              <div
                className={`resources-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currAllSectionTab === "upcoming"
                      ? " resources-active  d-flex "
                      : ""
                  }
                `}
                id="upcoming"
              >
                {questionData
                  .filter(({ chunks }, index) => {
                    return percentageData.lists[index] < 100;
                  })
                  .map(({ name, chunks }, index) => (
                    <CardCheckIn
                      snippet={
                        <ul className="p-0 ps-3">
                          {chunks.map(({ name }) => (
                            <li>{name}</li>
                          ))}
                        </ul>
                      }
                      title={name}
                      onCardClick={() => {
                        setCurrPage({ page: name, chunk: chunks[0].name });
                      }}
                      textGradient={"light"}
                      percentComplete={
                        percentageData.lists.filter((value) => value < 100)[
                          index
                        ]
                      }
                      isFinished={false}
                    />
                  ))}
              </div>
              <div
                className={`resources-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currAllSectionTab === "finished"
                      ? " resources-active  d-flex "
                      : ""
                  }
                `}
                id="finished"
              >
                {questionData
                  .filter(({ chunks }, index) => {
                    return percentageData.lists[index] === 100;
                  })
                  .map(({ name, chunks }) => (
                    <CardCheckIn
                      snippet={
                        <ul className="p-0 ps-3">
                          {chunks.map(({ name }) => (
                            <li>{name}</li>
                          ))}
                        </ul>
                      }
                      title={name}
                      onCardClick={() => {
                        setCurrPage({ page: name, chunk: chunks[0].name });
                      }}
                      textGradient={"light"}
                      percentComplete={100}
                      isFinished={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          questionData
            .map((list) => {
              if (list.name !== "Extracurricular") {
                return (
                  <QuestionSummaryPage
                    userTags={currUserTags}
                    viaChunk={currPage.chunk}
                    isShowing={currPage.page === list.name}
                    listTitle={list.name}
                    onPercentageUpdate={(newTags) => {
                      onPercentageUpdate();
                      setCurrUserTags(newTags);
                    }}
                    chunks={list.chunks}
                    userAnswers={{ responses: questionResponses }}
                    percentComplete={calculatePercentComplete(list.chunks)}
                  />
                );
              }
            })
            .concat(
              questionData.find(({ name }) => name === "Extracurricular")
                ? questionData
                    .find(({ name }) => name === "Extracurricular")
                    .chunks.map((chunk) => {
                      return (
                        <QuestionECSubpage
                          key={chunk.name}
                          userResponses={questionResponses}
                          chunk={chunk}
                          isShowing={currPage.chunk === chunk.name}
                        />
                      );
                    })
                : []
            )
        )}
      </div>
    </div>
  );
};

Progress.requireAuth = true;
export default connect((state) => {
  return {
    userTags: state.accountInfo.tags,
    questionResponses: state.questionResponses,
  };
})(Progress);
