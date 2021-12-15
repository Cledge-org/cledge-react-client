import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { getLearningPathways } from "../../pages/api/get-learning-pathways";
import { NextApplicationPage } from "../../pages/_app";
import ECDropDown from "../question_components/ec_dropdown_question";

// logged in landing page
const LearningPathwaysUploadPage: NextApplicationPage<{
  allCourses: Course[];
}> = ({ allCourses }) => {
  console.log(allCourses);
  const courseTitles = allCourses
    .map(({ title }) => title)
    .concat("NEW COURSE");
  const [currCourseData, setCurrCourseData] = useState({
    title: "",
    modules: [
      {
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
            tagConfigs: [["", ""]],
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
    console.log(allCourses);
  }, []);
  return (
    <>
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group">
          <label
            style={{ fontSize: "1.2em" }}
            className="text-muted"
            htmlFor="course-title"
          >
            CURRENT COURSE:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW COURSE") {
                setCurrCourseData({
                  title: "",
                  modules: [
                    {
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
                          tagConfigs: [["", ""]],
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
                return;
              }
              //DO NOT FIX THIS LINE!! IT WORKS JUST LIKE IT IS FOR NOW
              setCurrCourseData(allCourses[courseTitles.indexOf(value)]);
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
            Course Title:
          </label>
          <input
            value={currCourseData.title}
            onChange={(e) =>
              setCurrCourseData({
                ...currCourseData,
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
            {currCourseData.tags.map((tag, index) => (
              <input
                value={tag}
                onChange={(e) => {
                  let course = currCourseData;
                  course.tags[index] = e.target.value;
                  setCurrCourseData({
                    ...currCourseData,
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
                let courseTags = currCourseData.tags;
                courseTags.push("");
                setCurrCourseData({
                  ...currCourseData,
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
            {currCourseData.modules.map((module, index) => {
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
                      let course = currCourseData;
                      course.modules.splice(index, 1);
                      setCurrCourseData({
                        ...currCourseData,
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
                        let course = currCourseData;
                        course.modules[index].title = e.target.value;
                        setCurrCourseData({
                          ...currCourseData,
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
                      {currCourseData.modules[index].tags.map(
                        (tag, tagIndex) => (
                          <input
                            value={tag}
                            onChange={(e) => {
                              let course = currCourseData;
                              course.modules[index].tags[tagIndex] =
                                e.target.value;
                              setCurrCourseData({
                                ...currCourseData,
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
                          let course = currCourseData;
                          course.modules[index].tags.push("");
                          setCurrCourseData({
                            ...currCourseData,
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
                              let course = currCourseData;
                              course.modules[index].presetContent.splice(
                                contentIndex,
                                1
                              );
                              setCurrCourseData({
                                ...currCourseData,
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
                                  let course = currCourseData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].title = e.target.value;
                                  setCurrCourseData({
                                    ...currCourseData,
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
                                  let course = currCourseData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].priority = parseInt(e.target.value);
                                  setCurrCourseData({
                                    ...currCourseData,
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
                                let course = currCourseData;
                                course.modules[index].presetContent[
                                  contentIndex
                                ].type = value;
                                setCurrCourseData({
                                  ...currCourseData,
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
                                  let course = currCourseData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].url = e.target.value;
                                  setCurrCourseData({
                                    ...currCourseData,
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
                                  let course = currCourseData;
                                  course.modules[index].presetContent[
                                    contentIndex
                                  ].content = e.target.value;
                                  setCurrCourseData({
                                    ...currCourseData,
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
                        let course = currCourseData;
                        course.modules[index].presetContent.push({
                          priority: -1,
                          title: "",
                          type: "",
                          url: "",
                          content: "",
                        });
                        setCurrCourseData({
                          ...currCourseData,
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
                                let course = currCourseData;
                                course.modules[
                                  index
                                ].personalizedContent.splice(contentIndex, 1);
                                setCurrCourseData({
                                  ...currCourseData,
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
                                    let course = currCourseData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].title = e.target.value;
                                    setCurrCourseData({
                                      ...currCourseData,
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
                                    let course = currCourseData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].priority = parseInt(e.target.value);
                                    setCurrCourseData({
                                      ...currCourseData,
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
                                  let course = currCourseData;
                                  course.modules[index].personalizedContent[
                                    contentIndex
                                  ].type = value;
                                  setCurrCourseData({
                                    ...currCourseData,
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
                                    let course = currCourseData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].url = e.target.value;
                                    setCurrCourseData({
                                      ...currCourseData,
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
                                    let course = currCourseData;
                                    course.modules[index].personalizedContent[
                                      contentIndex
                                    ].content = e.target.value;
                                    setCurrCourseData({
                                      ...currCourseData,
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
                                  {currCourseData.modules[
                                    index
                                  ].personalizedContent[contentIndex].tags.map(
                                    (tag, tagIndex) => (
                                      <input
                                        value={tag}
                                        onChange={(e) => {
                                          let course = currCourseData;
                                          course.modules[
                                            index
                                          ].personalizedContent[
                                            contentIndex
                                          ].tags[tagIndex] = e.target.value;
                                          setCurrCourseData({
                                            ...currCourseData,
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
                                      let course = currCourseData;
                                      course.modules[index].personalizedContent[
                                        contentIndex
                                      ].tags.push("");
                                      setCurrCourseData({
                                        ...currCourseData,
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
                        let course = currCourseData;
                        course.modules[index].personalizedContent.push({
                          priority: -1,
                          title: "",
                          type: "",
                          url: "",
                          content: "",
                          tags: [""],
                          tagConfigs: [[]],
                        });
                        setCurrCourseData({
                          ...currCourseData,
                          modules: course.modules,
                        });
                      }}
                    >
                      Add Another Personalized Content
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      let course = currCourseData;
                      course.modules.push({
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
                            priority: -1,
                            title: "",
                            type: "",
                            url: "",
                            content: "",
                            tags: [""],
                            tagConfigs: [[]],
                          },
                        ],
                        tags: ["", ""],
                      });
                      setCurrCourseData({
                        ...currCourseData,
                        modules: course.modules,
                      });
                    }}
                  >
                    Add Another Module
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default LearningPathwaysUploadPage;
