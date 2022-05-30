import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NextApplicationPage } from "../../AppPage/AppPage";
import router from "next/router";
import { getSession } from "next-auth/react";
import Modal from "react-modal";

import UploadPage from "../components/UploadPage/UploadPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import {
  callPutPathway,
  callPutPathwayModule,
  callPutPathwayModulePersonalizedContent,
} from "src/utils/apiCalls";
import UploadTextInput from "src/main-pages/UploadPages/components/UploadTextInput/UploadTextInput";

// logged in landing page
const LearningPathwaysUploadPage: NextApplicationPage<{
  allPathways: Pathway[];
}> = ({ allPathways }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const courseTitles = allPathways.map(({ name }) => name).concat("NEW COURSE");
  const [currCourseIndex, setCurrCourseIndex] = useState(allPathways.length);
  const [currPathwayData, setCurrPathwayData]: [
    currPathwayData: Pathway,
    setCurrPathwayData: Dispatch<SetStateAction<Pathway>>
  ] = useState({
    _id: null,
    name: "",
    modules: [
      {
        _id: null,
        name: "",
        presetContent: [
          {
            priority: -1,
            name: "",
            content: [],
          },
        ],
        personalizedContent: [
          {
            moduleId: null,
            _id: null,
            priority: -1,
            content: [],
            tags: ["", ""],
            name: "",
          },
        ],
        tags: ["", ""],
      },
    ],
    tags: ["", ""],
  });
  useEffect(() => {
    console.log(allPathways);
  }, []);
  return (
    <UploadPage
      onUpload={() => {
        let sendPathwayData = currPathwayData;
        sendPathwayData.tags = sendPathwayData.tags.filter((tag) => {
          return tag !== "";
        });
        sendPathwayData.modules.forEach((module, index) => {
          sendPathwayData.modules[index].tags = module.tags.filter((tag) => {
            return tag !== "";
          });
          module.personalizedContent.forEach(({ tags }, contentIndex) => {
            sendPathwayData.modules[index].personalizedContent[
              contentIndex
            ].tags = tags.filter((tag) => {
              return tag !== "";
            });
          });
        });
        Promise.all([
          ...sendPathwayData.modules.map((module, index) =>
            callPutPathwayModule({
              pathwayModuleId: module._id === null ? undefined : module._id,
              pathwayModule: {
                name: module.name,
                presetContent: module.presetContent,
                tags: module.tags,
              },
            })
          ),
        ])
          .then(async (resArr) => {
            let jsonArr = await Promise.all(
              resArr.map(async (res) => await res.json())
            );
            console.log(jsonArr);
            let personalizedContentUpload: PersonalizedContent[] = [];
            for (let i = 0; i < sendPathwayData.modules.length; i++) {
              personalizedContentUpload = personalizedContentUpload.concat(
                sendPathwayData.modules[i].personalizedContent.map(
                  (personalizedContent, index) => {
                    return {
                      ...personalizedContent,
                      moduleId: jsonArr[i].moduleId,
                    };
                  }
                )
              );
            }
            Promise.all([
              callPutPathway({
                pathwayId:
                  sendPathwayData._id === null
                    ? undefined
                    : sendPathwayData._id,
                pathway: {
                  tags: sendPathwayData.tags,
                  modules: jsonArr.map(({ moduleId }) => moduleId),
                  name: sendPathwayData.name,
                },
              }),
              ...personalizedContentUpload.map(
                async (personalizedContent) =>
                  await callPutPathwayModulePersonalizedContent({
                    contentId:
                      personalizedContent._id === null
                        ? undefined
                        : personalizedContent._id,
                    content: { ...personalizedContent, _id: undefined },
                  })
              ),
            ])
              .then((values) => {
                let unsuccessful = false;
                values.forEach((value, index) => {
                  console.log(index + " " + value.status);
                  if (value.status !== 200) {
                    unsuccessful = true;
                    alert(
                      "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
                    );
                  }
                });
                if (!unsuccessful) {
                  alert("Upload Successful!");
                }
                router.push({ pathname: "/dashboard" });
              })
              .catch((err) => console.error("AYO" + err));
          })
          .catch((err) => console.error("AYO2" + err));
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-name"
          >
            CURRENT PATHWAY:
          </label>
          <DropDownQuestion
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW COURSE") {
                setCurrPathwayData({
                  _id: null,
                  name: "",
                  modules: [
                    {
                      _id: null,
                      name: "",
                      presetContent: [
                        {
                          priority: -1,
                          name: "",
                          content: [],
                        },
                      ],
                      personalizedContent: [
                        {
                          moduleId: null,
                          _id: null,
                          priority: -1,
                          content: [],
                          tags: ["", ""],
                          name: "",
                        },
                      ],
                      tags: ["", ""],
                    },
                  ],
                  tags: ["", ""],
                });
                setCurrCourseIndex(allPathways.length + 1);
                return;
              }
              let courseIndex = courseTitles.indexOf(value);
              setCurrCourseIndex(courseIndex);
              setCurrPathwayData(allPathways[courseIndex]);
            }}
            defaultValue={"NEW COURSE"}
            valuesList={courseTitles}
          />
          <div className="mb-2" />
        </div>
        {currPathwayData._id === null ? null : (
          <div className="form-group">
            <button
              className="cl-btn-red w-100"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              DELETE THIS PATHWAY
            </button>
          </div>
        )}
        <UploadTextInput
          title="Pathway Name"
          onChange={(e) => {
            setCurrPathwayData({
              ...currPathwayData,
              name: e.target.value,
            });
          }}
          placeholder="Enter pathway name"
          value={currPathwayData.name}
        />
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-tags"
          >
            Tags:
          </label>
          <div className="d-flex flex-row w-100 flex-wrap">
            {currPathwayData.tags.map((tag, index) => (
              <input
                value={tag}
                onChange={(e) => {
                  let course = currPathwayData;
                  course.tags[index] = e.target.value;
                  setCurrPathwayData({
                    ...currPathwayData,
                    tags: course.tags,
                  });
                }}
                type="text"
                className="px-3 form-control me-2 mt-2"
                style={{ width: "10vw" }}
                id="course-tags"
                placeholder="Enter course tag"
              />
            ))}
            <button
              style={{ width: "24px", height: "24px" }}
              className="align-self-center align-items-center justify-content-center"
              onClick={() => {
                let courseTags = currPathwayData.tags;
                courseTags.push("");
                setCurrPathwayData({
                  ...currPathwayData,
                  tags: courseTags,
                });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="module"
          >
            Modules:
          </label>
          <div className="ms-4">
            {currPathwayData.modules.map((module, index) => {
              return (
                <>
                  <button
                    className="me-2"
                    style={{
                      width: "36px",
                      height: "36px",
                      color: "red",
                    }}
                    onClick={() => {
                      let course = currPathwayData;
                      course.modules.splice(index, 1);
                      setCurrPathwayData({
                        ...currPathwayData,
                        modules: course.modules,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <UploadTextInput
                    title="Module Name"
                    onChange={(e) => {
                      let course = currPathwayData;
                      course.modules[index].name = e.target.value;
                      setCurrPathwayData({
                        ...currPathwayData,
                        modules: course.modules,
                      });
                    }}
                    placeholder="Enter module name"
                    value={module.name}
                  />
                  <div className="form-group">
                    <label
                      style={{ fontSize: "0.9em" }}
                      className="text-muted"
                      htmlFor="module-tags"
                    >
                      Module Tags:
                    </label>
                    <div className="d-flex flex-row w-100 flex-wrap">
                      {currPathwayData.modules[index].tags.map(
                        (tag, tagIndex) => (
                          <input
                            value={tag}
                            onChange={(e) => {
                              let course = currPathwayData;
                              course.modules[index].tags[tagIndex] =
                                e.target.value;
                              setCurrPathwayData({
                                ...currPathwayData,
                                modules: course.modules,
                              });
                            }}
                            type="text"
                            className="px-3 form-control me-2 mt-2"
                            style={{ width: "10vw" }}
                            id="module-tags"
                            placeholder="Enter module tag"
                          />
                        )
                      )}
                      <button
                        style={{ width: "24px", height: "24px" }}
                        className="align-self-center align-items-center justify-content-center"
                        onClick={() => {
                          let course = currPathwayData;
                          course.modules[index].tags.push("");
                          setCurrPathwayData({
                            ...currPathwayData,
                            modules: course.modules,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <label
                    style={{ fontSize: "1.2em" }}
                    className="text-muted"
                    htmlFor="module"
                  >
                    Preset Content:
                  </label>
                  <div className="ms-4">
                    {module.presetContent.map((preset, contentIndex) => {
                      return (
                        <div className="d-flex w-100 align-items-center">
                          <button
                            className="me-2"
                            style={{
                              width: "36px",
                              height: "36px",
                              color: "red",
                            }}
                            onClick={() => {
                              let course = currPathwayData;
                              course.modules[index].presetContent.splice(
                                contentIndex,
                                1
                              );
                              setCurrPathwayData({
                                ...currPathwayData,
                                modules: course.modules,
                              });
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <div className="w-75">
                            <UploadTextInput
                              title="Preset Name"
                              onChange={(e) => {
                                let course = currPathwayData;
                                course.modules[index].presetContent[
                                  contentIndex
                                ].name = e.target.value;
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }}
                              placeholder="Enter preset name"
                              value={preset.name}
                            />
                            <UploadTextInput
                              title="Priority"
                              onChange={(e) => {
                                let course = currPathwayData;
                                course.modules[index].presetContent[
                                  contentIndex
                                ].priority = parseInt(e.target.value);
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }}
                              isNumber
                              placeholder="Enter priority"
                              value={preset.priority}
                            />
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                                htmlFor={`preset-content-${
                                  module.name + contentIndex
                                }`}
                              >
                                Content:
                              </label>
                              {preset.content.map(
                                (content, subContentIndex) => {
                                  return (
                                    <div className="ms-2">
                                      <div className="py-1" />
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                      >
                                        Type:
                                      </label>
                                      <DropDownQuestion
                                        isForWaitlist
                                        onChange={(value) => {
                                          let course = currPathwayData;
                                          course.modules[index].presetContent[
                                            contentIndex
                                          ].content[subContentIndex].type =
                                            value;
                                          setCurrPathwayData({
                                            ...currPathwayData,
                                            modules: course.modules,
                                          });
                                        }}
                                        defaultValue={content.type}
                                        placeholder="Pick Content Type"
                                        valuesList={[
                                          "video",
                                          "question",
                                          "blog",
                                        ]}
                                      />
                                      <div className="py-2" />
                                      {content.type === "blog" ? (
                                        <>
                                          //TODO: FETCH BLOGS AND ADD THEM HERE
                                          <div className="form-group">
                                            <label
                                              style={{ fontSize: "0.9em" }}
                                              className="text-muted"
                                            >
                                              blogId:
                                            </label>
                                            <DropDownQuestion
                                              isForWaitlist
                                              onChange={(value) => {}}
                                              defaultValue={content.blogId}
                                              placeholder="Pick Content Type"
                                              valuesList={[]}
                                            />
                                          </div>
                                        </>
                                      ) : content.type === "question" ? (
                                        <>
                                          <UploadTextInput
                                            title="Question"
                                            onChange={(e) => {
                                              let course = currPathwayData;
                                              course.modules[
                                                index
                                              ].presetContent[
                                                contentIndex
                                              ].content[
                                                subContentIndex
                                              ].question = e.target.value;
                                              setCurrPathwayData({
                                                ...currPathwayData,
                                                modules: course.modules,
                                              });
                                            }}
                                            placeholder="Enter question"
                                            value={content.question}
                                          />
                                          <div className="form-group">
                                            <label
                                              style={{ fontSize: "0.9em" }}
                                              className="text-muted"
                                            >
                                              questionType:
                                            </label>
                                            <DropDownQuestion
                                              isForWaitlist
                                              onChange={(value) => {
                                                let course = currPathwayData;
                                                course.modules[
                                                  index
                                                ].presetContent[
                                                  contentIndex
                                                ].content[
                                                  subContentIndex
                                                ].questionType = value;
                                                setCurrPathwayData({
                                                  ...currPathwayData,
                                                  modules: course.modules,
                                                });
                                              }}
                                              defaultValue={
                                                content.questionType
                                              }
                                              placeholder="Pick Question Type"
                                              valuesList={[
                                                "PathwayMCQ",
                                                "PathwayTextInput",
                                                "PathwayTextArea",
                                                "PathwayCheckBox",
                                                "PathwayLinearQuestion",
                                                "PathwayDropdown",
                                              ]}
                                            />
                                          </div>
                                          {content.data.map(() => {
                                            return {};
                                          })}
                                          <UploadTextInput
                                            title="helpText"
                                            onChange={(e) => {
                                              let course = currPathwayData;
                                              course.modules[
                                                index
                                              ].presetContent[
                                                contentIndex
                                              ].content[
                                                subContentIndex
                                              ].helpText = e.target.value;
                                              setCurrPathwayData({
                                                ...currPathwayData,
                                                modules: course.modules,
                                              });
                                            }}
                                            placeholder="Enter helpText"
                                            value={content.helpText}
                                          />
                                        </>
                                      ) : (
                                        content.type === "video" && (
                                          <>
                                            <UploadTextInput
                                              title="url"
                                              onChange={(e) => {
                                                let course = currPathwayData;
                                                course.modules[
                                                  index
                                                ].presetContent[
                                                  contentIndex
                                                ].content[subContentIndex].url =
                                                  e.target.value;
                                                setCurrPathwayData({
                                                  ...currPathwayData,
                                                  modules: course.modules,
                                                });
                                              }}
                                              placeholder="Enter url"
                                              value={content.url}
                                            />
                                            <UploadTextInput
                                              title="title"
                                              onChange={(e) => {
                                                let course = currPathwayData;
                                                course.modules[
                                                  index
                                                ].presetContent[
                                                  contentIndex
                                                ].content[
                                                  subContentIndex
                                                ].title = e.target.value;
                                                setCurrPathwayData({
                                                  ...currPathwayData,
                                                  modules: course.modules,
                                                });
                                              }}
                                              placeholder="Enter title"
                                              value={content.title}
                                            />
                                            <UploadTextInput
                                              title="description"
                                              onChange={(e) => {
                                                let course = currPathwayData;
                                                course.modules[
                                                  index
                                                ].presetContent[
                                                  contentIndex
                                                ].content[
                                                  subContentIndex
                                                ].description = e.target.value;
                                                setCurrPathwayData({
                                                  ...currPathwayData,
                                                  modules: course.modules,
                                                });
                                              }}
                                              placeholder="Enter description"
                                              value={content.description}
                                            />
                                            <UploadTextInput
                                              title="Video Source"
                                              onChange={(e) => {
                                                let course = currPathwayData;
                                                course.modules[
                                                  index
                                                ].presetContent[
                                                  contentIndex
                                                ].content[
                                                  subContentIndex
                                                ].videoSource = e.target.value;
                                                setCurrPathwayData({
                                                  ...currPathwayData,
                                                  modules: course.modules,
                                                });
                                              }}
                                              placeholder="Enter video source"
                                              value={content.videoSource}
                                            />
                                          </>
                                        )
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => {
                        let course = currPathwayData;
                        course.modules[index].presetContent.push({
                          priority: -1,
                          name: "",
                          content: [],
                        });
                        setCurrPathwayData({
                          ...currPathwayData,
                          modules: course.modules,
                        });
                      }}
                    >
                      Add Another Preset Content
                    </button>
                  </div>
                  <label
                    style={{ fontSize: "1.2em" }}
                    className="text-muted"
                    htmlFor="module"
                  >
                    Personalized Content:
                  </label>
                  <div className="ms-4">
                    {module.personalizedContent.map(
                      (personalized, contentIndex) => {
                        return (
                          <div className="d-flex w-100 align-items-center">
                            <button
                              className="me-2"
                              style={{
                                width: "36px",
                                height: "36px",
                                color: "red",
                              }}
                              onClick={() => {
                                let course = currPathwayData;
                                course.modules[
                                  index
                                ].personalizedContent.splice(contentIndex, 1);
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <div className="w-75">
                              <UploadTextInput
                                title="Personalized Name"
                                onChange={(e) => {
                                  let course = currPathwayData;
                                  course.modules[index].personalizedContent[
                                    contentIndex
                                  ].name = e.target.value;
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                placeholder="Enter personalized name"
                                value={personalized.name}
                              />
                              <UploadTextInput
                                title="Personalized Priority"
                                onChange={(e) => {
                                  let course = currPathwayData;
                                  course.modules[index].personalizedContent[
                                    contentIndex
                                  ].priority = parseInt(e.target.value);
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                isNumber
                                placeholder="Enter personalized priority"
                                value={personalized.priority}
                              />
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-content-${
                                    module.name + contentIndex
                                  }`}
                                >
                                  Content:
                                </label>
                                {personalized.content.map(() => {})}
                              </div>
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-content-tags-${
                                    module.name + contentIndex
                                  }`}
                                >
                                  Content Tags:
                                </label>
                                <div className="d-flex flex-row w-100 flex-wrap">
                                  {currPathwayData.modules[
                                    index
                                  ].personalizedContent[contentIndex].tags.map(
                                    (tag, tagIndex) => (
                                      <input
                                        value={tag}
                                        onChange={(e) => {
                                          let course = currPathwayData;
                                          course.modules[
                                            index
                                          ].personalizedContent[
                                            contentIndex
                                          ].tags[tagIndex] = e.target.value;
                                          setCurrPathwayData({
                                            ...currPathwayData,
                                            modules: course.modules,
                                          });
                                        }}
                                        type="text"
                                        className="px-3 form-control me-2 mt-2"
                                        style={{ width: "10vw" }}
                                        id={`personalized-content-tags-${
                                          module.name + contentIndex
                                        }`}
                                        placeholder="Enter content tag"
                                      />
                                    )
                                  )}
                                  <button
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                    }}
                                    className="align-self-center align-items-center justify-content-center"
                                    onClick={() => {
                                      let course = currPathwayData;
                                      course.modules[index].personalizedContent[
                                        contentIndex
                                      ].tags.push("");
                                      setCurrPathwayData({
                                        ...currPathwayData,
                                        modules: course.modules,
                                      });
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                    <button
                      onClick={() => {
                        let course = currPathwayData;
                        course.modules[index].personalizedContent.push({
                          moduleId: null,
                          _id: null,
                          priority: -1,
                          name: "",
                          content: [],
                          tags: [""],
                        });
                        setCurrPathwayData({
                          ...currPathwayData,
                          modules: course.modules,
                        });
                      }}
                    >
                      Add Another Personalized Content
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            let course = currPathwayData;
            course.modules.push({
              name: "",
              _id: null,
              presetContent: [
                {
                  priority: -1,
                  name: "",
                  content: [],
                },
              ],
              personalizedContent: [
                {
                  moduleId: null,
                  _id: null,
                  priority: -1,
                  name: "",
                  content: [],
                  tags: [""],
                },
              ],
              tags: ["", ""],
            });
            setCurrPathwayData({
              ...currPathwayData,
              modules: course.modules,
            });
          }}
        >
          Add Another Module
        </button>
      </div>
      <Modal
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(50, 50, 50, 0.5)",
          },
          content: {
            top: "30%",
            left: "35%",
            width: "30%",
            height: "fit-content",
            borderRadius: "20px",
            borderColor: "white",
            zIndex: 100,
          },
        }}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
      >
        <div className="center-child flex-column">
          Are you sure you want to delete this pathway?
          <div className="w-100 center-child mt-3">
            <button
              className="cl-btn-blue me-2"
              onClick={() => {
                let sendPathwayData = currPathwayData;
                Promise.all([
                  ...sendPathwayData.modules.map((module, index) =>
                    callPutPathwayModule({
                      pathwayModuleId:
                        module._id === null ? undefined : module._id,
                    })
                  ),
                ])
                  .then(async (resArr) => {
                    let personalizedContentUpload: PersonalizedContent[] = [];
                    for (let i = 0; i < sendPathwayData.modules.length; i++) {
                      personalizedContentUpload =
                        personalizedContentUpload.concat(
                          sendPathwayData.modules[i].personalizedContent.map(
                            (personalizedContent, index) => {
                              return {
                                ...personalizedContent,
                                moduleId: sendPathwayData.modules[i]._id,
                              };
                            }
                          )
                        );
                    }
                    Promise.all([
                      callPutPathway({
                        pathwayId:
                          sendPathwayData._id === null
                            ? undefined
                            : sendPathwayData._id,
                      }),
                      ...personalizedContentUpload.map(
                        async (personalizedContent) =>
                          await callPutPathwayModulePersonalizedContent({
                            contentId:
                              personalizedContent._id === null
                                ? undefined
                                : personalizedContent._id,
                          })
                      ),
                    ])
                      .then((values) => {
                        let unsuccessful = false;
                        values.forEach((value, index) => {
                          console.log(index + " " + value.status);
                          if (value.status !== 200) {
                            unsuccessful = true;
                            alert(
                              "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
                            );
                          }
                        });
                        if (!unsuccessful) {
                          alert("Upload Successful!");
                        }
                        router.push({ pathname: "/dashboard" });
                      })
                      .catch((err) => console.error("AYO" + err));
                  })
                  .catch((err) => console.error("AYO2" + err));
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              className="cl-btn-clear ms-2"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </UploadPage>
  );
};
export default LearningPathwaysUploadPage;
