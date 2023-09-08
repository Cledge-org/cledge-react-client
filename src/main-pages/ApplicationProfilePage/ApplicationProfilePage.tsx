import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import CardCheckIn from "../../common/components/Cards/CardCheckIn/CardCheckIn";
import TabButton from "../../common/components/TabButton/TabButton";
import Footer from "../../common/components/Footer/Footer";
import cs from "classnames";

import { NextApplicationPage } from "../AppPage/AppPage";
import QuestionSubPageHeader from "../../common/components/SubpageHeader/SubpageHeader";
import QuestionECSubpage from "./components/QuestionSubPages/QuestionECSubpage/QuestionECSubpage";
import QuestionACSubpage from "./components/QuestionSubPages/QuestionACSubpage/QuestionACSubpage";
import QuestionSummarySubpage from "./components/QuestionSubPages/QuestionSummarySubpage/QuestionSummarySubpage";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import DropdownTab from "src/common/components/DropdownTab/DropdownTab";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import AcademicsSignUp, { AcademicsProps } from "src/main-pages/CheckInPage/Components/AcademicsSignUp";
import ActivitiesSignUp from "src/main-pages/CheckInPage/Components/ActivitiesSignUp";

const ApplicationProfilePage: NextApplicationPage<{
  questionData: QuestionList[];
  userTags: string[];
  questionResponses: UserResponse[];
  academicData: any;
  activityData: any;
}> = ({ questionData, userTags, questionResponses, academicData, activityData }) => {
  const session = useSession();
  const router = useRouter();
  const [currPage, setCurrPage] = useState({ page: "all", chunk: "" });
  const [currAllSectionTab, setCurrAllSectionTab] = useState("upcoming");
  const [academicResponses, setAcademicsResponses] = useState(academicData.responses)
  const [activityResponses, setActivityResponses] = useState(activityData.activities);
  const [noRenderButtons, setNoRenderButtons] = useState(false);
  const [percentageData, setPercentageData] = useState({
    allLists: 0,
    lists: [],
  });
  const size = useWindowSize();
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
          userQuestionIds.includes(question._id.toString()) &&
          isNotEmpty(
            questionResponses[userQuestionIds.indexOf(question._id.toString())]
              .response
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
      if (item.name === "Onboarding Questions") {
        finished += calculatePercentComplete(item.chunks);
      }
    });
    //!DONT FORGET TO REVERT THIS TO 100
    return Math.round((finished / 1) * 1);
  };
  const onboardingQuestionList = questionData.find(
    ({ name }) => name === "Onboarding Questions"
  );
  if (size.width < 800) {
    return (
      <div style={{ height: "100vh" }} className="center-child">
        Update your progress on the desktop app
      </div>
    );
  }
  const handleSubmitAcademics = async () => {
    try {
      await fetch('/api/metrics/put-academics', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.data.user.uid,
          insertionId: session.data.user.uid,
          academics: academicData.academics,
          responses: academicResponses
        }),
      })
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="d-flex flex-column border-end"
          style={{ width: "20rem", backgroundColor: "#EFEFF5" }}
        >
          {questionData.map((list, index) => {
            if (
              list.name === "Onboarding Questions" ||
              list.name === "Extracurriculars" ||
              list.name === "Academics"
            ) {
              return (
                <DropdownTab
                  key={index}
                  isECAC={
                    list.name === "Extracurriculars" ||
                    list.name === "Academics"
                  }
                  chunkList={list.chunks.map((chunk) => chunk.name)}
                  onClick={(chunk) =>
                    setCurrPage({ page: list.name, chunk: chunk })
                  }
                  title={list.name}
                  currSelectedPath={currPage.chunk}
                  percentComplete={percentageData.lists[index]}
                  selected={currPage.page === list.name}
                />
              );
            }
            return null;
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
                subText="Use this page to keep your profile up to date. The more information you give us, the better we can help you!"
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
                  className={cs(
                    "default-tab-pane flex-row justify-content-start align-items-center",
                    currAllSectionTab === "upcoming" && "tab-active  d-flex"
                  )}
                  id="upcoming"
                >
                  {questionData
                    .filter(({ chunks }, index) => {
                      return percentageData.lists[index] < 100;
                    })
                    .map(({ name, chunks }, index) =>
                      name === "Onboarding Questions" ? (
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
                      ) : null
                    )}
                </div>
                <div
                  className={cs(
                    "default-tab-pane flex-row justify-content-start align-items-center",
                    currAllSectionTab === "finished" && "tab-active  d-flex"
                  )}
                  id="finished"
                >
                  {questionData
                    .filter(({ chunks }, index) => {
                      return percentageData.lists[index] === 100;
                    })
                    .map(({ name, chunks }) =>
                      name === "Onboarding Questions" ? (
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
                      ) : null
                    )}
                </div>
              </div>
            </div>
          ) : (
            questionData
              .map((list) => {
                if (
                  list.name !== "Extracurriculars" &&
                  list.name !== "Academics"
                ) {
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
              // .concat(
              //   questionData.find(({ name }) => name === "Extracurriculars")
              //     ? questionData
              //       .find(({ name }) => name === "Extracurriculars")
              //       .chunks.map((chunk) => {
              //         return (
              //           <QuestionECSubpage
              //             key={chunk.name}
              //             userResponses={questionResponses}
              //             chunk={chunk}
              //             isShowing={currPage.chunk === chunk.name}
              //           />
              //         );
              //       })
              //     : []
              // )
              // .concat(
              //   questionData.find(({ name }) => name === "Academics")
              //     ? questionData
              //       .find(({ name }) => name === "Academics")
              //       .chunks.map((chunk) => {
              //         return (
              //           <QuestionACSubpage
              //             key={chunk.name}
              //             userResponses={questionResponses}
              //             chunk={chunk}
              //             isShowing={currPage.chunk === chunk.name}
              //           />
              //         );
              //       })
              //     : []
              // )
              .concat(
                currPage.page === "Extracurriculars" ? 
                  <div className="d-flex justify-content-center w-100">
                    <div className="my-5" style={{ width: "50vw" }}>
                      <ActivitiesSignUp 
                        activities={activityResponses}
                        submitData={(e) => setActivityResponses(e)} 
                        noRenderButtons={() => setNoRenderButtons(!noRenderButtons)}
                      />
                      {noRenderButtons ? null : (
                        <div className="d-flex justify-content-center mt-5">
                          <button className="btn cl-btn-blue" onClick={(e) => {handleSubmitAcademics()}}>Save</button>
                        </div>
                      )}
                      
                    </div>
                  </div> : null
              )
              .concat(
                currPage.page === "Academics" ? 
                  <div className="d-flex justify-content-center w-100">
                    <div className=" my-5" style={{ width: "50vw" }}>
                      <AcademicsSignUp 
                        years={academicResponses.years} 
                        submitData={(e) => setAcademicsResponses(e)} 
                        noRenderButtons={() => setNoRenderButtons(!noRenderButtons)}
                      />
                      {noRenderButtons ? null : (
                        <div className="d-flex justify-content-center mt-5">
                          <button className="btn cl-btn-blue" onClick={(e) => {handleSubmitAcademics()}}>Save</button>
                        </div>
                      )}
                      
                    </div>
                  </div> : null
              )
          )}
        </div>
      </div>
      <Footer />
    </PageErrorBoundary>
  );
};

ApplicationProfilePage.requireAuth = true;
export default connect((state) => {
  return {
    userTags: state.accountInfo.tags,
    questionResponses: state.questionResponses,
  };
})(ApplicationProfilePage);
