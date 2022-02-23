import { useState } from "react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import TabButton from "../components/common/TabButton";
import { NextApplicationPage } from "./_app";
import CardImage from "../components/common/Card_Image";
import { GetServerSidePropsContext } from "next";
import { getResourcesInfo } from "./api/get-resources";
import { ORIGIN_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        resourcesInfo: await (
          await fetch(`${ORIGIN_URL}/api/get-resources`)
        ).json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const Resources: NextApplicationPage<{ resourcesInfo: ResourcesInfo }> = ({
  resourcesInfo,
}) => {
  const resourceTypes = [
    "All",
    "Extracurricular",
    "Essay",
    "Application",
    "Standardized Tests",
    "Academics",
    "Grades",
    "Scholarship",
  ];
  const [currTab, setCurrTab] = useState("all");
  return (
    <div className="d-flex flex-column vh-100">
      <div className="d-flex flex-row justify-content-center">
        {resourceTypes.map((type) => {
          return (
            <ResourcesTabButton
              onClick={() => {
                setCurrTab(type.toLowerCase());
              }}
              title={type}
              currTab={currTab}
            />
          );
        })}
        <button className="cl-btn-clear d-flex flex-row align-items-center justify-content-evenly">
          <div className="pe-2">
            <FontAwesomeIcon icon={faFilter} />
          </div>
          Filter
        </button>
      </div>
      {currTab === "all" ? (
        <>
          <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-row justify-content-evenly align-items-center search-container">
              <div className="p-1 cl-mid-gray">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                className="py-1 search-input"
                type="text"
                placeholder="What would you like to know?"
              />
            </div>
          </div>
          <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
            <div className="row jusify-content-evenly">
              {resourcesInfo.resources.map((element) => (
                <CardImage
                  snippet=""
                  title={element.name}
                  textGradient={"light"}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {currTab === "resources" ? (
          <div className="row jusify-content-evenly">
            {resourcesInfo.resources.map((element) => (
              <CardImage
                snippet=""
                title={element.name}
                textGradient={"light"}
              />
            ))}
          </div>
        ) : null}
        {currTab === "articles" ? (
          <div className="row">
            {resourcesInfo.articles.map((element) => (
              <CardText
                snippet=""
                title={element.name}
                textGradient={"light"}
              />
            ))}
          </div>
        ) : null}
        {currTab === "videos" ? (
          <div className="row">
            {resourcesInfo.videoList.map((element) => (
              <CardVideo
                title={element.name}
                textGradient={"light"}
                videoUrl={element.source}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
interface ResourcesTabButtonProps {
  onClick: Function;
  title: String;
  currTab: String;
}
function ResourcesTabButton({
  onClick,
  title,
  currTab,
}: ResourcesTabButtonProps) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return (
    <li
      className="resources-tab-nav-btn"
      id={lowerCaseName + "-tab"}
      onClick={() => {
        onClick(lowerCaseName);
      }}
      style={
        currTab === lowerCaseName
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }
          : {}
      }
    >
      <div
        style={{
          width: "fit-content",
        }}
      >
        {title}
      </div>
    </li>
  );
}
export default Resources;
