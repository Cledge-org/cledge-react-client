import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import Card from "../components/common/Card";
import CardVideo from "../components/common/Card_Video";
import CardText from "../components/common/Card_Text";
import CardTask from "../components/common/Card_Task";
import TabButton from "../components/common/TabButton";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "./_app";
import { getDashboardInfo } from "./api/get-dashboard-info";
import { useRouter } from "next/router";
import ECDropDown from "../components/question_components/ec_dropdown_question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return { props: {} };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

// logged in landing page
const UploadPage: NextApplicationPage<{}> = ({}) => {
  const router = useRouter();
  const session = useSession();
  const [resourceType, setResourceType] = useState("Video");
  const [resourceData, setResourceData] = useState({
    title: "",
    source: "",
    description: "",
  });
  const [newCourseData, setNewCourseData] = useState({
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
      },
    ],
    tags: ["", ""],
  });
  if (session.data.user.email === "yousefgomaa@hotmail.com") {
    return (
      <div className="container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center w-50">
          {router.query.type === "resources" ? (
            <>
              <ECDropDown
                isForWaitlist
                onChange={(value) => {
                  console.log(value);
                  setResourceType(value);
                }}
                defaultValue={resourceType}
                valuesList={["Video", "Article", "Resource"]}
              />
              <div className="mt-4 d-flex flex-column w-100">
                <div className="form-group">
                  <label
                    style={{ fontSize: "0.9em" }}
                    className="text-muted"
                    htmlFor="title"
                  >
                    Title:
                  </label>
                  <input
                    value={resourceData.title}
                    onChange={(e) =>
                      setResourceData({
                        ...resourceData,
                        title: e.target.value,
                      })
                    }
                    type="text"
                    className="px-3 form-control"
                    id="title"
                    placeholder="Enter title"
                  />
                </div>
                <div className="form-group">
                  <label
                    style={{ fontSize: "0.9em" }}
                    className="text-muted"
                    htmlFor="source"
                  >
                    Source:
                  </label>
                  <input
                    value={resourceData.source}
                    onChange={(e) =>
                      setResourceData({
                        ...resourceData,
                        source: e.target.value,
                      })
                    }
                    type="text"
                    className="px-3 form-control"
                    id="source"
                    placeholder="Enter Source"
                  />
                </div>
                {resourceType === "Article" ? (
                  <div className="form-group">
                    <label
                      style={{ fontSize: "0.9em" }}
                      className="text-muted"
                      htmlFor="description"
                    >
                      Description:
                    </label>
                    <input
                      value={resourceData.description}
                      onChange={(e) =>
                        setResourceData({
                          ...resourceData,
                          description: e.target.value,
                        })
                      }
                      type="text"
                      className="px-3 form-control"
                      id="description"
                      placeholder="Enter Description"
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : router.query.type === "learning-pathways" ? (
            <>
              <div className="mt-4 d-flex flex-column w-100">
                <div className="form-group">
                  <label
                    style={{ fontSize: "0.9em" }}
                    className="text-muted"
                    htmlFor="course-title"
                  >
                    Course Title:
                  </label>
                  <input
                    value={newCourseData.title}
                    onChange={(e) =>
                      setNewCourseData({
                        ...newCourseData,
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
                    {newCourseData.tags.map((tag, index) => (
                      <input
                        value={tag}
                        onChange={(e) => {
                          let course = newCourseData;
                          course.tags[index] = e.target.value;
                          setNewCourseData({
                            ...newCourseData,
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
                        let courseTags = newCourseData.tags;
                        courseTags.push("");
                        setNewCourseData({
                          ...newCourseData,
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
                    style={{ fontSize: "0.9em" }}
                    className="text-muted"
                    htmlFor="module"
                  >
                    Modules:
                  </label>
                  <div className="ms-4">
                    {newCourseData.modules.map((module, index) => {
                      return (
                        <>
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
                                let course = newCourseData;
                                course.modules[index].title = e.target.value;
                                setNewCourseData({
                                  ...newCourseData,
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
                              {newCourseData.modules[index].tags.map(
                                (tag, tagIndex) => (
                                  <input
                                    value={tag}
                                    onChange={(e) => {
                                      let course = newCourseData;
                                      course.modules[index].tags[tagIndex] =
                                        e.target.value;
                                      setNewCourseData({
                                        ...newCourseData,
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
                                  let course = newCourseData;
                                  course.modules[index].tags.push("");
                                  setNewCourseData({
                                    ...newCourseData,
                                    modules: course.modules,
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                          <label
                            style={{ fontSize: "0.9em" }}
                            className="text-muted"
                            htmlFor="module"
                          >
                            Preset Content:
                          </label>
                          <div className="ms-4">
                            {module.presetContent.map(
                              (preset, contentIndex) => {
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
                                        let course = newCourseData;
                                        course.modules[
                                          index
                                        ].presetContent.splice(contentIndex, 1);
                                        setNewCourseData({
                                          ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[index].presetContent[
                                              contentIndex
                                            ].title = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[index].presetContent[
                                              contentIndex
                                            ].priority = parseInt(
                                              e.target.value
                                            );
                                            setNewCourseData({
                                              ...newCourseData,
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
                                          let course = newCourseData;
                                          course.modules[index].presetContent[
                                            contentIndex
                                          ].type = value;
                                          setNewCourseData({
                                            ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[index].presetContent[
                                              contentIndex
                                            ].url = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
                                              modules: course.modules,
                                            });
                                          }}
                                          type="text"
                                          className="px-3 form-control"
                                          id={`preset-url-${
                                            module.title + contentIndex
                                          }`}
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
                                            let course = newCourseData;
                                            course.modules[index].presetContent[
                                              contentIndex
                                            ].content = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
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
                              }
                            )}
                            <button
                              onClick={() => {
                                let course = newCourseData;
                                course.modules[index].presetContent.push({
                                  priority: -1,
                                  title: "",
                                  type: "",
                                  url: "",
                                  content: "",
                                });
                                setNewCourseData({
                                  ...newCourseData,
                                  modules: course.modules,
                                });
                              }}
                            >
                              Add Another Preset Content
                            </button>
                          </div>
                          <label
                            style={{ fontSize: "0.9em" }}
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
                                        let course = newCourseData;
                                        course.modules[
                                          index
                                        ].personalizedContent.splice(
                                          contentIndex,
                                          1
                                        );
                                        setNewCourseData({
                                          ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[
                                              index
                                            ].personalizedContent[
                                              contentIndex
                                            ].title = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[
                                              index
                                            ].personalizedContent[
                                              contentIndex
                                            ].priority = parseInt(
                                              e.target.value
                                            );
                                            setNewCourseData({
                                              ...newCourseData,
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
                                          let course = newCourseData;
                                          course.modules[
                                            index
                                          ].personalizedContent[
                                            contentIndex
                                          ].type = value;
                                          setNewCourseData({
                                            ...newCourseData,
                                            modules: course.modules,
                                          });
                                        }}
                                        defaultValue={resourceType}
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
                                            let course = newCourseData;
                                            course.modules[
                                              index
                                            ].personalizedContent[
                                              contentIndex
                                            ].url = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
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
                                            let course = newCourseData;
                                            course.modules[
                                              index
                                            ].personalizedContent[
                                              contentIndex
                                            ].content = e.target.value;
                                            setNewCourseData({
                                              ...newCourseData,
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
                                          {newCourseData.modules[
                                            index
                                          ].personalizedContent[
                                            contentIndex
                                          ].tags.map((tag, tagIndex) => (
                                            <input
                                              value={tag}
                                              onChange={(e) => {
                                                let course = newCourseData;
                                                course.modules[
                                                  index
                                                ].personalizedContent[
                                                  contentIndex
                                                ].tags[tagIndex] =
                                                  e.target.value;
                                                setNewCourseData({
                                                  ...newCourseData,
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
                                          ))}
                                          <button
                                            style={{
                                              width: "24px",
                                              height: "24px",
                                            }}
                                            className="align-self-center align-items-center justify-content-center"
                                            onClick={() => {
                                              let course = newCourseData;
                                              course.modules[
                                                index
                                              ].personalizedContent[
                                                contentIndex
                                              ].tags.push("");
                                              setNewCourseData({
                                                ...newCourseData,
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
                                let course = newCourseData;
                                course.modules[index].personalizedContent.push({
                                  priority: -1,
                                  title: "",
                                  type: "",
                                  url: "",
                                  content: "",
                                  tags: [""],
                                  tagConfigs: [[]],
                                });
                                setNewCourseData({
                                  ...newCourseData,
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
              </div>
            </>
          ) : (
            <div></div>
          )}
          <button className="mt-3" onChange={() => {}}>
            Upload
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>404</div>
        <div>This page could not be found.</div>
      </div>
    </div>
  );
};
UploadPage.requireAuth = true;
export default UploadPage;
