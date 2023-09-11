import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import CardCheckIn from "../../common/components/Cards/CardCheckIn/CardCheckIn";
import TabButton from "../../common/components/TabButton/TabButton";
import Footer from "../../common/components/Footer/Footer";

import { NextApplicationPage } from "../AppPage/AppPage";
import QuestionSubPageHeader from "../../common/components/SubpageHeader/SubpageHeader";
import QuestionSummarySubpage from "./components/QuestionSubPages/QuestionSummarySubpage/QuestionSummarySubpage";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import DropdownTab from "src/common/components/DropdownTab/DropdownTab";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import AcademicsSignUp, { AcademicsProps } from "src/main-pages/CheckInPage/Components/AcademicsSignUp";
import ActivitiesSignUp from "src/main-pages/CheckInPage/Components/ActivitiesSignUp";
import { calculateECActivityPoints, calculateECActivityTier, calculateGPATier, calculateOverallECTier, overallAcademicTier } from "src/utils/student-metrics/metricsCalculations";
import { notification } from "antd";

const ApplicationProfilePage: NextApplicationPage<{
  questionData: QuestionList[];
  userTags: string[];
  questionResponses: UserResponse[];
}> = ({ questionData, userTags, questionResponses }) => {
  const session = useSession();
  const router = useRouter();
  const [currPage, setCurrPage] = useState({ page: "all", chunk: "" });
  const [currAllSectionTab, setCurrAllSectionTab] = useState("upcoming");
  const [academicResponses, setAcademicsResponses] = useState(localStorage.getItem("academicCache") != null ? JSON.parse(localStorage.getItem("academicCache")) : academicData.responses);
  const [activityResponses, setActivityResponses] = useState(localStorage.getItem("activityCache") != null ? JSON.parse(localStorage.getItem("activityCache")) : activityData.responses);
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

  const openNotification = (message: string) => {
    notification.open({
      message: "Success",
      description: message,
      duration: 1,
      placement: "bottomRight"
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
    //console.log(router.query);
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
  //console.log(percentageData.lists);
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
    // gpa tier
    localStorage.setItem("academicCache", JSON.stringify(academicResponses));
    openNotification("Successfully saved your academics!");
    let totalGPA = 0;
    let totalTerms = 0;
    academicResponses.years.forEach((year) => {
      year.terms.forEach((term) => {
        if (term.courses.length > 0 && term.gpa != null) {
          totalGPA += term.gpa;
          totalTerms++;
        }
      })
    })

    let userGPA = totalGPA / totalTerms;

    let userGPATier = await calculateGPATier(2, userGPA);

    if (Number.isNaN(userGPATier)) {
      userGPATier = 0;
    }

    let studentAppLevel = 3;
    questionResponses.forEach((res) => {
      if (res.questionId == "627e8fe7e97c3c14537dc7f5") {
        studentAppLevel = Number.parseInt(res.response.charAt(6));
      }
    })
    let gradeLevel = 9;
    academicResponses.years.forEach((year) => {
      if (year.terms[0].courses.length > 0) {
        gradeLevel++;
      }
    })

    const userOverallAcadmicTier = await overallAcademicTier(gradeLevel, studentAppLevel, totalGPA, 5)

    let userAcademics: Academics = {
      classes: [],
      overallClassTier: 3,
      gpa: totalGPA,
      gpaTier: userGPATier,
      satScore: academicResponses.satScore ? Number.parseFloat(academicResponses.satScore) : 0,
      actScore: academicResponses.actScore ? Number.parseFloat(academicResponses.actScore) : 0,
      overallTier: userOverallAcadmicTier,
      classTip: "",
      gpaTip: "",
      testTip: ""
    }
    try {
      await fetch('/api/metrics/put-academics', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.data.user.uid,
          insertionId: session.data.user.uid,
          academics: userAcademics,
          responses: academicResponses
        }),
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmitActivities = async () => {
    localStorage.setItem("activityCache", JSON.stringify(activityResponses));
    openNotification("Successfully saved your activities!");
    const newActivitiesArr = [];
    let tiersArr = [];
    let totalECPoints = 0;
    activityResponses.forEach((activity) => {
      const tier = calculateECActivityTier(activity.hoursPerWeek, activity.weeksPerYear, activity.numberOfYears, activity.awardLevel);
      const points = calculateECActivityPoints(tier);
      const otherActivity: Activity = {
        activityID: 0,
        actTitle: activity.activityName,
        actType: activity.activityType,
        hoursYear: activity.hoursPerWeek,
        yearsSpent: activity.numberOfYears,
        recogLevel: activity.awardQuality,
        description: activity.description,
        points: points,
        tier: tier,
        category: 0,
        tip: ""
      }
      totalECPoints += points;
      tiersArr.push(tier);
      newActivitiesArr.push(otherActivity);
    })
    const overallECTier = await calculateOverallECTier(tiersArr);
    let userActivities: Activities = {
      activities: newActivitiesArr,
      overallTier: overallECTier,
      totalPoints: totalECPoints
    }
    try {
      await fetch('/api/metrics/put-activities', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.data.user.uid,
          activities: userActivities,
          responses: activityResponses,
          insertionId: session.data.user.uid
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
          className="d-flex flex-column bg-extra-light-gray border-end border-2"
          style={{ width: "20rem" }} // flex: 1
        >
          {questionData.map((list, index) => {
            if (
              list.name === "Onboarding Questions" ||
              list.name === "Extracurriculars" ||
              list.name === "Academics"
            ) {
              return (
                <div className="border-bottom border-2">
                  <div className="mx-2">
                    <DropdownTab
                      isECAC={
                        list.name === "Extracurriculars" ||
                        list.name === "Academics"
                      }
                      chunkList={list.chunks.map((chunk) => chunk.name)}
                      onClick={(chunk) =>
                        setCurrPage({ page: list.name, chunk: chunk })
                      }
                      title={list.name}
                      percentComplete={percentageData.lists[index]}
                    />
                  </div>
                </div>
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
                currPage.page === "Academics" ? 
                  <div className="d-flex justify-content-center w-100">
                    <div className=" my-5" style={{ width: "50vw" }}>
                      <AcademicsSignUp 
                        years={academicResponses.years} 
                        submitData={(e) => setAcademicsResponses(e)} 
                        noRenderButtons={() => setNoRenderButtons(!noRenderButtons)}
                        satScore={academicResponses.satScore}
                        actScore={academicResponses.actScore}
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
