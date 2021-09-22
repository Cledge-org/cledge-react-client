import { useState } from "react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import TabButton from "../components/common/TabButton";

export default function resources() {

  const [currTab, setCurrTab] = useState("resources");
  return (
    <div className="d-flex flex-column">
      <div className="row">
        <TabButton 
          onClick={() => {
            setCurrTab("resources");
          }}
          title = "Resources"
          currTab={currTab}
        />
        <TabButton 
          onClick={() => {
            setCurrTab("articles");
          }}
          title = "Articles"
          currTab={currTab}
        />
        <TabButton 
          onClick={() => {
            setCurrTab("videos");
          }}
          title = "Videos"
          currTab={currTab}
        />
      </div>


      <div className="container align-self-center mx-0 col vw-100 justify-content-evenly">
        <div className='row'>
          <Card title={"Base card"} child={<div>hello world\asdfasdfasdfasdfasdasdfasdfasdfaaaaaaaaaaaaaaaaaaaa</div>} />
          <CardVideo title={"Video card"} child={<div>hello world</div>} url={new URL("https://www.youtube.com/watch?v=ZGYSVyWdSRk")}/>
          <CardText title={"Text Card"} child={<div>hello world</div>} snippet={"hello world\asdfasdfasdfasdfasdasdfasdfasdfaaaaaaaaaaaaaaaaaaaa"}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
          <Card title={"SAT"} child={<div>hello world</div>}/>
        </div>
        
      </div>
    </div>
  );
}
function TabNavBtn({ currTab, setCurrTab, name }) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = name.toLowerCase();
  return (
    <li
      className="resources-tab-nav-btn"
      id={lowerCaseName + "-tab"}
      onClick={() => {
        setCurrTab(lowerCaseName);
      }}
    >
      <div
        style={{
          width: "fit-content",
          color: currTab === lowerCaseName ? cledgeBlue : midGray,
          fontWeight: currTab === lowerCaseName ? 700 : 500,
        }}
      >
        {name}
        <div
          style={{
            height: "3px",
            backgroundColor:
              currTab === lowerCaseName ? cledgeBlue : "transparent",
          }}
        />
      </div>
    </li>
  );
}
