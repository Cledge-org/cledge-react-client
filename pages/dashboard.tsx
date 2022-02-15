import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { getSession, useSession } from "next-auth/react";
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
import { getAllPathwaysAccountAndProgress } from "./api/get-dashboard";
import { connect } from "react-redux";

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
  const [currTab, setCurrTab] = useState("current tasks");
  const [isInUserView, setIsInUserView] = useState(false);
  console.log(accountInfo);
  const getCurrentTasks = () => {
    let noProgress = [];
    allPathways?.forEach((pathway) => {
      if (
        !pathwaysProgress.find(({ pathwayId }) => {
          return pathwayId === pathway._id;
        })
      ) {
        let subtasks = {};
        pathway.modules.forEach(({ name }) => {
          subtasks[name] = false;
        });
        noProgress.push(
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathway._id}`}
            textGradient="light"
            title={pathway.name}
            subtasks={subtasks}
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
        let subtasks = {};
        moduleProgress.forEach(({ name }) => {
          let moduleTitle = name;
          subtasks[name] = moduleProgress.find(
            ({ name }) => name === moduleTitle
          ).finished;
        });
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathwayId}`}
            textGradient="light"
            title={name}
            subtasks={subtasks}
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
        let subtasks = {};
        moduleProgress.forEach(({ name }) => {
          subtasks[name] = true;
        });
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${pathwayId}`}
            textGradient="light"
            title={name}
            subtasks={subtasks}
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
      pathname: "/[questionnaire]",
      query: { questionnaire: accountInfo.checkIns },
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
    <div className="container-fluid p-5">
      {session.data?.user?.email === "test31@gmail.com" ? (
        <button
          onClick={() => {
            setIsInUserView(false);
          }}
        >
          Switch to Admin View
        </button>
      ) : null}
      <div className="row">
        <h1 className="pt-2 red-purple-text-gradient fw-bold">
          <strong>
            Welcome back, {accountInfo.name}
            <br />
            This is your home page.
            <br />
          </strong>
        </h1>
      </div>
      <br />
      <br />
      <div className="d-flex flex-row w-100">
        <TabButton
          onClick={() => {
            setCurrTab("current tasks");
          }}
          title="Current Tasks"
          currTab={currTab}
        />
        <div className="px-2" />
        <TabButton
          onClick={() => {
            setCurrTab("finished tasks");
          }}
          title="Finished Tasks"
          currTab={currTab}
        />
      </div>
      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {currTab === "current tasks" ? (
          <div className="row w-100">
            {currentTasks.length > 0 ? (
              currentTasks
            ) : (
              <div
                className="container-fluid center-child"
                style={{ height: "40vh" }}
              >
                You have no current tasks.
              </div>
            )}
          </div>
        ) : null}
        {currTab === "finished tasks" ? (
          <div className="row w-100">
            {finishedTasks.length > 0 ? (
              finishedTasks
            ) : (
              <div
                className="container-fluid center-child"
                style={{ height: "40vh" }}
              >
                Any finished tasks will appear here.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
Dashboard.requireAuth = true;
export default connect((state) => ({
  accountInfo: state.accountInfo,
  pathwaysProgress: state.pathwaysProgress,
}))(Dashboard);
