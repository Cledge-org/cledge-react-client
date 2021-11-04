import {
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
import { getPathwaysInfo } from "./api/get-pathways-info";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "./_app";
import Pathways from "./pathways";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: { pathwaysInfo: await getPathwaysInfo("testUser") } };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const Dashboard: NextApplicationPage<{ pathwaysInfo: Pathways }> = ({
  pathwaysInfo,
}) => {
  const [currTab, setCurrTab] = useState("current tasks");
  const [showingPathways, setShowingPathways] = useState(false);
  const [courseIndex, setCourseIndex] = useState(-1);
  const getCurrentTasks = () => {
    return pathwaysInfo.pathways
      .filter(({ title }) => {
        let courseTitle = title;
        return !pathwaysInfo.userProgress.find(
          ({ title }) => courseTitle === title
        ).finished;
      })
      .map(({ modules, title }, index) => {
        let subtasks = {};
        let courseTitle = title;
        let courseProgress = pathwaysInfo.userProgress.find(
          ({ title }) => courseTitle === title
        );
        modules.forEach(({ title }) => {
          let moduleTitle = title;
          subtasks[title] = courseProgress.moduleProgress.find(
            ({ title }) => title === moduleTitle
          ).finished;
        });
        return (
          <CardTask
            onClick={() => {
              setCourseIndex(index);
              setShowingPathways(true);
            }}
            textGradient="light"
            title={title}
            subtasks={subtasks}
          />
        );
      });
  };
  const getFinishedTasks = () => {
    return pathwaysInfo.pathways
      .filter(({ title }) => {
        let courseTitle = title;
        return pathwaysInfo.userProgress.find(
          ({ title }) => courseTitle === title
        ).finished;
      })
      .map(({ modules, title }, index) => {
        let subtasks = {};
        modules.forEach(({ title }) => {
          subtasks[title] = true;
        });
        return (
          <CardTask
            onClick={() => {
              setCourseIndex(index);
              setShowingPathways(true);
            }}
            textGradient="light"
            title={title}
            subtasks={subtasks}
          />
        );
      });
  };
  if (showingPathways) {
    return (
      <Pathways
        pathway={pathwaysInfo.pathways[courseIndex]}
        userTags={pathwaysInfo.userTags}
      />
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
          <div className="row">
            {/* {x upcoming tasks in next 6 months</div> */}
            {getCurrentTasks()}
          </div>
        ) : null}
        {currTab === "finished tasks" ? (
          <div className="row">{getFinishedTasks()}</div>
        ) : null}
      </div>
    </div>
  );
};
Dashboard.requireAuth = false;
export default Dashboard;
