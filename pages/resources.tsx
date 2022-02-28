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
  const [searchTxt, setSearchTxt] = useState("");
  const [currTab, setCurrTab] = useState("all");
  const compare = (searchText: string, itemName: string) => {
    if (searchText.length < 2 || itemName.length < 2) {
      if (itemName.includes(searchText)) {
        return 1;
      }
      return 0;
    }
    let searchTextEveryTwo = new Map();
    for (let i = 0; i < searchText.length - 1; i++) {
      let everyTwo = searchText.substr(i, 2);
      let count = searchTextEveryTwo.has(everyTwo)
        ? searchTextEveryTwo.get(everyTwo) + 1
        : 1;
      searchTextEveryTwo.set(everyTwo, count);
    }
    let matches = 0;
    for (let i = 0; i < itemName.length - 1; i++) {
      let everyTwo = itemName.substr(i, 2);
      let count = searchTextEveryTwo.has(everyTwo)
        ? searchTextEveryTwo.get(everyTwo)
        : 0;
      if (count > 0) {
        searchTextEveryTwo.set(everyTwo, count - 1);
        matches += 2;
      }
    }
    return matches / (searchText.length + itemName.length - 2);
  };
  const filter = (txt: string, originalArray, comparisonArray) => {
    let allItems = [];
    let data = comparisonArray;
    let comparisonValArr = [];
    var index = 0;
    for (var i = 0; i < data.length; i++) {
      let comparisonVal = compare(
        txt.toLowerCase(),
        data[i].name.toLowerCase() +
          (data[i].description ? data[i].description.toLowerCase() : "")
      );
      if (comparisonVal > 0.1) {
        comparisonValArr.push(comparisonVal);
        allItems[index] = originalArray[i];
        index++;
      }
    }
    return allItems;
  };
  const searchAlg = (txt, originalArray, comparisonArray) => {
    if (txt.trim() === "") {
      return originalArray;
    }
    let filteredItems = filter(txt.trim(), originalArray, comparisonArray);
    return filteredItems;
  };
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
        {/* <button className="cl-btn-clear d-flex flex-row align-items-center justify-content-evenly">
          <div className="pe-2" style={{ width: "24px" }}>
            <FontAwesomeIcon icon={faFilter} />
          </div>
          Filter
        </button> */}
      </div>
      <div className="d-flex flex-row justify-content-center">
        <div className="d-flex flex-row justify-content-start align-items-center search-container">
          <div className="p-1 cl-mid-gray" style={{ width: "30px" }}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
            className="py-1 search-input"
            type="text"
            placeholder="What would you like to know?"
          />
        </div>
      </div>
      <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
        {resourceTypes.map((type) => {
          let currType = type.toLowerCase();
          const filteredResources = resourcesInfo.resources.filter(
            ({ category }) =>
              currType === "all"
                ? true
                : category
                ? currType === category
                : true
          );
          const filteredArticles = resourcesInfo.articles.filter(
            ({ category }) =>
              currType === "all"
                ? true
                : category
                ? currType === category
                : true
          );
          const filteredVideos = resourcesInfo.videoList.filter(
            ({ category }) =>
              currType === "all"
                ? true
                : category
                ? currType === category
                : true
          );
          return currTab === currType ? (
            <div className="row jusify-content-evenly">
              {searchAlg(searchTxt, filteredResources, filteredResources).map(
                (element) => (
                  <CardImage
                    snippet=""
                    title={element.name}
                    textGradient={"light"}
                  />
                )
              )}
              {searchAlg(searchTxt, filteredArticles, filteredArticles).map(
                (element) => (
                  <CardText
                    snippet={element.description}
                    title={element.name}
                    textGradient={"light"}
                  />
                )
              )}
              {searchAlg(searchTxt, filteredVideos, filteredVideos).map(
                (element) => (
                  <CardVideo
                    title={element.name}
                    textGradient={"light"}
                    videoUrl={element.source}
                  />
                )
              )}
            </div>
          ) : null;
        })}
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
