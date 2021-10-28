import React, { useEffect, useState } from "react";
import DropDownTab from "../components/common/DropDown_Tab";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
//profile progress/ question summary page
export default function Pathways() {
  const [currPage, setCurrPage] = useState("");
  useEffect(() => {
    console.log(currPage);
  }, [currPage]);
  return (
    <div
      className="container-fluid d-flex flex-row px-0"
      style={{ height: "94vh" }}
    >
      <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
        <DropDownTab
          chunkList={["Preset Video"]}
          onClick={() => setCurrPage("test")}
          title="ACT"
          isPathway
          percentComplete={67}
        />
        <DropDownTab
          chunkList={["Preset Video 1", "Preset Video 2"]}
          onClick={() => setCurrPage("extracurricular")}
          title="SAT"
          isPathway
          percentComplete={67}
        />
      </div>
      <div className="d-flex flex-column" style={{ flex: 3 }}>
        <div className="w-100" style={{ height: "55%" }}>
          <YoutubeEmbed isPathway videoId={"LA1tah85dvA"} />
        </div>
        <div className="container-fluid center-child py-5">
          <div className="pathway-description">
            <span
              className="fw-bold cl-dark-text"
              style={{ fontSize: "1.7em" }}
            >
              Preset Video
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Pathways.requireAuth = false;
