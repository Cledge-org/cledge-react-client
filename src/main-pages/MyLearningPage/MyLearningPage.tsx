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
import DashboardTabButton from "./components/MyLearningTabButton/MyLearningTabButton";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import { useLocation } from "src/utils/hooks/useLocation";
import Image from "next/image";
import emptyImgGray from './empty-img-gray.png';
// logged in landing page
const MyLearningPage: NextApplicationPage<{
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
        <div
          className="container-fluid p-5 d-flex flex-column justify-content-evenly align-items-center"
          style={{ height: "90vh" }}
        >
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
          <button
            onClick={() => {
              router.push({
                pathname: "/admin/chatbot-counselor-questions",
              });
            }}
          >
            Chatbot Counselor Questions
          </button>
        </div>
      </div>
    );
  }
  return (
    <PageErrorBoundary>
      <div className="vh-100" style={{ backgroundColor: "#FAFCFF" }}>
        <div className="w-full md:w-auto" style={{ backgroundColor: "white" }}>
          <div className="w-full py-5 px-5 mx-3 d-flex flex-row align-items-center justify-content-between">
            <div className="px-5">
              {session.data?.user?.email === "test31@gmail.com" && (
                <button
                  onClick={() => {
                    setIsInUserView(false);
                  }}
                >
                  Switch to Admin View
                </button>
              )}
              <h1>
                <strong style={{ color: "#2651ED", fontSize: "1em" }}>
                  {accountInfo.name}'s Personalized Learning Pathways
                </strong>
              </h1>
              <h3 className="" style={{ fontSize: "1.2em" }}>
                Learning modules are dynamically created for you based off the
                information you tell us.
                <br />
                Keep your profile up to date to get the most personalized
                content!
              </h3>
            </div>
            <div style={{ width: "80px", height: "80px" }}>
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
          </div>
        </div>
        <div
          className="d-flex flex-row w-100 px-5"
          style={{
            backgroundColor: "white",
            borderBottom: "2px solid #D3D3D3",
          }}
        >
          <div className="ms-5 ps-3" />
          <DashboardTabButton
            onClick={() => {
              setCurrTab("all modules");
            }}
            title="All Modules"
            currTab={currTab}
          />
          {/* <DashboardTabButton
            onClick={() => {
              setCurrTab("current tasks");
            }}
            title="Current Tasks"
            currTab={currTab}
          /> */}
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
        <div style={{ backgroundColor: "#FAFCFF" }}>
          <div className="container-fluid align-self-center mx-0 px-5 pb-5 mx-5 justify-content-evenly">
            <div className="row w-100 flex-wrap">
              {partComponents.length > 0 ? (
                partComponents
              ) : (
                <div
                  className="container-fluid center-child"
                  style={{ height: "40vh", display: "flex", flexDirection: "column" }}
                >
                  <Image src={emptyImgGray} />
                  <p>
                    Oops, nothing here yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

MyLearningPage.requireAuth = true;
export default connect((state) => ({
  accountInfo: state.accountInfo,
  pathwaysProgress: state.pathwaysProgress,
}))(MyLearningPage);
