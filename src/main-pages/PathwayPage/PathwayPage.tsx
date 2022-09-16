import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import YoutubeEmbed from "../../common/components/YoutubeEmbed/YoutubeEmbed";
import {
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { updatePathwayProgressAction } from "../../utils/redux/actionFunctions";
import DropdownTab from "../../common/components/DropdownTab/DropdownTab";
import { store } from "../../utils/redux/store";
import styles from "./pathway-page.module.scss";
import { callPutPathwayProgress } from "src/utils/apiCalls";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import classNames from "classnames";
import PathwayQuestion from "src/main-pages/PathwayPage/components/PathwayQuestion/PathwayQuestion";
import RichText from "src/common/components/RichText/RichText";
import SubPageHeader from "src/common/components/SubpageHeader/SubpageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> = ({ pathwayInfo, pathwaysProgress }) => {
  const addPathwayProgress = () => {
    pathwaysProgress.push({
      pathwayId: pathwayInfo._id,
      moduleProgress: [],
      finished: false,
      name: pathwayInfo.name,
    });
  };
  if (
    !pathwaysProgress
      .slice()
      .find(({ pathwayId }) => pathwayId === pathwayInfo._id)
  ) {
    addPathwayProgress();
  }
  const getSortedContent = (
    presetContent: PresetContent[],
    personalizedContent: PersonalizedContent[]
  ) => {
    let allContent: (PresetContent | PersonalizedContent)[] =
      presetContent.concat(personalizedContent);
    if (presetContent.length === 0) {
      allContent = personalizedContent;
    }
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  const [currModuleId, setCurrModuleId] = useState(pathwayInfo.modules[0]._id);
  const currPathwayProgress = useMemo(
    () =>
      pathwaysProgress
        .slice()
        .find(({ pathwayId }) => pathwayId === pathwayInfo._id),
    [pathwaysProgress]
  );
  useEffect(() => {
    checkPathwayDiscrepancies(pathwayInfo)(currPathwayProgress);
  }, []);
  const [currContent, setCurrContent] = useState(
    getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0]
  );
  const [moduleProgress, setModuleProgress] = useState<
    Record<string, ContentProgress[]>
  >(
    currPathwayProgress.moduleProgress.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.moduleId]: curr.contentProgress,
      };
    }, {})
  );
  const session = useSession();
  useEffect(() => {
    callPutPathwayProgress(moduleProgress).then((res) => {
      let newProgress = pathwaysProgress.slice();
      newProgress[
        newProgress.findIndex(
          ({ pathwayId }) => pathwayId === currPathwayProgress.pathwayId
        )
      ] = currPathwayProgress;
      store.dispatch(updatePathwayProgressAction(newProgress));
    });
  }, [moduleProgress]);
  const updateContentProgress = (newContentProgress: ContentProgress) => {
    let allModuleContentProgress =
      moduleProgress[currModuleId.toString()] ?? [];
    const contentIndex = allModuleContentProgress.findIndex(
      ({ name }) => name === newContentProgress.name
    );
    if (contentIndex === -1) {
      allModuleContentProgress.push(newContentProgress);
    } else {
      allModuleContentProgress[contentIndex] = newContentProgress;
    }
    setModuleProgress({
      ...moduleProgress,
      [currModuleId.toString()]: allModuleContentProgress,
    });
  };
  const updateSubContentProgress = (
    newSubContentProgress:
      | PathwayQuestionProgress
      | PathwayVideoProgress
      | PathwayTextProgress
  ) => {
    let currContentProgress = moduleProgress[currModuleId.toString()].find(
      ({ name }) => name === currContent.name
    );
    const subContentIndex = currContentProgress.subContentProgress.findIndex(
      ({ id }) => id === newSubContentProgress.id
    );

    if (subContentIndex === -1) {
      currContentProgress.subContentProgress.push(newSubContentProgress);
    } else {
      currContentProgress.subContentProgress[subContentIndex] =
        newSubContentProgress;
    }
    currContentProgress.finished =
      currContentProgress.subContentProgress.reduce(
        (prev, curr) => prev && curr.finished,
        true
      ) &&
      currContentProgress.subContentProgress.length >=
        currContent.content.length;
    updateContentProgress(currContentProgress);
  };
  const getContent = useCallback(() => {
    let questionNumber = 0;
    return currContent.content.map((content) => {
      const { type } = content;
      const currSubContentProgress = moduleProgress[currModuleId.toString()]
        .find(({ name }) => name === currContent.name)
        .subContentProgress.find(({ id }) => id === content.id) || {
        id: content.id,
        finished: false,
      };
      if (type === "question") {
        questionNumber++;
      }
      return type === "video" ? (
        <div className="center-child pt-4">
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "90%", height: "100%" }}>
            <div className="w-75" style={{ aspectRatio: "16 / 9" }}>
              <YoutubeEmbed
                isPathway
                key={`youtube-container-${content.url.substring(
                  content.url.indexOf("v=") !== -1
                    ? content.url.indexOf("v=") + 2
                    : content.url.lastIndexOf("/") + 1
                )}`}
                isVideoFinished={currSubContentProgress?.finished}
                videoTime={
                  ("videoTime" in currSubContentProgress &&
                    currSubContentProgress.videoTime) ||
                  0
                }
                onVideoTimeUpdate={(player) => {
                  if (player.getPlayerState() === 1) {
                    updateSubContentProgress({
                      ...currSubContentProgress,
                      videoTime: Math.round(player.getCurrentTime()),
                      finished:
                        player.getDuration() - player.getCurrentTime() < 30,
                    });
                  }
                }}
                videoId={content.url.substring(
                  content.url.indexOf("v=") !== -1
                    ? content.url.indexOf("v=") + 2
                    : content.url.lastIndexOf("/") + 1
                )}
              />
            </div>
            <div className="w-100 center-child flex-column pt-5">
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
              userAnswer={
                ("questionAnswer" in currSubContentProgress &&
                  currSubContentProgress.questionAnswer) ||
                undefined
              }
              onUpdate={(answer) => {
                //console.log("Whot is op");
                updateSubContentProgress({
                  ...currSubContentProgress,
                  questionAnswer: answer,
                  finished:
                    typeof answer !== "undefined" &&
                    answer.length > 0 &&
                    answer !== "",
                });
              }}
              placeholder={content.placeholder}
              data={content.data}
              id={content.id}
            />
          </div>
        )
      );
    });
  }, [currContent]);

  const [scrollState, setScrollState] = useState("scrolling");
  const [listener, setListener] = useState(null);

  const onScroll = useCallback(() => {
      let scrolled = document.body.scrollTop;
      if (document.body.scrollHeight - scrolled <= document.body.clientHeight + 65) {
          setScrollState("bottom");
          console.log("BOOOOOTY");
      }
      else {
        setScrollState("scrolling");
      }
  }, [scrollState]);
  useEffect(() => {
    document.removeEventListener("scroll", listener);
    document.body.addEventListener("scroll", onScroll);
    setListener(onScroll);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState, onScroll]);
  return (
    <PageErrorBoundary>
      <div className="d-flex flex-column justify-content-start">
        <div
          className="border"
        >
          <div className="m-3">
            <a href="/my-learning">
              <FontAwesomeIcon className="ms-1 cl-blue" icon={faChevronLeft} />
            </a>
            <a href="/my-learning" className="ms-3 cl-blue">Back to my learning</a>
            <text className="ms-2">/</text>
            <text className="ms-2 cl-mid-gray">{pathwayInfo.name}</text>
          </div>

        </div>  
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ minHeight: "94vh", height: "fit-content" }}
      >
        <div
          className="d-flex flex-column border-end"
          style={{ width: "23%", backgroundColor: "#EFEFF5"}}
        >
          {pathwayInfo.modules.map(
            ({ name, presetContent, personalizedContent, _id }) => {
              const moduleSortedContent = getSortedContent(
                presetContent,
                personalizedContent
              );
              return (
                <DropdownTab
                  isFinishedModule={
                    pathwaysProgress
                      .find(({ name }) => pathwayInfo.name === name)
                      .moduleProgress.find(
                        (moduleProgress) => moduleProgress.name === name
                      ).finished
                  }
                  isFinishedContent={pathwaysProgress
                    .find(({ name }) => pathwayInfo.name === name)
                    .moduleProgress.find(
                      (moduleProgress) => moduleProgress.name === name
                    )
                    .contentProgress.map(({ finished }) => finished)}
                  icons={moduleSortedContent.map(
                    ({ primaryType }) => primaryType
                  )}
                  currSelectedPath={currContent.name}
                  chunkList={moduleSortedContent.map(
                    ({ name, primaryType }) => {
                      return { name, type: primaryType };
                    }
                  )}
                  onClick={(contentTitle) => {
                    setCurrModuleId(_id);
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
            <SubPageHeader title={"Quiz"} isMetrics percentage={undefined} />
          )}
          <div className="d-flex flex-column">
            {getContent()}
          </div>
        </div>

        {scrollState !== "bottom" ? <div className="d-flex fixed-bottom justify-content-end mb-5 me-4">
          <div className="d-flex justify-content-end" style={{width: "77%"}}>
            <FontAwesomeIcon className="cl-blue fa-3x" icon={faArrowAltCircleDown} />
          </div>
          
        </div> : null}
        
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
        ({ _id }) => progressModule.moduleId === _id.toString()
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
