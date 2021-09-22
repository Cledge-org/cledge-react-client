import { useState } from "react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import TabButton from "../components/common/TabButton";

export default function resources() {
  const [currTab, setCurrTab] = useState("resources");
  return (
    <div className="d-flex flex-column vh-100">
      <div className="row">
        <TabButton
          onClick={() => {
            setCurrTab("resources");
          }}
          title="Resources"
          currTab={currTab}
        />
        <TabButton
          onClick={() => {
            setCurrTab("articles");
          }}
          title="Articles"
          currTab={currTab}
        />
        <TabButton
          onClick={() => {
            setCurrTab("videos");
          }}
          title="Videos"
          currTab={currTab}
        />
      </div>

      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {currTab === "resources" ? (
          <div className="row jusify-content-evenly">
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
        {currTab === "articles" ? (
          <div className="row">
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
        {currTab === "videos" ? (
          <div className="row">
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
