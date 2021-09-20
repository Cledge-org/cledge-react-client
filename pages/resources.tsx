import { useState } from "react";
import CardComponent from "../components/common/CardComponent";

export default function Resources() {
  const cledgeBlue = "#2651ed";
  const [currTab, setCurrTab] = useState("resources");
  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex flex-row align-items-center justify-content-evenly"
        style={{ width: "35%" }}
      >
        <button
          onClick={() => {
            setCurrTab("resources");
          }}
          className="resources-tab-nav-btn"
        >
          <div style={{ width: "fit-content" }}>
            Resources
            <div
              style={{
                height: "3px",
                backgroundColor:
                  currTab === "resources" ? cledgeBlue : "transparent",
              }}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setCurrTab("articles");
          }}
          className="resources-tab-nav-btn"
        >
          <div style={{ width: "fit-content" }}>
            Articles
            <div
              style={{
                height: "3px",
                backgroundColor:
                  currTab === "articles" ? cledgeBlue : "transparent",
              }}
            />
          </div>
        </button>
        <button
          onClick={() => {
            setCurrTab("videos");
          }}
          className="resources-tab-nav-btn"
        >
          <div style={{ width: "fit-content" }}>
            Videos
            <div
              style={{
                height: "3px",
                backgroundColor:
                  currTab === "videos" ? cledgeBlue : "transparent",
              }}
            />
          </div>
        </button>
      </div>
      <div className="align-self-center d-flex flex-row flex-wrap w-100 justify-content-evenly">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}

Resources.requireAuth = true;