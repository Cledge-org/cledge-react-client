import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
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
import { getDashboardInfo } from "./api/get-dashboard";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: { pathwaysInfo: await getDashboardInfo("testUser") } };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const Dashboard: NextApplicationPage<{ pathwaysInfo: Dashboard }> = ({
  pathwaysInfo,
}) => {
  const router = useRouter();
  const session = useSession();
  const [currTab, setCurrTab] = useState("current tasks");
  const getCurrentTasks = () => {
    // if(pathwaysInfo.userProgress === undefined){
    //   return
    // }
    return pathwaysInfo.userProgress
      .filter(({ finished }) => {
        return !finished;
      })
      .map(({ moduleProgress, title, id }) => {
        let subtasks = {};
        moduleProgress.forEach(({ title }) => {
          let moduleTitle = title;
          subtasks[title] = moduleProgress.find(
            ({ title }) => title === moduleTitle
          ).finished;
        });
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${id}`}
            textGradient="light"
            title={title}
            subtasks={subtasks}
          />
        );
      });
  };
  const getFinishedTasks = () => {
    return pathwaysInfo.userProgress
      .filter(({ finished }) => {
        return finished;
      })
      .map(({ moduleProgress, title, id }) => {
        let subtasks = {};
        moduleProgress.forEach(({ title }) => {
          subtasks[title] = true;
        });
        return (
          <CardTask
            url={"/pathways/[id]"}
            correctUrl={`/pathways/${id}`}
            textGradient="light"
            title={title}
            subtasks={subtasks}
          />
        );
      });
  };
  if (session.data.user.email === "") {
    //"yousefgomaa@hotmail.com") {
    return (
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
    );
  }
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <h1 className="pt-2 red-purple-text-gradient fw-bold">
          <strong>
            Welcome back, {pathwaysInfo.userName}
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
          <div className="row w-100">{getCurrentTasks()}</div>
        ) : null}
        {currTab === "finished tasks" ? (
          <div className="row w-100">{getFinishedTasks()}</div>
        ) : null}
      </div>
    </div>
  );
};
Dashboard.requireAuth = true;
export default Dashboard;
