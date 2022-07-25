import React, { useEffect, useMemo, useState } from "react";
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
import PartDropDown from "./components/PartDropdown/PartDropdown";
import DashboardTabButton from "./components/DashboardTabButton/DashboardTabButton";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

// logged in landing page
const DashboardPage: NextApplicationPage<{
  dashboardParts: PathwayPart[];
  accountInfo: AccountInfo;
  pathwaysProgress: PathwayProgress[];
}> = ({ dashboardParts, accountInfo, pathwaysProgress }) => {
  const router = useRouter();
  const session = useSession();
  const [currTab, setCurrTab] = useState("all modules");
  const [isInUserView, setIsInUserView] = useState(false);
  const [percentage, setPercentage] = useState(0);
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
    const allPathways: Pathway[] = dashboardParts
      .map(({ dynamicRoutes }) => {
        return dynamicRoutes.map(({ route }) => route);
      })
      .reduce((prev, curr) => {
        return prev.concat(curr);
      }, []);
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
  const getCurrentTasks = (allPathways: Pathway[]) => {
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
        noProgress.push({
          name: pathway.name,
          pathwayId: pathway._id,
          subtasks,
          coverImage: pathway.coverImage,
        });
      }
    });
    return pathwaysProgress
      .filter(({ finished, pathwayId }) => {
        //console.log(finished);
        return (
          !finished && allPathways.find(({ _id }) => parseId(_id) === pathwayId)
        );
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
        return {
          name,
          pathwayId,
          subtasks,
          coverImage: realPathway.coverImage,
        };
      })
      .concat(noProgress);
  };
  const getFinishedTasks = (allPathways: Pathway[]) => {
    let pathwaysList = pathwaysProgress
      .filter(({ finished, pathwayId }) => {
        return (
          finished && allPathways.find(({ _id }) => parseId(_id) === pathwayId)
        );
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
        //console.log(realPathway.coverImage);
        return {
          name,
          pathwayId,
          subtasks,
          coverImage: realPathway.coverImage,
        };
      });
    return pathwaysList;
  };
  const sortPathwaysCheckins = (
    currentTasks,
    finishedTasks,
    checkIns,
    originalArr
  ) => {
    return originalArr
      .map(({ type, route }) => {
        if (type === "pathway") {
          return (
            (currentTasks &&
              currentTasks.find(({ pathwayId }) => pathwayId === route._id)) ||
            (finishedTasks &&
              finishedTasks.find(({ pathwayId }) => pathwayId === route._id))
          );
        }
        return checkIns.find(({ _id }) => _id === route._id);
      })
      .filter((route) => route !== undefined);
  };
  const partComponents = useMemo(() => {
    return dashboardParts
      .map((part) => {
        const allPathways = part.dynamicRoutes
          .filter(({ type }) => type === "pathway")
          .map(({ route }) => route);
        const currTaskPathways = getCurrentTasks(allPathways);
        const finishedPathways = getFinishedTasks(allPathways);
        const sortedRoutes = sortPathwaysCheckins(
          currTab !== "finished tasks" && currTaskPathways,
          currTab !== "current tasks" && finishedPathways,
          part.dynamicRoutes
            .filter(({ type }) => type === "checkin")
            .map(({ route }) => route),
          part.dynamicRoutes
        );
        return (
          sortedRoutes.length > 0 && (
            <PartDropDown
              progressRatio={
                finishedPathways.length /
                (currTaskPathways.length + finishedPathways.length)
              }
              pathwayCheckinList={sortedRoutes}
              title={`${part.order}. ${part.name}`}
            />
          )
        );
      })
      .filter((part) => part);
  }, [currTab, dashboardParts, accountInfo, pathwaysProgress]);
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
                pathname: "/admin/learning-pathways-upload",
              });
            }}
          >
            Learning Pathways
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/pathways-part-upload",
              });
            }}
          >
            Pathway Parts
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/student-progress-download",
              });
            }}
          >
            Download User Pathway Progress
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/resources-upload",
              });
            }}
          >
            Resources
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/question-upload",
              });
            }}
          >
            User Progress Questions
          </button>
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/blog-upload",
              });
            }}
          >
            Blog
          </button>
        </div>
      </div>
    );
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
              {/* <button style={{ height: "6vh" }} className="cl-btn-blue">
                Update Checkin Questions
              </button> */}
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
          {/* <DropDownQuestion
            isForDashboard
            isForWaitlist
            onChange={(value) => {}}
            defaultValue={"11th Grade"}
            valuesList={["11th Grade", "12th Grade"]}
          /> */}
          <div className="me-4" />
        </div>
        <div className="container-fluid align-self-center mx-0 px-5 pb-5 mx-5 justify-content-evenly">
          <div className="row w-100 flex-wrap">
            {partComponents.length > 0 ? (
              partComponents
            ) : (
              <div
                className="container-fluid center-child"
                style={{ height: "40vh" }}
              >
                You have no{" "}
                {currTab === "finished tasks"
                  ? "finished"
                  : currTab === "current tasks"
                  ? "current"
                  : ""}
                tasks.
              </div>
            )}
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
