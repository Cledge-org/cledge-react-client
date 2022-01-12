import React, { useEffect, useState } from "react";
import YoutubeEmbed from "../../components/common/YoutubeEmbed";
import DropDownTab from "../../components/common/DropDown_Tab";
import { GetServerSidePropsContext } from "next";
import { getPathway } from "../api/get-pathway";
import { NextApplicationPage } from "../_app";
import { useRouter } from "next/router";
import { getAccountInfo } from "../api/get-account";
import AuthFunctions from "../api/auth/firebase-auth";
import { ORIGIN_URL } from "../../config";

//profile progress/ question summary page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userProgress = await (
    await fetch(`${ORIGIN_URL}/api/get-all-pathway-progress`, {
      method: "POST",
      body: JSON.stringify({ userId: AuthFunctions.userId }),
    })
  ).json();
  let fetchedData = await fetch(`${ORIGIN_URL}/api/get-pathway`, {
    method: "POST",
    body: JSON.stringify({
      userId: AuthFunctions.userId,
      pathwayId: ctx.query.id as string,
    }),
  });
  console.error(fetchedData.status);
  try {
    return {
      props: {
        pathwayInfo: await fetchedData.json(),
        pathwayProgress: userProgress,
        uid: AuthFunctions.userId,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
  pathwayProgress: PathwayProgress[];
  uid: string;
}> = ({ pathwayInfo, pathwayProgress, uid }) => {
  const [currPage, setCurrPage] = useState(null);
  const [currSelected, setCurrSelected] = useState("");
  const [allPathwayProgress, setAllPathwayProgress] = useState(pathwayProgress);
  const checkIfModuleFinished = (
    newPathwayProgress: PathwayProgress[],
    pathwayIndex,
    moduleIndex
  ) => {
    let currModuleProgress =
      newPathwayProgress[pathwayIndex].moduleProgress[moduleIndex];
    let pathwayModuleIndex = pathwayInfo.modules.findIndex(({ _id }) => {
      return currModuleProgress.moduleId === _id;
    });
    if (
      currModuleProgress.contentProgress.length <
      pathwayInfo.modules[pathwayModuleIndex].personalizedContent.length +
        pathwayInfo.modules[pathwayModuleIndex].presetContent.length
    ) {
      return false;
    }
    let allContentFinished = true;
    currModuleProgress.contentProgress.forEach(({ finished }) => {
      if (!finished) {
        allContentFinished = false;
      }
    });
    currModuleProgress.finished = allContentFinished;
    return allContentFinished;
  };
  const checkIfPathwayFinished = (
    newPathwayProgress: PathwayProgress[],
    pathwayIndex
  ) => {
    let currPathwayProgress = newPathwayProgress[pathwayIndex];
    if (
      currPathwayProgress.moduleProgress.length < pathwayInfo.modules.length
    ) {
      return;
    }
    let allContentFinished = true;
    currPathwayProgress.moduleProgress.forEach((moduleProgress, index) => {
      let finished = checkIfModuleFinished(
        newPathwayProgress,
        pathwayIndex,
        index
      );
      if (!finished) {
        allContentFinished = false;
      }
    });
    currPathwayProgress.finished = allContentFinished;
    return;
  };
  const addNewPathwayProgress = (
    newPathwayProgress: PathwayProgress[],
    moduleTitle,
    moduleId,
    currContent,
    contentId,
    player
  ) => {
    newPathwayProgress.push({
      pathwayId: pathwayInfo._id,
      title: pathwayInfo.title,
      moduleProgress: [
        {
          moduleId,
          title: moduleTitle,
          contentProgress: [
            {
              contentId,
              title: currContent.title,
              finished: player.getDuration() - player.getCurrentTime() < 30,
              videoTime: Math.round(player.getCurrentTime()),
            },
          ],
          finished: false,
        },
      ],
      finished: false,
    });
    checkIfPathwayFinished(newPathwayProgress, newPathwayProgress.length - 1);
    setAllPathwayProgress(newPathwayProgress);
  };
  const addNewModuleProgress = (
    newPathwayProgress: PathwayProgress[],
    pathwayIndex,
    moduleTitle,
    moduleId,
    contentId,
    currContent,
    player
  ) => {
    newPathwayProgress[pathwayIndex].moduleProgress.push({
      moduleId,
      title: moduleTitle,
      contentProgress: [
        {
          contentId,
          title: currContent.title,
          finished: player.getDuration() - player.getCurrentTime() < 30,
          videoTime: Math.round(player.getCurrentTime()),
        },
      ],
      finished: false,
    });
    checkIfPathwayFinished(newPathwayProgress, pathwayIndex);
    setAllPathwayProgress(newPathwayProgress);
  };
  const addNewContentProgress = (
    newPathwayProgress: PathwayProgress[],
    pathwayIndex,
    moduleIndex,
    contentId,
    currContent,
    player
  ) => {
    newPathwayProgress[pathwayIndex].moduleProgress[
      moduleIndex
    ].contentProgress.push({
      contentId,
      title: currContent.title,
      finished: player.getDuration() - player.getCurrentTime() < 30,
      videoTime: Math.round(player.getCurrentTime()),
    });
    checkIfPathwayFinished(newPathwayProgress, pathwayIndex);
    setAllPathwayProgress(newPathwayProgress);
  };
  const onVideoTimeUpdate = (
    player,
    currContent,
    moduleTitle,
    moduleId,
    contentId
  ) => {
    if (player) {
      let pathwayProgress = allPathwayProgress.find(
        ({ pathwayId }) => pathwayId === pathwayInfo._id
      );
      if (!pathwayProgress) {
        let newPathwayProgress = allPathwayProgress.slice();
        addNewPathwayProgress(
          newPathwayProgress,
          moduleTitle,
          moduleId,
          currContent,
          contentId,
          player
        );
      } else {
        let indexOfModule = pathwayProgress.moduleProgress.findIndex(
          (moduleProgress) => {
            return moduleProgress.moduleId === moduleId;
          }
        );
        console.log(moduleTitle);
        console.log(indexOfModule);
        if (indexOfModule === -1) {
          let newPathwayProgress = allPathwayProgress.slice();
          addNewModuleProgress(
            newPathwayProgress,
            newPathwayProgress.indexOf(pathwayProgress),
            moduleTitle,
            moduleId,
            contentId,
            currContent,
            player
          );
        } else {
          let indexOfContent = pathwayProgress.moduleProgress[
            indexOfModule
          ].contentProgress.findIndex((contentProgress, index) => {
            let compareTo = currContent._id ? currContent._id : index;
            return contentProgress.contentId === compareTo;
          });
          if (indexOfContent === -1) {
            let newPathwayProgress = allPathwayProgress.slice();
            addNewContentProgress(
              newPathwayProgress,
              newPathwayProgress.indexOf(pathwayProgress),
              indexOfModule,
              contentId,
              currContent,
              player
            );
          } else {
            if (player.getDuration() - player.getCurrentTime() < 30) {
              pathwayProgress.moduleProgress[indexOfModule].contentProgress[
                indexOfContent
              ] = {
                ...pathwayProgress.moduleProgress[indexOfModule]
                  .contentProgress[indexOfContent],
                finished: true,
              };
            }
            pathwayProgress.moduleProgress[indexOfModule].contentProgress[
              indexOfContent
            ] = {
              ...pathwayProgress.moduleProgress[indexOfModule].contentProgress[
                indexOfContent
              ],
              videoTime: Math.round(player.getCurrentTime()),
            };
            let newPathwayProgress = allPathwayProgress.slice();
            checkIfPathwayFinished(
              newPathwayProgress,
              newPathwayProgress.indexOf(pathwayProgress)
            );
            setAllPathwayProgress(newPathwayProgress);
          }
        }
      }
    }
  };
  useEffect(() => {
    const currModuleProgress = allPathwayProgress
      .find(({ pathwayId }) => pathwayId === pathwayInfo._id)
      .moduleProgress.find(
        ({ moduleId }) => moduleId === pathwayInfo.modules[0]._id
      );
    let currContent = getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0];
    console.log(
      currContent.url.substring(currContent.url.lastIndexOf("v=") + 2)
    );
    setCurrSelected(pathwayInfo.modules[0].title + currContent.title);
    setCurrPage(
      <div className="d-flex flex-column" style={{ flex: 3 }}>
        <div className="w-100" style={{ height: "55%" }}>
          <YoutubeEmbed
            isPathway
            key={`youtube-container-${currContent.url.substring(
              currContent.url.lastIndexOf("v=") + 2
            )}`}
            isVideoFinished={
              currModuleProgress.contentProgress.find(
                (contentProgress, index) => {
                  let compareTo = currContent._id ? currContent._id : index;
                  return contentProgress.contentId === compareTo;
                }
              ).finished
            }
            videoTime={
              currModuleProgress.contentProgress.find(
                (contentProgress, index) => {
                  let compareTo = currContent._id ? currContent._id : index;
                  return contentProgress.contentId === compareTo;
                }
              ).videoTime
            }
            onVideoTimeUpdate={(player) =>
              onVideoTimeUpdate(
                player,
                currContent,
                pathwayInfo.modules[0].title,
                pathwayInfo.modules[0]._id,
                currContent._id ? currContent._id : 0
              )
            }
            videoId={currContent.url.substring(
              currContent.url.lastIndexOf("v=") + 2
            )}
          />
        </div>
        <div className="container-fluid center-child flex-column py-5">
          <div className="pathway-description">
            <span
              className="fw-bold cl-dark-text"
              style={{ fontSize: "1.7em" }}
            >
              {currContent.title}
            </span>
          </div>
          <div className="ms-5 mt-3">
            <div className="ms-4">{currContent.content}</div>
          </div>
        </div>
      </div>
    );
  }, []);
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(personalizedContent);
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  useEffect(() => {
    let contentProgress: Record<string, ContentProgress[]> = {};
    let pathwayProgress = allPathwayProgress.find(
      (pathwayProgress) => pathwayProgress.pathwayId === pathwayInfo._id
    );
    if (pathwayProgress) {
      pathwayProgress.moduleProgress.forEach((moduleProgress, index) => {
        let actualModule = pathwayInfo.modules.find((module) => {
          return module._id === moduleProgress.moduleId;
        });
        contentProgress[actualModule._id] = moduleProgress.contentProgress;
      });
      console.log(contentProgress);
      window.onbeforeunload = (e) => {
        fetch(`${ORIGIN_URL}/api/put-pathway-progress`, {
          method: "POST",
          body: JSON.stringify({
            userId: uid,
            contentProgress,
          }),
        }).then((res) => {
          console.log(res.status);
        });
      };
    }
  }, [allPathwayProgress]);
  useEffect(() => {
    return () => {
      setAllPathwayProgress((allPathwayProgress) => {
        let contentProgress: Record<string, ContentProgress[]> = {};
        let pathwayProgress = allPathwayProgress.find(
          (pathwayProgress) => pathwayProgress.pathwayId === pathwayInfo._id
        );
        if (pathwayProgress) {
          pathwayProgress.moduleProgress.forEach((moduleProgress, index) => {
            let actualModule = pathwayInfo.modules.find((module) => {
              return module._id === moduleProgress.moduleId;
            });
            contentProgress[actualModule._id] = moduleProgress.contentProgress;
          });
          fetch(`${ORIGIN_URL}/api/put-pathway-progress`, {
            method: "POST",
            body: JSON.stringify({
              userId: uid,
              contentProgress,
            }),
          }).then((res) => {
            console.log(res.status);
          });
        }
        return allPathwayProgress;
      });
    };
  }, []);
  return (
    <>
      <div
        className="container-fluid d-flex flex-row px-0"
        style={{ height: "94vh" }}
      >
        <div className="d-flex flex-column bg-light-gray" style={{ flex: 1 }}>
          {pathwayInfo.modules.map(
            (
              { title, presetContent, personalizedContent, _id },
              moduleIndex
            ) => {
              let currModuleProgress = allPathwayProgress
                .find(({ pathwayId }) => pathwayId === pathwayInfo._id)
                .moduleProgress.find(
                  (moduleProgress) => _id === moduleProgress.moduleId
                );
              return (
                <DropDownTab
                  isFinishedModule={currModuleProgress.finished}
                  isFinishedContent={currModuleProgress.contentProgress.map(
                    ({ finished }) => finished
                  )}
                  currSelectedPath={currSelected}
                  chunkList={getSortedContent(
                    presetContent,
                    personalizedContent
                  ).map(({ title }) => title)}
                  onClick={(contentTitle) => {
                    let currContent = presetContent.find(
                      ({ title }) => title === contentTitle
                    );
                    let currContentIndex = currContent
                      ? presetContent.indexOf(currContent)
                      : null;
                    if (currContent === undefined) {
                      currContent = personalizedContent.find(
                        ({ title }) => title === contentTitle
                      );
                    }
                    setCurrSelected(title + contentTitle);
                    setCurrPage(
                      <div className="d-flex flex-column" style={{ flex: 3 }}>
                        <div className="w-100" style={{ height: "55%" }}>
                          <YoutubeEmbed
                            isPathway
                            key={`youtube-container-${currContent.url.substring(
                              currContent.url.lastIndexOf("v=") + 2
                            )}`}
                            isVideoFinished={
                              currModuleProgress.contentProgress.find(
                                (contentProgress, index) => {
                                  let compareTo = currContent._id
                                    ? currContent._id
                                    : index;
                                  return (
                                    contentProgress.contentId === compareTo
                                  );
                                }
                              ).finished
                            }
                            videoTime={
                              currModuleProgress.contentProgress.find(
                                (contentProgress, index) => {
                                  let compareTo = currContent._id
                                    ? currContent._id
                                    : index;
                                  return (
                                    contentProgress.contentId === compareTo
                                  );
                                }
                              ).videoTime
                            }
                            onVideoTimeUpdate={(player) =>
                              //WORKS!!!!!!!!!!!!!!!
                              onVideoTimeUpdate(
                                player,
                                currContent,
                                title,
                                _id,
                                currContent._id
                                  ? currContent._id
                                  : currContentIndex
                              )
                            }
                            videoId={currContent.url.substring(
                              currContent.url.lastIndexOf("v=") + 2
                            )}
                          />
                        </div>
                        <div className="container-fluid center-child flex-column py-5">
                          <div className="pathway-description">
                            <span
                              className="fw-bold cl-dark-text"
                              style={{ fontSize: "1.7em" }}
                            >
                              {currContent.title}
                            </span>
                          </div>
                          <div className="ms-5 mt-3">
                            <div className="ms-4">{currContent.content}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                  title={title}
                  isPathway
                  percentComplete={undefined}
                />
              );
            }
          )}
        </div>
        {currPage}
      </div>
    </>
  );
};

Pathways.requireAuth = true;
export default Pathways;
