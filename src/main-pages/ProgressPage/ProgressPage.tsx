import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { AppProps } from "next/dist/shared/lib/router/router";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import CardCheckIn from "../../common/components/Cards/CardCheckIn/CardCheckIn";
import DropdownTab from "../../common/components/DropdownTab/DropdownTab";
import TabButton from "../../common/components/TabButton/TabButton";
import { QuestionList, UserResponse, QuestionChunk } from "../../types/types";
import { NextApplicationPage } from "../AppPage/AppPage";
import QuestionSubPageHeader from "./components/QuestionComponents/SubpageHeader/SubpageHeader";
import QuestionECSubpage from "./components/QuestionSubPages/QuestionECSubpage/QuestionECSubpage";
import QuestionACSubpage from "./components/QuestionSubPages/QuestionACSubpage/QuestionACSubpage";
import QuestionSummarySubpage from "./components/QuestionSubPages/QuestionSummarySubpage/QuestionSummarySubpage";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

const Progress: NextApplicationPage<{
  questionData: QuestionList[];
  userTags: string[];
  questionResponses: UserResponse[];
}> = ({ questionData, userTags, questionResponses }) => {
  const session = useSession();
  const router = useRouter();
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
    if (
      router.query.page &&
      typeof router.query.page === "string" &&
      typeof router.query.chunk === "string"
    ) {
      setCurrPage({ page: router.query.page, chunk: router.query.chunk });
    }
    console.log(router.query);
  }, []);
  const isNotEmpty = (element: any) => {
    return (
      element !== undefined &&
      element !== null &&
      element !== "" &&
      element?.length > 0
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
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
          <DropdownTab
            isAll
            chunkList={[]}
            onClick={() => setCurrPage({ page: "all", chunk: "" })}
            title="All Sections"
            percentComplete={undefined}
          />
          {questionData.map((list, index) => {
            return (
              <DropdownTab
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
                  className={`default-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currAllSectionTab === "upcoming"
                      ? " tab-active  d-flex "
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
                  className={`default-tab-pane flex-row justify-content-start align-items-center
                  ${
                    currAllSectionTab === "finished"
                      ? " tab-active  d-flex "
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
                if (list.name !== "Extracurriculars") {
                  return (
                    <QuestionSummarySubpage
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
                questionData.find(({ name }) => name === "Extracurriculars")
                  ? questionData
                      .find(({ name }) => name === "Extracurriculars")
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
              .concat(
                questionData.find(({ name }) => name === "Academics")
                  ? questionData
                      .find(({ name }) => name === "Academics")
                      .chunks.map((chunk) => {
                        return (
                          <QuestionACSubpage
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
    </PageErrorBoundary>
  );
};

Progress.requireAuth = true;
export default connect((state) => {
  return {
    userTags: state.accountInfo.tags,
    questionResponses: state.questionResponses,
  };
})(Progress);
