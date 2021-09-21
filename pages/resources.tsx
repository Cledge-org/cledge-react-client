import { useState } from "react";
import CardComponent from "../components/common/CardComponent";
// import bootstrap from "bootstrap";

export default function resources() {
  const [currTab, setCurrTab] = useState("resources");
  return (
    <div
      className="d-flex flex-column container-fluid"
      style={{ minHeight: "92vh" }}
    >
      <ul
        className="nav justify-content-evenly"
        role="tablist"
        style={{ width: "45%" }}
      >
        <TabNavBtn
          name="Resources"
          currTab={currTab}
          setCurrTab={setCurrTab.bind(this)}
        />
        <TabNavBtn
          name="Articles"
          currTab={currTab}
          setCurrTab={setCurrTab.bind(this)}
        />
        <TabNavBtn
          name="Videos"
          currTab={currTab}
          setCurrTab={setCurrTab.bind(this)}
        />
      </ul>
      <div className="tab-content">
        <div
          className={
            currTab === "resources"
              ? "resources-tab-pane resources-active"
              : "resources-tab-pane"
          }
          id="resources"
        >
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithImg"
          />
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithImg"
          />
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithImg"
          />
        </div>
        <div
          className={
            currTab === "articles"
              ? "resources-tab-pane resources-active"
              : "resources-tab-pane"
          }
          id="articles"
        >
          <CardComponent
            url=""
            title="SAT Vocabulary III"
            titleGradients="dark"
            centerText="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            variant="article"
          />
          <CardComponent
            url=""
            title="SAT Vocabulary III"
            titleGradients="dark"
            centerText="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            variant="article"
          />
          <CardComponent
            url=""
            title="SAT Vocabulary III"
            titleGradients="dark"
            centerText="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            variant="article"
          />
        </div>
        <div
          className={
            currTab === "videos"
              ? "resources-tab-pane resources-active"
              : "resources-tab-pane"
          }
          id="videos"
        >
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithVid"
          />
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithVid"
          />
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithVid"
          />
        </div>
      </div>
    </div>
  );
}
export function TabNavBtn({ currTab, setCurrTab, name }) {
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
