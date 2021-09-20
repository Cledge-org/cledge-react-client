import { useState } from "react";
import CardComponent from "../components/common/CardComponent";
// import bootstrap from "bootstrap";

export default function resources() {
  return (
    <div
      className="d-flex flex-column container-fluid"
      style={{ height: "92vh" }}
    >
      <ul
        className="nav nav-tabs justify-content-evenly"
        role="tablist"
        style={{ width: "45%" }}
      >
        <TabNavBtn name="Resources" />
        <TabNavBtn name="Articles" />
        <TabNavBtn name="Videos" />
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane active"
          id="resources"
          role="tabpanel"
          aria-labelledby="resources-tab"
        >
          <CardComponent
            url=""
            title="Junior Developers"
            titleGradients="normal"
            variant="titleWithImg"
          />
        </div>
        <div
          className="tab-pane"
          id="articles"
          role="tabpanel"
          aria-labelledby="articles-tab"
        >
          <CardComponent
            url=""
            title="SAT Vocabulary III"
            titleGradients="dark"
            centerText="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            variant="article"
          />
        </div>
        <div
          className="tab-pane"
          id="videos"
          role="tabpanel"
          aria-labelledby="videos-tab"
        >
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
function TabNavBtn(props) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = props.name.toLowerCase();
  return (
    <li className="nav-item">
      <button
        className="resources-tab-nav-btn"
        id={lowerCaseName + "-tab"}
        data-bs-toggle="tab"
        data-bs-target={"#" + lowerCaseName}
        type="button"
        role="tab"
        aria-controls={lowerCaseName}
        aria-selected={lowerCaseName == "resources"}
        onClick={() => {
          // var trigger = document.querySelector("#" + lowerCaseName);
          // var tab = new bootstrap.Tab(trigger);
          // tab.show();
        }}
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
    </li>
  );
}
