import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NextApplicationPage } from "../_app";
import ECDropDown from "../../components/question_components/ec_dropdown_question";
import UploadPage from "../../components/common/upload-page";
import { ORIGIN_URL } from "../../config";
import router from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        allPathways: await (
          await fetch(`${ORIGIN_URL}/api/get-all-pathways`)
        ).json(),
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
// logged in landing page
const LearningPathwaysUploadPage: NextApplicationPage<{
  allPathways: Pathway[];
}> = ({ allPathways }) => {
  console.log(allPathways);
  const courseTitles = allPathways
    .map(({ title }) => title)
    .concat("NEW COURSE");
  const [currCourseIndex, setCurrCourseIndex] = useState(allPathways.length);
  const [currPathwayData, setCurrPathwayData]: [
    currPathwayData: Pathway,
    setCurrPathwayData: Dispatch<SetStateAction<Pathway>>
  ] = useState({
    _id: null,
    title: "",
    modules: [
      {
        _id: null,
        title: "",
        presetContent: [
          {
            priority: -1,
            title: "",
            type: "",
            url: "",
            content: "",
          },
        ],
        personalizedContent: [
          {
            moduleId: null,
            _id: null,
            priority: -1,
            content: "",
            tags: ["", ""],
            title: "",
            type: "",
            url: "",
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
        let shouldChangeIds = currPathwayData._id === null;
        console.log(shouldChangeIds);
        Promise.all([
          ...currPathwayData.modules.map((module, index) =>
            fetch("/api/put-pathway-module", {
              method: "POST",
              body: JSON.stringify({
                pathwayModuleId: shouldChangeIds ? undefined : module._id,
                pathwayModule: {
                  _id: shouldChangeIds ? undefined : module._id,
                  title: module.title,
                  presetContent: module.presetContent,
                  tags: module.tags,
                },
              }),
            })
          ),
        ])
          .then(async (resArr) => {
            let jsonArr = await Promise.all(
              resArr.map(async (res) => await res.json())
            );
            let personalizedContentUpload: PersonalizedContent[] =
              currPathwayData.modules[0].personalizedContent.map(
                (personalizedContent, index) => {
                  return {
                    ...personalizedContent,
                    _id: shouldChangeIds ? undefined : personalizedContent._id,
                    moduleId: shouldChangeIds
                      ? jsonArr[0].moduleId
                      : personalizedContent.moduleId,
                  };
                }
              );
            for (let i = 1; i < currPathwayData.modules.length; i++) {
              personalizedContentUpload = personalizedContentUpload.concat(
                currPathwayData.modules[i].personalizedContent.map(
                  (personalizedContent, index) => {
                    return {
                      ...personalizedContent,
                      _id: shouldChangeIds
                        ? undefined
                        : personalizedContent._id,
                      moduleId: shouldChangeIds
                        ? jsonArr[i].moduleId
                        : personalizedContent.moduleId,
                    };
                  }
                )
              );
            }
            Promise.all([
              fetch("/api/put-pathway", {
                method: "POST",
                body: JSON.stringify({
                  pathwayId: shouldChangeIds ? undefined : currPathwayData._id,
                  pathway: {
                    _id: shouldChangeIds ? undefined : currPathwayData._id,
                    tags: currPathwayData.tags,
                    modules: jsonArr.map(({ moduleId }) => moduleId),
                    title: currPathwayData.title,
                  },
                }),
              }),
              ...personalizedContentUpload.map(
                async (personalizedContent) =>
                  await fetch("/api/put-pathway-module-personalized-content", {
                    method: "POST",
                    body: JSON.stringify({
                      contentId: personalizedContent._id,
                      content: personalizedContent,
                    }),
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
                //router.push({ pathname: "/dashboard" });
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-title"
          >
            CURRENT PATHWAY:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW COURSE") {
                setCurrPathwayData({
                  _id: null,
                  title: "",
                  modules: [
                    {
                      _id: null,
                      title: "",
                      presetContent: [
                        {
                          priority: -1,
                          title: "",
                          type: "",
                          url: "",
                          content: "",
                        },
                      ],
                      personalizedContent: [
                        //WORKS DO NOT FIX
                        {
                          moduleId: null,
                          _id: null,
                          priority: -1,
                          content: "",
                          tags: ["", ""],
                          title: "",
                          type: "",
                          url: "",
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
        <div className="form-group">
          <label
            style={{ fontSize: "0.9em" }}
            className="text-muted"
            htmlFor="course-title"
          >
            Pathway Title:
          </label>
          <input
            value={currPathwayData.title}
            onChange={(e) =>
              setCurrPathwayData({
                ...currPathwayData,
                title: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="course-title"
            placeholder="Enter course title"
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
                  <div className="form-group">
                    <label
                      style={{ fontSize: "0.9em" }}
                      className="text-muted"
                      htmlFor={`module-title-${index}`}
                    >
                      Module Title:
                    </label>
                    <input
                      value={module.title}
                      onChange={(e) => {
                        let course = currPathwayData;
                        course.modules[index].title = e.target.value;
                        setCurrPathwayData({
                          ...currPathwayData,
                          modules: course.modules,
                        });
                      }}
                      type="text"
                      className="px-3 form-control"
                      id={`module-title-${index}`}
                      placeholder="Enter module title"
                    />
                  </div>
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
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                                htmlFor={`preset-title-${
                                  module.title + contentIndex
                                }`}
                              >
                                Preset Title:
                              </label>
                              <input
                                value={preset.title}
                                onChange={(e) => {
                                  let course = currPathwayData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].title = e.target.value;
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                type="text"
                                className="px-3 form-control"
                                id={`preset-title-${
                                  module.title + contentIndex
                                }`}
                                placeholder="Enter preset title"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                                htmlFor={`preset-priority-${
                                  module.title + contentIndex
                                }`}
                              >
                                Priority:
                              </label>
                              <input
                                value={preset.priority}
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
                                type="number"
                                className="px-3 form-control"
                                id={`preset-priority-${
                                  module.title + contentIndex
                                }`}
                                placeholder="Enter priority"
                              />
                            </div>
                            <div className="py-1" />
                            <label
                              style={{ fontSize: "0.9em" }}
                              className="text-muted"
                            >
                              Type:
                            </label>
                            <ECDropDown
                              isForWaitlist
                              onChange={(value) => {
                                let course = currPathwayData;
                                course.modules[index].presetContent[
                                  contentIndex
                                ].type = value;
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }}
                              placeholder="Pick Content Type"
                              valuesList={["Video", "Article"]}
                            />
                            <div className="py-2" />
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                                htmlFor={`preset-url-${
                                  module.title + contentIndex
                                }`}
                              >
                                URL:
                              </label>
                              <input
                                value={preset.url}
                                onChange={(e) => {
                                  let course = currPathwayData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].url = e.target.value;
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                type="text"
                                className="px-3 form-control"
                                id={`preset-url-${module.title + contentIndex}`}
                                placeholder="Enter url"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                                htmlFor={`preset-content-${
                                  module.title + contentIndex
                                }`}
                              >
                                Content:
                              </label>
                              <input
                                value={preset.content}
                                onChange={(e) => {
                                  let course = currPathwayData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].content = e.target.value;
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                type="text"
                                className="px-3 form-control"
                                id={`preset-content-${
                                  module.title + contentIndex
                                }`}
                                placeholder="Enter content"
                              />
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
                          title: "",
                          type: "",
                          url: "",
                          content: "",
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
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-title-${
                                    module.title + contentIndex
                                  }`}
                                >
                                  Personalized Title:
                                </label>
                                <input
                                  value={personalized.title}
                                  onChange={(e) => {
                                    let course = currPathwayData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].title = e.target.value;
                                    setCurrPathwayData({
                                      ...currPathwayData,
                                      modules: course.modules,
                                    });
                                  }}
                                  type="text"
                                  className="px-3 form-control"
                                  id={`personalized-title-${
                                    module.title + contentIndex
                                  }`}
                                  placeholder="Enter personalized title"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-priority-${
                                    module.title + contentIndex
                                  }`}
                                >
                                  Priority:
                                </label>
                                <input
                                  value={personalized.priority}
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
                                  type="number"
                                  className="px-3 form-control"
                                  id={`personalized-priority-${
                                    module.title + contentIndex
                                  }`}
                                  placeholder="Enter priority"
                                />
                              </div>
                              <div className="py-1" />
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                Type:
                              </label>
                              <ECDropDown
                                isForWaitlist
                                onChange={(value) => {
                                  let course = currPathwayData;
                                  course.modules[index].personalizedContent[
                                    contentIndex
                                  ].type = value;
                                  setCurrPathwayData({
                                    ...currPathwayData,
                                    modules: course.modules,
                                  });
                                }}
                                placeholder="Pick Personalized Content Type"
                                valuesList={["Video", "Article"]}
                              />
                              <div className="py-2" />
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-url-${
                                    module.title + contentIndex
                                  }`}
                                >
                                  URL:
                                </label>
                                <input
                                  value={personalized.url}
                                  onChange={(e) => {
                                    let course = currPathwayData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].url = e.target.value;
                                    setCurrPathwayData({
                                      ...currPathwayData,
                                      modules: course.modules,
                                    });
                                  }}
                                  type="text"
                                  className="px-3 form-control"
                                  id={`personalized-url-${
                                    module.title + contentIndex
                                  }`}
                                  placeholder="Enter url"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-content-${
                                    module.title + contentIndex
                                  }`}
                                >
                                  Content:
                                </label>
                                <input
                                  value={personalized.content}
                                  onChange={(e) => {
                                    let course = currPathwayData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].content = e.target.value;
                                    setCurrPathwayData({
                                      ...currPathwayData,
                                      modules: course.modules,
                                    });
                                  }}
                                  type="text"
                                  className="px-3 form-control"
                                  id={`personalized-content-${
                                    module.title + contentIndex
                                  }`}
                                  placeholder="Enter content"
                                />
                              </div>
                              <div className="form-group">
                                <label
                                  style={{ fontSize: "0.9em" }}
                                  className="text-muted"
                                  htmlFor={`personalized-content-tags-${
                                    module.title + contentIndex
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
                                          module.title + contentIndex
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
                          title: "",
                          type: "",
                          url: "",
                          content: "",
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
              title: "",
              _id: null,
              presetContent: [
                {
                  priority: -1,
                  title: "",
                  type: "",
                  url: "",
                  content: "",
                },
              ],
              personalizedContent: [
                {
                  moduleId: null,
                  _id: null,
                  priority: -1,
                  title: "",
                  type: "",
                  url: "",
                  content: "",
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
    </UploadPage>
  );
};
export default LearningPathwaysUploadPage;
