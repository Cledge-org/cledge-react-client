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
import { getSession, useSession } from "next-auth/react";
import { connect } from "react-redux";
import { store } from "../../utils/store";
import { updatePathwayProgressAction } from "../../utils/actionFunctions";
import { ObjectId } from "mongodb";

//profile progress/ question summary page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    console.error(ctx.query.id);
    return {
      props: {
        pathwayInfo: await (
          await fetch(`${ORIGIN_URL}/api/get-pathway`, {
            method: "POST",
            body: JSON.stringify({
              userId: session.user.uid,
              pathwayId: new ObjectId(ctx.query.id as string),
            }),
          })
        ).json(),
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Pathways: NextApplicationPage<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> = ({ pathwayInfo, pathwaysProgress }) => {
  const [currPage, setCurrPage] = useState(null);
  const [currSelected, setCurrSelected] = useState("");
  const [allPathwayProgress, setAllPathwayProgress] =
    useState(pathwaysProgress);
  //console.warn(pathwayInfo);
  //console.warn(allPathwayProgress);
  const checkForDiscrepancies = (pathwayProgress: PathwayProgress) => {
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
    player
  ) => {
    newPathwayProgress.push({
      pathwayId: pathwayInfo._id,
      name: pathwayInfo.name,
      moduleProgress: [
        {
          moduleId,
          name: moduleTitle,
          contentProgress: [
            {
              name: currContent.name,
              finished:
                currContent.type.toLowerCase() === "article"
                  ? true
                  : player.getDuration() - player.getCurrentTime() < 30,
              videoTime:
                currContent.type.toLowerCase() === "article"
                  ? 0
                  : Math.round(player.getCurrentTime()),
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
    currContent,
    player
  ) => {
    newPathwayProgress[pathwayIndex].moduleProgress.push({
      moduleId,
      name: moduleTitle,
      contentProgress: [
        {
          name: currContent.name,
          finished:
            currContent.type.toLowerCase() === "article"
              ? true
              : player.getDuration() - player.getCurrentTime() < 30,
          videoTime:
            currContent.type.toLowerCase() === "article"
              ? 0
              : Math.round(player.getCurrentTime()),
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
    currContent,
    player
  ) => {
    newPathwayProgress[pathwayIndex].moduleProgress[
      moduleIndex
    ].contentProgress.push({
      name: currContent.name,
      finished:
        currContent.type.toLowerCase() === "article"
          ? true
          : player.getDuration() - player.getCurrentTime() < 30,
      videoTime:
        currContent.type.toLowerCase() === "article"
          ? 0
          : Math.round(player.getCurrentTime()),
    });
    checkIfPathwayFinished(newPathwayProgress, pathwayIndex);
    setAllPathwayProgress(newPathwayProgress);
  };
  const setArticleToFinished = (currContent, moduleTitle, moduleId) => {
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
        undefined
      );
    } else {
      let indexOfModule = pathwayProgress.moduleProgress.findIndex(
        (moduleProgress) => {
          return moduleProgress.moduleId === moduleId;
        }
      );
      //console.log(moduleTitle);
      //console.log(indexOfModule);
      if (indexOfModule === -1) {
        let newPathwayProgress = allPathwayProgress.slice();
        addNewModuleProgress(
          newPathwayProgress,
          newPathwayProgress.indexOf(pathwayProgress),
          moduleTitle,
          moduleId,
          currContent,
          undefined
        );
      }
      let indexOfContent = pathwayProgress.moduleProgress[
        indexOfModule
      ].contentProgress.findIndex((contentProgress, index) => {
        return contentProgress.name === currContent.name;
      });
      if (indexOfContent === -1) {
        let newPathwayProgress = allPathwayProgress.slice();
        addNewContentProgress(
          newPathwayProgress,
          newPathwayProgress.indexOf(pathwayProgress),
          indexOfModule,
          currContent,
          undefined
        );
      } else {
        pathwayProgress.moduleProgress[indexOfModule].contentProgress[
          indexOfContent
        ] = {
          ...pathwayProgress.moduleProgress[indexOfModule].contentProgress[
            indexOfContent
          ],
          finished: true,
        };
        let newPathwayProgress = allPathwayProgress.slice();
        checkIfPathwayFinished(
          newPathwayProgress,
          newPathwayProgress.indexOf(pathwayProgress)
        );
        setAllPathwayProgress(newPathwayProgress);
      }
    }
  };
  const onVideoTimeUpdate = (player, currContent, moduleTitle, moduleId) => {
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
          player
        );
      } else {
        let indexOfModule = pathwayProgress.moduleProgress.findIndex(
          (moduleProgress) => {
            return moduleProgress.moduleId === moduleId;
          }
        );
        //console.log(moduleTitle);
        //console.log(indexOfModule);
        if (indexOfModule === -1) {
          let newPathwayProgress = allPathwayProgress.slice();
          addNewModuleProgress(
            newPathwayProgress,
            newPathwayProgress.indexOf(pathwayProgress),
            moduleTitle,
            moduleId,
            currContent,
            player
          );
        } else {
          let indexOfContent = pathwayProgress.moduleProgress[
            indexOfModule
          ].contentProgress.findIndex((contentProgress, index) => {
            return contentProgress.name === currContent.name;
          });
          if (indexOfContent === -1) {
            let newPathwayProgress = allPathwayProgress.slice();
            addNewContentProgress(
              newPathwayProgress,
              newPathwayProgress.indexOf(pathwayProgress),
              indexOfModule,
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
    let currModuleProgress = allPathwayProgress
      .find(({ pathwayId }) => pathwayId === pathwayInfo._id)
      ?.moduleProgress?.find(
        ({ moduleId }) => moduleId === pathwayInfo.modules[0]._id
      );
    if (!currModuleProgress) {
      currModuleProgress = {
        contentProgress: [],
        moduleId: pathwayInfo.modules[0]._id,
        finished: false,
        name: pathwayInfo.modules[0].name,
      };
    }
    let currContent = getSortedContent(
      pathwayInfo.modules[0].presetContent,
      pathwayInfo.modules[0].personalizedContent
    )[0];
    //console.log(
    //   currContent.url.substring(currContent.url.lastIndexOf("v=") + 2)
    // );
    if (currContent.type.toLowerCase() === "article") {
      setArticleToFinished(
        currContent,
        pathwayInfo.modules[0].name,
        pathwayInfo.modules[0]._id
      );
    }
    setCurrSelected(pathwayInfo.modules[0].name + currContent.name);
    setCurrPage(
      <div className="d-flex flex-column" style={{ flex: 3 }}>
        {currContent.type.toLowerCase() === "video" ? (
          <>
            <div className="w-100" style={{ height: "55%" }}>
              <YoutubeEmbed
                isPathway
                key={`youtube-container-${currContent.url.substring(
                  currContent.url.indexOf("v=") !== -1
                    ? currContent.url.indexOf("v=") + 2
                    : currContent.url.lastIndexOf("/") + 1
                )}`}
                isVideoFinished={
                  currModuleProgress.contentProgress.find(
                    (contentProgress, index) => {
                      return contentProgress.name === currContent.name;
                    }
                  )?.finished
                }
                videoTime={
                  currModuleProgress.contentProgress.find(
                    (contentProgress, index) => {
                      return contentProgress.name === currContent.name;
                    }
                  )?.videoTime
                    ? currModuleProgress.contentProgress.find(
                        (contentProgress, index) => {
                          return contentProgress.name === currContent.name;
                        }
                      ).videoTime
                    : 0
                }
                onVideoTimeUpdate={(player) =>
                  onVideoTimeUpdate(
                    player,
                    currContent,
                    pathwayInfo.modules[0].name,
                    pathwayInfo.modules[0]._id
                  )
                }
                videoId={currContent.url.substring(
                  currContent.url.indexOf("v=") !== -1
                    ? currContent.url.indexOf("v=") + 2
                    : currContent.url.lastIndexOf("/") + 1
                )}
              />
            </div>
            <div className="container-fluid center-child flex-column py-5">
              <div className="pathway-description">
                <span
                  className="fw-bold cl-dark-text"
                  style={{ fontSize: "1.7em" }}
                >
                  {currContent.name}
                </span>
              </div>
              <div className="mt-3 ms-5 w-100">
                <div className="ms-5 text-start">{currContent.content}</div>
              </div>
            </div>
          </>
        ) : (
          <embed src={currContent.url} className="w-100 h-100" />
        )}
      </div>
    );
  }, []);
  const getSortedContent = (presetContent, personalizedContent) => {
    let allContent = presetContent.concat(personalizedContent);
    if (presetContent.length === 0) {
      allContent = personalizedContent;
    }
    allContent.sort((a, b) => a.priority - b.priority);
    return allContent;
  };
  const session = useSession();
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
      //console.log(contentProgress);
      window.onbeforeunload = (e) => {
        fetch(`${ORIGIN_URL}/api/put-pathway-progress`, {
          method: "POST",
          body: JSON.stringify({
            contentProgress,
            userId: session.data.user.uid,
          }),
        }).then((res) => {
          store.dispatch(updatePathwayProgressAction(pathwayProgress));
          //console.log(res.status);
        });
      };
    }
  }, [allPathwayProgress]);
  useEffect(() => {
    if (
      allPathwayProgress.find(
        (pathwayProgress) => pathwayProgress.pathwayId === pathwayInfo._id
      )
    ) {
      checkForDiscrepancies(
        allPathwayProgress.find(
          (pathwayProgress) => pathwayProgress.pathwayId === pathwayInfo._id
        )
      );
    }
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
              contentProgress,
              userId: session.data.user.uid,
            }),
          }).then((res) => {
            store.dispatch(updatePathwayProgressAction(pathwayProgress));
            //console.log(res.status);
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
              { name, presetContent, personalizedContent, _id },
              moduleIndex
            ) => {
              let currModuleProgress = allPathwayProgress
                .find(({ pathwayId }) => pathwayId === pathwayInfo._id)
                ?.moduleProgress?.find(({ moduleId }) => moduleId === _id);
              //console.warn(currModuleProgress);
              if (!currModuleProgress) {
                currModuleProgress = {
                  contentProgress: [],
                  moduleId: pathwayInfo.modules[0]._id,
                  finished: false,
                  name: pathwayInfo.modules[0].name,
                };
              }
              return (
                <DropDownTab
                  isFinishedModule={currModuleProgress?.finished}
                  isFinishedContent={currModuleProgress?.contentProgress?.map(
                    ({ finished }) => finished
                  )}
                  currSelectedPath={currSelected}
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
                    console.log(pathwaysProgress);
                    if (currContent.type.toLowerCase() === "article") {
                      setArticleToFinished(currContent, name, _id);
                    }
                    setCurrSelected(name + contentTitle);
                    setCurrPage(
                      <div className="d-flex flex-column" style={{ flex: 3 }}>
                        {currContent.type.toLowerCase() === "video" ? (
                          <>
                            <div className="w-100" style={{ height: "55%" }}>
                              <YoutubeEmbed
                                isPathway
                                key={`youtube-container-${currContent.url.substring(
                                  currContent.url.indexOf("v=") !== -1
                                    ? currContent.url.indexOf("v=") + 2
                                    : currContent.url.lastIndexOf("/") + 1
                                )}`}
                                isVideoFinished={
                                  currModuleProgress.contentProgress.find(
                                    (contentProgress, index) => {
                                      return (
                                        contentProgress.name ===
                                        currContent.name
                                      );
                                    }
                                  )?.finished
                                }
                                videoTime={
                                  currModuleProgress.contentProgress.find(
                                    (contentProgress, index) => {
                                      return (
                                        contentProgress.name ===
                                        currContent.name
                                      );
                                    }
                                  )?.videoTime
                                    ? currModuleProgress.contentProgress.find(
                                        (contentProgress, index) => {
                                          return (
                                            contentProgress.name ===
                                            currContent.name
                                          );
                                        }
                                      ).videoTime
                                    : 0
                                }
                                onVideoTimeUpdate={(player) =>
                                  //WORKS!!!!!!!!!!!!!!!
                                  onVideoTimeUpdate(
                                    player,
                                    currContent,
                                    name,
                                    _id
                                  )
                                }
                                videoId={currContent.url.substring(
                                  currContent.url.indexOf("v=") !== -1
                                    ? currContent.url.indexOf("v=") + 2
                                    : currContent.url.lastIndexOf("/") + 1
                                )}
                              />
                            </div>
                            <div className="container-fluid center-child flex-column py-5">
                              <div className="pathway-description">
                                <span
                                  className="fw-bold cl-dark-text"
                                  style={{ fontSize: "1.7em" }}
                                >
                                  {currContent.name}
                                </span>
                              </div>
                              <div className="ms-5 mt-3 w-100">
                                <div className="ms-5 text-start">
                                  {currContent.content}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <embed
                            src={currContent.url}
                            className="w-100 h-100"
                          />
                        )}
                      </div>
                    );
                  }}
                  title={name}
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
export default connect((state) => ({
  pathwaysProgress: state.pathwaysProgress,
}))(Pathways);
