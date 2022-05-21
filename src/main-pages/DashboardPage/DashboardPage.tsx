import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../AppPage/AppPage";
import Link from "next/link";
import router, { Router, useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { connect } from "react-redux";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CardTask from "../../common/components/Cards/CardTask/CardTask";
import DropDownQuestion from "../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import {
  Pathway,
  QuestionList,
  AccountInfo,
  PathwayProgress,
} from "src/@types/types";
import PartDropDown from "./components/PartDropdown/PartDropdown";
import DashboardTabButton from "./components/DashboardTabButton/DashboardTabButton";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

// logged in landing page
const DashboardPage: NextApplicationPage<{
  allPathways: Pathway[];
  allCheckins: QuestionList[];
  accountInfo: AccountInfo;
  pathwaysProgress: PathwayProgress[];
}> = ({ allPathways, accountInfo, pathwaysProgress, allCheckins }) => {
  const router = useRouter();
  const session = useSession();
  const [currTab, setCurrTab] = useState("all modules");
  const [isInUserView, setIsInUserView] = useState(false);
  const [percentage, setPercentage] = useState(0);
  console.log(accountInfo);
  console.log(pathwaysProgress);
  const parseId = (objectId) => {
    const objectIdStr = objectId.toString();
    if (!objectIdStr.includes('"')) {
      return objectIdStr;
    }
    return objectIdStr.substring(
      objectIdStr.indexOf('"') + 1,
      objectIdStr.length - 2
    );
  };
  useEffect(() => {
    let totalPathways = 0;
    let finishedPathways = 0;
    allPathways?.forEach((pathway) => {
      if (
        !pathwaysProgress.find(({ pathwayId }) => {
          return pathwayId === parseId(pathway._id);
        })
      ) {
        totalPathways++;
      }
    });
    pathwaysProgress.forEach(({ finished }) => {
      if (finished) {
        finishedPathways++;
      }
      totalPathways++;
    });
    setPercentage(Math.round((finishedPathways / totalPathways) * 100));
  }, []);
  const getCurrentTasks = () => {
    let noProgress = [];
    allPathways?.forEach((pathway) => {
      if (
        !pathwaysProgress.find(({ pathwayId }) => {
          return pathwayId === parseId(pathway._id);
        })
      ) {
        let subtasks = {};
        pathway.modules.forEach(
          ({ name, presetContent, personalizedContent }) => {
            subtasks[name] = { finished: false, contentProgress: [] };
            subtasks[name].contentProgress = presetContent
              .map(() => {
                return false;
              })
              .concat(
                personalizedContent.map(() => {
                  return false;
                })
              );
          }
        );
        const firstUrl = pathway?.modules[0]?.presetContent[0]?.url;
        const videoId = firstUrl?.substring(
          firstUrl?.indexOf("v=") !== -1
            ? firstUrl?.indexOf("v=") + 2
            : firstUrl?.lastIndexOf("/") + 1
        );
        noProgress.push({
          name: pathway.name,
          pathwayId: pathway._id,
          subtasks,
          videoId,
          part: pathway.part,
          order: pathway.order,
        });
      }
    });
    return pathwaysProgress
      .filter(({ finished }) => {
        console.log(finished);
        return !finished;
      })
      .map(({ moduleProgress, name, pathwayId }) => {
        let realPathway = allPathways.find(
          ({ _id }) => parseId(_id) === pathwayId
        );
        let subtasks = {};
        moduleProgress.forEach(({ name, contentProgress }) => {
          let moduleTitle = name;
          subtasks[name] = {
            finished: moduleProgress.find(({ name }) => name === moduleTitle)
              .finished,
            contentProgress: [],
          };
          subtasks[name].contentProgress = contentProgress.map(
            ({ finished }) => finished
          );
        });
        realPathway.modules.forEach(
          ({ name, presetContent, personalizedContent }) => {
            if (subtasks[name] === undefined) {
              subtasks[name] = { finished: false, contentProgress: [] };
              subtasks[name].contentProgress = presetContent
                .map(() => {
                  return false;
                })
                .concat(
                  personalizedContent.map(() => {
                    return false;
                  })
                );
            }
          }
        );
        const firstUrl = realPathway?.modules[0]?.presetContent[0]?.url;
        const videoId = firstUrl?.substring(
          firstUrl?.indexOf("v=") !== -1
            ? firstUrl?.indexOf("v=") + 2
            : firstUrl?.lastIndexOf("/") + 1
        );
        console.log(subtasks);
        return {
          name,
          pathwayId,
          subtasks,
          videoId,
          part: realPathway.part,
          order: realPathway.order,
        };
      })
      .concat(noProgress);
  };
  const getFinishedTasks = () => {
    let pathwaysList = pathwaysProgress
      .filter(({ finished }) => {
        return finished;
      })
      .map(({ moduleProgress, name, pathwayId }) => {
        let realPathway = allPathways.find(
          ({ _id }) => parseId(_id) === pathwayId
        );
        let subtasks = {};
        moduleProgress.forEach(({ name, contentProgress }) => {
          subtasks[name] = { finished: true, contentProgress: [] };
          subtasks[name].contentProgress = contentProgress.map(
            ({ finished }) => finished
          );
        });
        const firstUrl = realPathway?.modules[0]?.presetContent[0]?.url;
        const videoId = firstUrl?.substring(
          firstUrl.indexOf("v=") !== -1
            ? firstUrl?.indexOf("v=") + 2
            : firstUrl?.lastIndexOf("/") + 1
        );
        return {
          name,
          pathwayId,
          subtasks,
          videoId,
          part: realPathway.part,
          order: realPathway.order,
        };
      });
    return pathwaysList;
  };
  const sortIntoParts = (pathwaysList) => {
    console.log(pathwaysList);
    let partsList = [];
    pathwaysList.sort((a, b) => {
      if (!a.part) {
        a.part = "0. No Part";
        a.order = 0;
      }
      if (!b.part) {
        b.part = "0. No Part";
        b.order = 0;
      }
      return (
        parseInt(b.part.substring(0, b.part.indexOf("."))) -
        parseInt(a.part.substring(0, a.part.indexOf(".")))
      );
    });
    let copyOfPathways = pathwaysList.slice();
    for (let i = 0; i < copyOfPathways.length; i++) {
      let pathway = copyOfPathways[i];
      let filteredCheckinsPathways = copyOfPathways.filter(
        (element) => element.part === pathway.part
      );
      filteredCheckinsPathways.push(
        ...allCheckins.filter(({ part }) => part === pathway.part)
      );
      console.log(filteredCheckinsPathways);
      partsList.push(filteredCheckinsPathways);
      copyOfPathways = copyOfPathways.filter(
        (element) => element.part !== pathway.part
      );
      i = -1;
    }
    partsList.sort((a, b) => {
      return (
        parseInt(a[0].part.substring(0, a[0].part.indexOf("."))) -
        parseInt(b[0].part.substring(0, b[0].part.indexOf(".")))
      );
    });
    let partsComponents = [];
    partsList.forEach((part) => {
      part.sort((a, b) => b.order - a.order);
      let finished = 0;
      let total = 0;
      part.forEach(({ subtasks }) => {
        if (!subtasks) {
          return;
        }
        Object.keys(subtasks).forEach((subtask, index) => {
          if (subtasks[subtask].finished) {
            finished++;
          }
        });
        total += Object.keys(subtasks).length;
      });
      partsComponents.push(
        <PartDropDown
          progressRatio={finished / total}
          pathwayCheckinList={part}
          title={part[0].part}
        />
      );
    });
    return partsComponents;
  };
  // const asyncUseEffect = async () => {
  //   console.time("DASHBOARD");
  //   let json = await (
  //     await fetch(`/api/get-dashboard`, {
  //       method: "POST",
  //       body: JSON.stringify({ userId: session.data.user.uid }),
  //     })
  //   ).json();
  //   console.timeEnd("DASHBOARD");
  // };
  useEffect(() => {
    //resetProgress();
    // asyncUseEffect();
  }, []);
  //UNCOMMENT THIS ONCE TESTING IS FINISHED
  if (accountInfo.checkIns.length > 0) {
    router.push({
      pathname: "/check-ins/[checkIn]",
      query: { checkIn: accountInfo.checkIns },
    });
  }
  if (session.data?.user?.email === "test31@gmail.com" && !isInUserView) {
    return (
      <div className="container-fluid p-5 align-items-center d-flex flex-column">
        <button
          onClick={() => {
            setIsInUserView(true);
          }}
        >
          Switch to User View
        </button>
        <div className="container-fluid p-5 d-flex flex-row justify-content-between">
          <button
            onClick={() => {
              router.push({
                pathname: "/upload/learning-pathways-upload",
              });
            }}
          >
            Learning Pathways
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/upload/resources-upload",
              });
            }}
          >
            Resources
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/upload/question-upload",
              });
            }}
          >
            User Progress Questions
          </button>
        </div>
      </div>
    );
  }
  let currentTasks = getCurrentTasks();
  let finishedTasks = getFinishedTasks();
  let sortedParts = [];
  if (currTab === "current tasks") {
    sortedParts = sortIntoParts(currentTasks);
  } else if (currTab === "finished tasks") {
    sortedParts = sortIntoParts(finishedTasks);
  } else {
    sortedParts = sortIntoParts(currentTasks.concat(finishedTasks));
  }
  return (
    <PageErrorBoundary>
      <div className="vh-100">
        {/* {session.data?.user?.email === "test31@gmail.com" ? (
        <button
          onClick={() => {
            setIsInUserView(false);
          }}
        >
          Switch to Admin View
        </button>
      ) : null} */}

        <div
          className="w-full md:w-auto"
          style={{ backgroundColor: "lightgray" }}
        >
          <div
            className="w-full md:w-auto py-5 d-flex flex-row justify-content-around"
            style={{ backgroundColor: "#F2F2F7" }}
          >
            <div className="px-5">
              <button
                onClick={() => {
                  setIsInUserView(false);
                }}
              >
                Switch to Admin View
              </button>
              <h1>
                <strong style={{ color: "#2651ED", fontSize: "1em" }}>
                  Personalized 12th grade videos for {accountInfo.name}
                </strong>
              </h1>
              <h2>
                <strong className="" style={{ fontSize: "1.3em" }}>
                  Need more personalized videos?
                </strong>
              </h2>
              <h3 className="" style={{ fontSize: "1.6em" }}>
                The learning modules are tailored to you based on your current
                checkin
                <br></br>
                progress. Complete the checkin questions to receive more
                personalized content!
              </h3>
            </div>
            <div
              className="d-flex flex-row align-items-center justify-content-between align-self-end"
              style={{ height: "10vh", width: "20vw" }}
            >
              <div style={{ width: "4vw" }}>
                <CircularProgressbarWithChildren
                  strokeWidth={10}
                  children={
                    <div
                      style={{ fontWeight: "bold", fontSize: "1.1em" }}
                    >{`${percentage}%`}</div>
                  }
                  className="center-child"
                  styles={{
                    text: {
                      fontWeight: "bold",
                    },
                    trail: {
                      stroke: "#d6d6d6",
                    },
                    path: {
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      stroke: "#2651ed",
                    },
                  }}
                  value={percentage}
                />
              </div>
              <button style={{ height: "6vh" }} className="cl-btn-blue">
                Update Checkin Questions
              </button>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div
          className="d-flex flex-row w-100 px-5 ms-5 mb-3"
          style={{
            borderBottom: "3px solid #656565",
            maxWidth: "95vw",
          }}
        >
          <div className="ms-2" />
          <DashboardTabButton
            onClick={() => {
              setCurrTab("all modules");
            }}
            title="All Modules"
            currTab={currTab}
          />
          <DashboardTabButton
            onClick={() => {
              setCurrTab("current tasks");
            }}
            title="Current Tasks"
            currTab={currTab}
          />
          <DashboardTabButton
            onClick={() => {
              setCurrTab("finished tasks");
            }}
            title="Finished Tasks"
            currTab={currTab}
          />
          <div style={{ flex: 1 }} />
          <DropDownQuestion
            isForDashboard
            isForWaitlist
            onChange={(value) => {}}
            defaultValue={"11th Grade"}
            valuesList={["11th Grade", "12th Grade"]}
          />
          <div className="me-4" />
        </div>
        <div className="container-fluid align-self-center mx-0 px-5 pb-5 mx-5 justify-content-evenly">
          <div className="row w-100 flex-wrap">
            {currTab === "current tasks" ? (
              sortedParts.length > 0 ? (
                sortedParts
              ) : (
                <div
                  className="container-fluid center-child"
                  style={{ height: "40vh" }}
                >
                  You have no current tasks.
                </div>
              )
            ) : null}
            {currTab === "finished tasks" ? (
              finishedTasks.length > 0 ? (
                sortedParts
              ) : (
                <div
                  className="container-fluid center-child"
                  style={{ height: "40vh" }}
                >
                  Any finished tasks will appear here.
                </div>
              )
            ) : null}
            {currTab === "all modules" ? (
              sortedParts.length > 0 ? (
                sortedParts
              ) : (
                <div
                  className="container-fluid center-child"
                  style={{ height: "40vh" }}
                >
                  Any modules will appear here.
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

DashboardPage.requireAuth = true;
export default connect((state) => ({
  accountInfo: state.accountInfo,
  pathwaysProgress: state.pathwaysProgress,
}))(DashboardPage);
