import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
import { GetServerSidePropsContext } from "next";
import { getProgressInfo } from "./api/get-progress-info";
import { NextApplicationPage } from "./_app";
import DropDownTab from "../components/common/DropDown_Tab";
import CardTask from "../components/common/Card_Task";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: { progressInfo: await getProgressInfo("testUser") } };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Progress: NextApplicationPage<{ progressInfo: ProgressInfo }> = ({
  progressInfo,
}) => {
  const [currPage, setCurrPage] = useState("all");
  const [currAllSectionTab, setCurrAllSectionTab] = useState("upcoming");
  const [percentageData, setPercentageData] = useState({
    allLists: 0,
    lists: [],
  });

  useEffect(() => {
    setPercentageData({
      allLists: calculateTotalPercent(progressInfo.questionData.questionList),
      lists: progressInfo.questionData.questionList.map(({ chunks }) => {
        return calculatePercentComplete(chunks);
      }),
    });
  }, []);

  const isNotEmpty = (element: any) => {
    return element !== null && element !== "" && element !== [];
  };
  const calculatePercentComplete = (chunks: QuestionChunk[]): number => {
    let total: number = 0;
    let finished: number = 0;
    chunks.map((chunk) => {
      total += chunk.questions.length;
      chunk.questions.forEach((question) => {
        let userQuestionIds: string[] = progressInfo.userProgress.responses.map(
          ({ questionId }) => questionId
        );
        if (
          userQuestionIds.includes(question.id) &&
          isNotEmpty(
            progressInfo.userProgress.responses[
              userQuestionIds.indexOf(question.id)
            ].response
          )
        ) {
          finished++;
        }
      });
    });
    return Math.round((finished / total) * 100);
  };
  const calculateTotalPercent = (questionList: QuestionList[]) => {
    let finished = 0;
    let total = questionList.length * 100;
    questionList.forEach((item, index) => {
      finished += calculatePercentComplete(item.chunks);
    });
    return Math.round((finished / total) * 100);
  };
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ height: "94vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          isAll
          chunkList={[]}
          onClick={() => setCurrPage("all")}
          title="All Sections"
          percentComplete={undefined}
        />
        {progressInfo.questionData.questionList.map((list, index) => {
          return (
            <DropDownTab
              isExtracurricular={list.title === "Extracurriculars"}
              chunkList={list.chunks.map((chunk) => chunk.title)}
              onClick={(chunk) => setCurrPage(chunk ?? list.title)}
              title={list.title}
              percentComplete={percentageData.lists[index]}
            />
          );
        })}
      </div>
      <div className="d-flex" style={{ flex: 3 }}>
        {currPage === "all" ? (
          <div className="container-fluid h-100">
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
            <div className="tab-content">
              <div
                className={
                  currAllSectionTab === "upcoming"
                    ? "resources-tab-pane resources-active"
                    : "resources-tab-pane"
                }
                id="upcoming"
              >
                {progressInfo.questionData.questionList
                  .filter(({ chunks }, index) => {
                    return percentageData.lists[index] < 100;
                  })
                  .map(({ title }) => (
                    <CardCheckIn
                      snippet={"OH CRAP"}
                      title={title}
                      textGradient={"light"}
                    />
                  ))}
              </div>
              <div
                className={
                  currAllSectionTab === "finished"
                    ? "resources-tab-pane resources-active"
                    : "resources-tab-pane"
                }
                id="finished"
              ></div>
            </div>
          </div>
        ) : (
          progressInfo.questionData.questionList
            .map((list) => {
              if (list.title !== "Extracurriculars") {
                return (
                  <QuestionSummaryPage
                    isShowing={currPage === list.title}
                    listTitle={list.title}
                    chunks={list.chunks}
                    userAnswers={progressInfo.userProgress}
                    percentComplete={calculatePercentComplete(list.chunks)}
                  />
                );
              }
            })
            .concat(
              progressInfo.questionData.questionList
                .find(({ title }) => title === "Extracurriculars")
                .chunks.map((chunk) => {
                  return (
                    <QuestionECSubpage
                      userECResponses={
                        progressInfo.userProgress.responses.find(
                          ({ questionId }) => questionId === chunk.title
                        ) !== undefined
                          ? progressInfo.userProgress.responses.find(
                              ({ questionId }) => questionId === chunk.title
                            ).response
                          : []
                      }
                      chunk={chunk}
                      isShowing={currPage === chunk.title}
                    />
                  );
                })
            )
        )}
      </div>
    </div>
  );
};

Progress.requireAuth = false;
export default Progress;
