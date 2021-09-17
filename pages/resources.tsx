import { useState } from "react";
import CardComponent from "../components/common/CardComponent";

export default function resources() {
  const [currTab, setCurrTab] = useState("resources");
  const getCurrScreen = () => {
    switch (currTab) {
      case "resources":
        return (
          <div className="align-self-center d-flex flex-row flex-wrap w-100 justify-content-evenly">
            <CardComponent
              title="SAT Vocabulary III"
              titleGradients="normal"
              variant="titleWithImg"
            />
          </div>
        );
      case "videos":
        return (
          <div className="align-self-center d-flex flex-row flex-wrap w-100 justify-content-evenly">
            <CardComponent
              title="SAT Vocabulary III"
              titleGradients="dark"
              centerText="Lorem ipsum"
              variant="article"
            />
          </div>
        );
      default:
        return (
          <div className="align-self-center d-flex flex-row flex-wrap w-100 justify-content-evenly">
            <CardComponent />
          </div>
        );
    }
  };
  return (
    <div
      className="d-flex flex-column container-fluid"
      style={{ height: "92vh" }}
    >
      <div
        className="d-flex flex-row align-items-center justify-content-evenly"
        style={{ width: "45%" }}
      >
        <TabNavBtn
          name="Resources"
          currTab={currTab}
          setCurrTab={(value) => setCurrTab(value)}
        />
        <TabNavBtn
          name="Articles"
          currTab={currTab}
          setCurrTab={(value) => setCurrTab(value)}
        />
        <TabNavBtn
          name="Videos"
          currTab={currTab}
          setCurrTab={(value) => setCurrTab(value)}
        />
      </div>
      {getCurrScreen()}
    </div>
  );
}
function TabNavBtn(props) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  return (
    <button
      onClick={() => {
        props.setCurrTab(props.name.toLowerCase());
      }}
      className="resources-tab-nav-btn"
    >
      <div
        style={{
          width: "fit-content",
          color:
            props.currTab === props.name.toLowerCase() ? cledgeBlue : midGray,
          fontWeight: props.currTab === props.name.toLowerCase() ? 700 : 500,
        }}
      >
        {props.name}
        <div
          style={{
            height: "3px",
            backgroundColor:
              props.currTab === props.name.toLowerCase()
                ? cledgeBlue
                : "transparent",
          }}
        />
      </div>
    </button>
  );
}
