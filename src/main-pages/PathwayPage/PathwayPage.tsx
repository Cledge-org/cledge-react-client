import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import PathwayQuestion from "src/main-pages/PathwayPage/components/PathwayQuestion/PathwayQuestion";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import {
  faBook,
  faImage,
  faMoneyCheck,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import RichText from "src/common/components/RichText/RichText";
import SubPageHeader from "src/common/components/SubpageHeader/SubpageHeader";
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> = ({ pathwayInfo, pathwaysProgress }) => {
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(personalizedContent);
    if (presetContent.length === 0) {
      allContent = personalizedContent;
    }
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  const [currContent, setCurrContent] = useState(
    getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0]
  );
  const [allPathwayProgress, setAllPathwayProgress] = useState(
    pathwaysProgress.slice()
  );
  const session = useSession();
  const checkForDiscrepancies = checkPathwayDiscrepancies(pathwayInfo);
  const getContent = useCallback(() => {
    let questionNumber = 0;
    return currContent.content.map((content) => {
      const { type } = content;
      // let currContentProgress =
      if (type === "question") {
        questionNumber++;
      }
      return type === "video" ? (
        <div className="center-child pt-4">
          <div style={{ width: "90%", height: "100vh" }}>
            <div className="w-100" style={{ height: "60%" }}>
              <YoutubeEmbed
                isPathway
                key={`youtube-container-${content.url.substring(
                  content.url.indexOf("v=") !== -1
                    ? content.url.indexOf("v=") + 2
                    : content.url.lastIndexOf("/") + 1
                )}`}
                isVideoFinished={false}
                videoTime={0}
                onVideoTimeUpdate={(player) => {}}
                videoId={content.url.substring(
                  content.url.indexOf("v=") !== -1
                    ? content.url.indexOf("v=") + 2
                    : content.url.lastIndexOf("/") + 1
                )}
              />
            </div>
            <div className="w-100 center-child flex-column py-5">
              <div className={classNames("pb-2 w-100")}>
                <span
                  className="fw-bold cl-dark-text"
                  style={{ fontSize: "1.7em" }}
                >
                  {content.title}
                </span>
              </div>
              <div className={classNames(styles.pathwayDescription, "pb-2")}>
                <span
                  className="fw-bold cl-dark-text"
                  style={{ fontSize: "1.3em" }}
                >
                  Video Source: {content.videoSource}
                </span>
              </div>
              <div className="mt-3 w-100">
                <div className="text-start">{content.description}</div>
              </div>
            </div>
          </div>
        </div>
      ) : type === "text" ? (
        <div className="center-child w-100">
          <div className="w-60">
            <RichText text={content.text} />
          </div>
        </div>
      ) : type === "image" ? (
        <div className="d-flex flex-column align-items-center w-100">
          <img className="w-60" src={content.image} />
          <div className="w-60 text-start">{content.description}</div>
        </div>
      ) : (
        type === "question" && (
          <div className="w-60 align-self-center">
            <PathwayQuestion
              type={"question"}
              question={content.question}
              questionType={content.questionType}
              number={questionNumber}
              // userAnswers={[]}
              onUpdate={() => {}}
              helpText={content.helpText}
              data={content.data}
              id={content.id}
            />
          </div>
        )
      );
    });
  }, [currContent]);
  return (
    <PageErrorBoundary>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ minHeight: "94vh", height: "fit-content" }}
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
                  icons={getSortedContent(
                    presetContent,
                    personalizedContent
                  ).map(({ primaryType }) =>
                    primaryType === "video"
                      ? faVideo
                      : primaryType === "text"
                      ? faBook
                      : primaryType === "image"
                      ? faImage
                      : faMoneyCheck
                  )}
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
          {currContent.primaryType === "question" && (
            <SubPageHeader
              title={"Quiz"}
              isExtracurricular
              percentage={undefined}
            />
          )}
          {getContent()}
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
