import { useState } from "react";
import { NextApplicationPage } from "../AppPage/AppPage";
import { GetServerSidePropsContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import CardImage from "../../common/components/Cards/CardImage/CardImage";
import CardText from "../../common/components/Cards/CardText/CardText";
import VideoCard from "../../common/components/Cards/CardVideo/CardVideo";
import styles from "./resources-page.module.scss";
import classNames from "classnames";
import ResourcesTabButton from "./components/ResourcesTabButton/ResourcesTabButton";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";

const ResourcesPage: NextApplicationPage<{ resourcesInfo: ResourcesInfo }> = ({
  resourcesInfo,
}) => {
  const resourceTypes = [
    "All",
    "Extracurriculars",
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
  const filter = (
    txt: string,
    originalArray: CardResource[] | CardArticle[] | CardVideo[],
    comparisonArray: CardResource[] | CardArticle[] | CardVideo[]
  ) => {
    let allItems = [];
    let data = comparisonArray;
    let comparisonValArr = [];
    var index = 0;
    for (var i = 0; i < data.length; i++) {
      let comparisonVal = compare(
        txt.toLowerCase(),
        data[i].name.toLowerCase() +
          (data[i].description ? " " + data[i].description.toLowerCase() : "")
      );
      if (comparisonVal > 0) {
        comparisonValArr.push(comparisonVal);
        allItems[index] = { ...originalArray[i], coefficient: comparisonVal };
        index++;
      }
    }
    return allItems.sort((a, b) => b.coefficient - a.coefficient);
  };
  const searchAlg = (
    txt: string,
    originalArray: CardResource[] | CardArticle[] | CardVideo[],
    comparisonArray: CardResource[] | CardArticle[] | CardVideo[]
  ) => {
    if (txt.trim() === "") {
      return originalArray;
    }
    let filteredItems = filter(txt.trim(), originalArray, comparisonArray);
    return filteredItems;
  };
  return (
    <PageErrorBoundary>
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
          <div
            className={classNames(
              "d-flex flex-row justify-content-start align-items-center",
              styles.searchContainer,
              "px-2 mt-3"
            )}
          >
            <div className="p-1 cl-mid-gray" style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              onChange={(e) => {
                setSearchTxt(e.target.value);
              }}
              className={classNames("py-2", styles.searchInput)}
              type="text"
              placeholder="What would you like to know?"
            />
          </div>
        </div>
        <div className="container-fluid align-self-center mx-0 col justify-content-evenly">
          {resourceTypes.map((type) => {
            let currType = type.toLowerCase();
            const filteredResources = resourcesInfo.resources
              .filter(({ category }) =>
                currType === "all"
                  ? true
                  : category
                  ? currType === category
                  : true
              )
              .map((resource) => ({ ...resource, type: "resource" }))
              .concat(
                resourcesInfo.articles
                  .filter(({ category }) =>
                    currType === "all"
                      ? true
                      : category
                      ? currType === category
                      : true
                  )
                  .map((article) => ({ ...article, type: "article" }))
              )
              .concat(
                resourcesInfo.videoList
                  .filter(({ category }) =>
                    currType === "all"
                      ? true
                      : category
                      ? currType === category
                      : true
                  )
                  .map((video) => ({ ...video, type: "video" }))
              );
            const searchedResources = searchAlg(
              searchTxt,
              filteredResources,
              filteredResources
            ).map((element) =>
              element.type === "resource" ? (
                <CardImage
                  snippet=""
                  title={element.name}
                  textGradient={"light"}
                />
              ) : element.type === "video" ? (
                <VideoCard
                  title={element.name}
                  textGradient={"light"}
                  videoUrl={element.source}
                />
              ) : (
                <CardText
                  snippet={element.description}
                  title={element.name}
                  textGradient={"light"}
                />
              )
            );
            return currTab === currType ? (
              <div className="row jusify-content-evenly">
                {searchedResources.length === 0
                  ? "No resources match your search"
                  : null}
                {searchedResources}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </PageErrorBoundary>
  );
};

export default ResourcesPage;
