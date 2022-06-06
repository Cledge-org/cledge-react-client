import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import YoutubeEmbed from "../../common/components/YoutubeEmbed/YoutubeEmbed";

import { updatePathwayProgressAction } from "../../utils/redux/actionFunctions";
import DropdownTab from "../../common/components/DropdownTab/DropdownTab";
import { store } from "../../utils/redux/store";
import styles from "./pathway-page.module.scss";
import { callPutPathwayProgress } from "src/utils/apiCalls";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import classNames from "classnames";
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> = ({ pathwayInfo, pathwaysProgress }) => {
  const [currContent, setCurrContent] = useState(null);
  // const [allPathwayProgress, setAllPathwayProgress] = useState(
  //   pathwaysProgress.slice()
  // );
  // const session = useSession();
  // const checkForDiscrepancies = checkPathwayDiscrepancies(pathwayInfo);
  useEffect(() => {
    let currContent = getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0];
    setCurrContent(currContent);
  }, []);
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(personalizedContent);
    if (presetContent.length === 0) {
      allContent = personalizedContent;
    }
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ height: "94vh" }}
      >
        <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
          {pathwayInfo.modules.map(
            (
              { name, presetContent, personalizedContent, _id },
              moduleIndex
            ) => {
              return (
                <DropdownTab
                  isFinishedModule={false}
                  isFinishedContent={[false]}
                  currSelectedPath={currContent.name}
                  chunkList={getSortedContent(
                    presetContent,
                    personalizedContent
                  ).map(({ name, type }) => {
                    return { name, type };
                  })}
                  onClick={(contentTitle) => {
                    let currContent = presetContent.find(
                      ({ name }) => name === contentTitle
                    );
                    if (currContent === undefined) {
                      currContent = personalizedContent.find(
                        ({ name }) => name === contentTitle
                      );
                    }
                    setCurrContent(currContent);
                  }}
                  title={name}
                  isPathway
                  percentComplete={undefined}
                />
              );
            }
          )}
        </div>
        <div className="d-flex flex-column" style={{ flex: 3 }}>
          {currContent.content.map(({ type }) => {
            return type === "video" ? (
              <>
                <div className="w-100" style={{ height: "55%" }}>
                  <YoutubeEmbed
                    isPathway
                    key={`youtube-container-${currContent.url.substring(
                      currContent.url.indexOf("v=") !== -1
                        ? currContent.url.indexOf("v=") + 2
                        : currContent.url.lastIndexOf("/") + 1
                    )}`}
                    isVideoFinished={false}
                    videoTime={0}
                    onVideoTimeUpdate={(player) => {}}
                    videoId={currContent.url.substring(
                      currContent.url.indexOf("v=") !== -1
                        ? currContent.url.indexOf("v=") + 2
                        : currContent.url.lastIndexOf("/") + 1
                    )}
                  />
                </div>
                <div className="container-fluid center-child flex-column py-5">
                  <div
                    className={classNames(styles.pathwayDescription, "pb-2")}
                  >
                    <span
                      className="fw-bold cl-dark-text"
                      style={{ fontSize: "1.7em" }}
                    >
                      {currContent.name}
                    </span>
                  </div>
                  <div className="ms-5 mt-3 w-100">
                    <div className="ms-5 text-start">{currContent.content}</div>
                  </div>
                </div>
              </>
            ) : type === "text" ? (
              <div></div>
            ) : type === "image" ? (
              <div></div>
            ) : type === "question" ? (
              <div />
            ) : (
              <div></div>
            );
          })}
        </div>
      </div>
    </PageErrorBoundary>
  );
};

Pathways.requireAuth = true;
export default connect((state) => ({
  pathwaysProgress: state.pathwaysProgress.slice(),
}))(Pathways);

function checkPathwayDiscrepancies(pathwayInfo: Pathway) {
  return (pathwayProgress: PathwayProgress) => {
    if (pathwayProgress.name !== pathwayInfo.name) {
      pathwayProgress.name = pathwayInfo.name;
    }
    pathwayProgress.moduleProgress.forEach((progressModule, index) => {
      const matchingModule = pathwayInfo.modules.find(
        ({ _id }) => progressModule.moduleId === _id
      );
      if (matchingModule && matchingModule.name !== progressModule.name) {
        pathwayProgress.moduleProgress[index].name = matchingModule.name;
      }
      progressModule.contentProgress.forEach(
        (progressContent, contentIndex) => {
          let matchingContent = matchingModule.presetContent.find(
            ({ name }) => progressContent.name === name
          );
          if (!matchingContent) {
            matchingContent = matchingModule.personalizedContent.find(
              ({ name }) => progressContent.name === name
            );
          }
          if (!matchingContent) {
            progressModule.contentProgress.splice(contentIndex, 1);
          }
        }
      );
    });
  };
}
