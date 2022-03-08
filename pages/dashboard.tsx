import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import CardTask from "../components/common/Card_Task";
import TabButton from "../components/common/TabButton";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "./_app";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import getAccountInfo from "./api/get-account";
import { getPathwayProgress } from "./api/get-pathway-progress";
import { getAllPathwayProgress } from "./api/get-all-pathway-progress";
import { ORIGIN_URL } from "../config";
import AuthFunctions from "./api/auth/firebase-auth";
import { connect } from "react-redux";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        allPathways: await (
          await fetch(`${ORIGIN_URL}/api/get-all-pathways`)
        ).json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const Dashboard: NextApplicationPage<{
  allPathways: Pathway[];
  accountInfo: AccountInfo;
  pathwaysProgress: PathwayProgress[];
}> = ({ allPathways, accountInfo, pathwaysProgress }) => {
  console.error(allPathways);
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
        noProgress.push(
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathway._id}`}
            title={pathway.name}
            subtasks={subtasks}
            videoId={videoId}
          />
        );
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
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathwayId}`}
            title={name}
            subtasks={subtasks}
            videoId={videoId}
          />
        );
      })
      .concat(noProgress);
  };
  const getFinishedTasks = () => {
    return pathwaysProgress
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
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathwayId}`}
            title={name}
            subtasks={subtasks}
            videoId={videoId}
          />
        );
      });
  };
  // const asyncUseEffect = async () => {
  //   console.time("DASHBOARD");
  //   let json = await (
  //     await fetch(`${ORIGIN_URL}/api/get-dashboard`, {
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
  console.log(currentTasks);
  console.log(finishedTasks);
  return (
    <div>
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
          <div>
            <h1>
              <strong style={{ color: "#2651ED", fontSize: 28 }}>
                Personalized 12th grade videos for {accountInfo.name}
              </strong>
            </h1>
            <h2>
              <strong className="" style={{}}>
                Need more personalized videos?
              </strong>
            </h2>
            <h3 className="" style={{}}>
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
      <div className="d-flex flex-row w-100 px-5 ms-5 mb-3">
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
      </div>
      <div className="container-fluid align-self-center mx-0 px-5 pb-5 mx-5 justify-content-evenly">
        <div className="row w-100">
          {currTab === "current tasks" || currTab === "all modules" ? (
            currentTasks.length > 0 ? (
              currentTasks
            ) : (
              <div
                className="container-fluid center-child"
                style={{ height: "40vh" }}
              >
                You have no current tasks.
              </div>
            )
          ) : null}
          {currTab === "finished tasks" || currTab === "all modules" ? (
            finishedTasks.length > 0 ? (
              finishedTasks
            ) : (
              <div
                className="container-fluid center-child"
                style={{ height: "40vh" }}
              >
                Any finished tasks will appear here.
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};
interface DashboardTabButtonProps {
  onClick: Function;
  title: String;
  currTab: String;
}
function DashboardTabButton({
  onClick,
  title,
  currTab,
}: DashboardTabButtonProps) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return (
    <li
      className="general-tab-nav-btn col-3 col-lg-2 flex-column"
      id={lowerCaseName + "-tab"}
      style={{ border: "none" }}
      onClick={() => {
        onClick(lowerCaseName);
      }}
    >
      <div
        style={{
          width: "fit-content",
          color: currTab === lowerCaseName ? cledgeBlue : midGray,
          fontWeight: currTab === lowerCaseName ? 700 : 500,
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: "3px",
          width: "100%",
          backgroundColor: currTab === lowerCaseName ? cledgeBlue : midGray,
        }}
      />
    </li>
  );
}
Dashboard.requireAuth = true;
export default connect((state) => ({
  accountInfo: state.accountInfo,
  pathwaysProgress: state.pathwaysProgress,
}))(Dashboard);
