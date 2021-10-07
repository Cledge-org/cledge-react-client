import { JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import CardTask from "../components/common/Card_Task";
import TabButton from "../components/common/TabButton";

// logged in landing page
export default function Dashboard (props){
    const [currTab, setCurrTab] = useState("currentTasks");
    
    return (
      <div className="container-fluid p-5">
        <div className="row">
            <h1 className="pt-2 blue-purple-text-gradient"><strong>
                Welcome back, {props.name}
                <br/>This is your home page.
                <br/>Keep track of your progress here.
            </strong></h1>
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
                <div>
                  {/* dsfdsf */}x upcoming tasks in next 6 months
                </div>
              <CardTask
                textGradient="light"
                title={"College 101"}
                subtasks={{"What's the First Thing to Know": true, 
                "Big Future Days": true, 
                "Class 3 of 10": true, 
                "Class 4 of 10": false}}
              />
              <CardTask
                textGradient="light"
                title={"Getting a Head Start"}
                subtasks={{"What's the First Thing to Know": true, 
                "Big Future Days": true, 
                "Class 3 of 10": false}}
              />
              <CardTask
                textGradient="light"
                title={"Register for Your SAT Test"}
                subtasks={{"What's the First Thing to Know": false, 
                "Big Future Days": false, 
                "Class 3 of 10": false}}
              />
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
}