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
import { getQuestionProgress } from "./api/get-question-progress";
import { NextApplicationPage } from "./_app";
import DropDownTab from "../components/common/DropDown_Tab";
import CardTask from "../components/common/Card_Task";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: { progressInfo: await getQuestionProgress("testUser") } };
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
      allLists: calculateTotalPercent(progressInfo.questionData),
      lists: progressInfo.questionData.map(({ chunks }) => {
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
          userQuestionIds.includes(question._id) &&
          isNotEmpty(
            progressInfo.userProgress.responses[
              userQuestionIds.indexOf(question._id)
            ].response
          )
        ) {
          finished++;
        }
      });
    });
    return Math.round((finished / total) * 100);
  };
  const calculateTotalPercent = (lists: QuestionList[]) => {
    let finished = 0;
    let total = lists.length * 100;
    lists.forEach((item, index) => {
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
        {progressInfo.questionData.map((list, index) => {
          return (
            <DropDownTab
              isExtracurricular={list.name === "Extracurriculars"}
              chunkList={list.chunks.map((chunk) => chunk.name)}
              onClick={(chunk) => setCurrPage(chunk ?? list.name)}
              title={list.name}
              percentComplete={percentageData[index]}
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
                className={`resources-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currAllSectionTab === "upcoming"
                      ? " resources-active  d-flex "
                      : ""
                  }
                `}
                id="upcoming"
              >
                {progressInfo.questionData
                  .filter(({ chunks }, index) => {
                    return percentageData[index] < 100;
                  })
                  .map(({ name }) => (
                    <CardCheckIn
                      snippet={"OH CRAP"}
                      title={name}
                      textGradient={"light"}
                      percentComplete={0}
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
                {progressInfo.questionData
                  .filter(({ chunks }, index) => {
                    return percentageData[index] < 100;
                  })
                  .map(({ name }) => (
                    <CardCheckIn
                      snippet={"OH CRAP"}
                      title={name}
                      textGradient={"light"}
                      percentComplete={0}
                      isFinished={false}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          progressInfo.questionData
            .map((list) => {
              if (list.name !== "Extracurriculars") {
                return (
                  <QuestionSummaryPage
                    isShowing={currPage === list.name}
                    listTitle={list.name}
                    chunks={list.chunks}
                    userAnswers={progressInfo.userProgress}
                    percentComplete={calculatePercentComplete(list.chunks)}
                  />
                );
              }
            })
            .concat(
              progressInfo.questionData
                .find(({ name }) => name === "Extracurriculars")
                .chunks.map((chunk) => {
                  return (
                    <QuestionECSubpage
                      userECResponses={
                        progressInfo.userProgress.responses.find(
                          ({ questionId }) => questionId === chunk.name
                        ) !== undefined
                          ? progressInfo.userProgress.responses.find(
                              ({ questionId }) => questionId === chunk.name
                            ).response
                          : []
                      }
                      chunk={chunk}
                      isShowing={currPage === chunk.name}
                    />
                  );
                })
            )
        )}
      </div>
    </div>
  );
};

Progress.requireAuth = true;
export default Progress;
