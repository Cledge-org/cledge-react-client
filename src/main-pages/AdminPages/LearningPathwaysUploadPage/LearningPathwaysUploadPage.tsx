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
import UploadTextInput from "src/main-pages/AdminPages/components/UploadTextInput/UploadTextInput";
import ContentUpload from "src/main-pages/AdminPages/LearningPathwaysUploadPage/components/ContentUpload/ContentUpload";

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
    coverImage: "",
    modules: [
      {
        _id: null,
        name: "",
        presetContent: [
          {
            priority: -1,
            primaryType: "video",
            name: "",
            content: [],
          },
        ],
        personalizedContent: [
          {
            moduleId: null,
            _id: null,
            priority: -1,
            primaryType: "video",
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
            //console.log(jsonArr);
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
                  coverImage: sendPathwayData.coverImage,
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
                  //console.log(index + " " + value.status);
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
                  coverImage: "",
                  modules: [
                    {
                      _id: null,
                      name: "",
                      presetContent: [
                        {
                          priority: -1,
                          name: "",
                          primaryType: "video",
                          content: [],
                        },
                      ],
                      personalizedContent: [
                        {
                          moduleId: null,
                          _id: null,
                          priority: -1,
                          primaryType: "video",
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
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Cover Image:
          </label>
          <img
            style={{ objectFit: "contain", width: "50%" }}
            src={currPathwayData.coverImage as string}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                const img = event.target.files[0];
                let reader = new FileReader();
                reader.onload = (e) => {
                  const imgURL = e.target.result;
                  let course = currPathwayData;
                  course.coverImage = imgURL;
                  setCurrPathwayData({
                    ...currPathwayData,
                    tags: course.tags,
                  });
                  setCurrPathwayData({
                    ...currPathwayData,
                    coverImage: course.coverImage,
                  });
                };
                reader.readAsDataURL(img);
              }
            }}
          />
        </div>
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
                    <ContentUpload
                      module={module}
                      currPathwayData={currPathwayData}
                      index={index}
                      setCurrPathwayData={setCurrPathwayData}
                      isPersonalized={false}
                    />
                    <button
                      onClick={() => {
                        let course = currPathwayData;
                        course.modules[index].presetContent.push({
                          priority: -1,
                          name: "",
                          primaryType: "video",
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
                    <ContentUpload
                      module={module}
                      currPathwayData={currPathwayData}
                      index={index}
                      setCurrPathwayData={setCurrPathwayData}
                      isPersonalized={true}
                    />
                    <button
                      onClick={() => {
                        let course = currPathwayData;
                        course.modules[index].personalizedContent.push({
                          moduleId: null,
                          _id: null,
                          priority: -1,
                          primaryType: "video",
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
                  primaryType: "video",
                  content: [],
                },
              ],
              personalizedContent: [
                {
                  moduleId: null,
                  _id: null,
                  priority: -1,
                  name: "",
                  primaryType: "video",
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
                          //console.log(index + " " + value.status);
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
