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
  const [currTab, setCurrTab] = useState("currentTasks");
  const [showingPathways, setShowingPathways] = useState(false);
  if (showingPathways) {
    return <Pathways />;
  }
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <h1 className="pt-2 blue-purple-text-gradient">
          <strong>
            Welcome back, {pathwaysInfo.userName}
            <br />
            This is your home page.
            <br />
            Keep track of your progress here.
          </strong>
        </h1>
      </div>
      <br />
      <br />
      <div className="row justify-content-evenly">
        <TabButton
          onClick={() => {
            setCurrTab("currentTasks");
          }}
          title="Current Tasks"
          currTab={currTab}
        />
        <TabButton
          onClick={() => {
            setCurrTab("finishedTasks");
          }}
          title="Finished Tasks"
          currTab={currTab}
        />
      </div>

      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {currTab === "currentTasks" ? (
          <div className="row justify-content-evenly">
            <div>{/* dsfdsf */}x upcoming tasks in next 6 months</div>
            {pathwaysInfo.pathways.map(({ modules, title }) => {
              let subtasks = {};
              modules.forEach(({ title }) => {
                subtasks[title] = false;
              });
              return (
                <CardTask
                  onClick={() => {
                    setShowingPathways(true);
                  }}
                  textGradient="light"
                  title={title}
                  subtasks={subtasks}
                />
              );
            })}
          </div>
        ) : null}
        {currTab === "finishedTasks" ? (
          <div className="row justify-content-evenly">
            <Card
              textGradient="light"
              title={"Base card"}
              child={<div>hello world</div>}
            />
            <CardVideo
              textGradient="light"
              title={"Video card"}
              child={<div>hello world</div>}
              videoId="ZGYSVyWdSRk"
            />
            <CardText
              textGradient="dark"
              title={"Text Card"}
              child={<div>hello world</div>}
              snippet={"hello world"}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
Dashboard.requireAuth = false;
export default Dashboard;
