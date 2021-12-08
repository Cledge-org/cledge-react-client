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
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
                    {newCourseData.tags.map((tag) => (
                      <input
                        value={tag}
                        onChange={(e) =>
                          setResourceData({
                            ...resourceData,
                            title: e.target.value,
                          })
                        }
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
                              onChange={(e) =>
                                setNewCourseData({
                                  ...newCourseData,
                                  title: e.target.value,
                                })
                              }
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
                              {newCourseData.tags.map((tag) => (
                                <input
                                  value={tag}
                                  onChange={(e) =>
                                    setResourceData({
                                      ...resourceData,
                                      title: e.target.value,
                                    })
                                  }
                                  type="text"
                                  className="px-3 form-control me-2 mt-2"
                                  style={{ width: "10vw" }}
                                  id="module-tags"
                                  placeholder="Enter module tag"
                                />
                              ))}
                              <button
                                style={{ width: "24px", height: "24px" }}
                                className="align-self-center align-items-center justify-content-center"
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
                            {module.presetContent.map((preset, index) => {
                              return (
                                <>
                                  <div className="form-group">
                                    <label
                                      style={{ fontSize: "0.9em" }}
                                      className="text-muted"
                                      htmlFor={`preset-title-${
                                        module.title + index
                                      }`}
                                    >
                                      Preset Title:
                                    </label>
                                    <input
                                      value={preset.title}
                                      onChange={(e) =>
                                        setNewCourseData({
                                          ...newCourseData,
                                          title: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="px-3 form-control"
                                      id={`preset-title-${
                                        module.title + index
                                      }`}
                                      placeholder="Enter preset title"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label
                                      style={{ fontSize: "0.9em" }}
                                      className="text-muted"
                                      htmlFor={`preset-priority-${
                                        module.title + index
                                      }`}
                                    >
                                      Priority:
                                    </label>
                                    <input
                                      value={preset.priority}
                                      onChange={(e) =>
                                        setNewCourseData({
                                          ...newCourseData,
                                          title: e.target.value,
                                        })
                                      }
                                      type="number"
                                      className="px-3 form-control"
                                      id={`preset-priority-${
                                        module.title + index
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
                                      console.log(value);
                                      setResourceType(value);
                                    }}
                                    defaultValue={resourceType}
                                    valuesList={[
                                      "Video",
                                      "Article",
                                      "Resource",
                                    ]}
                                  />
                                  <div className="py-2" />
                                  <div className="form-group">
                                    <label
                                      style={{ fontSize: "0.9em" }}
                                      className="text-muted"
                                      htmlFor={`preset-url-${
                                        module.title + index
                                      }`}
                                    >
                                      URL:
                                    </label>
                                    <input
                                      value={preset.url}
                                      onChange={(e) =>
                                        setNewCourseData({
                                          ...newCourseData,
                                          title: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="px-3 form-control"
                                      id={`preset-url-${module.title + index}`}
                                      placeholder="Enter url"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label
                                      style={{ fontSize: "0.9em" }}
                                      className="text-muted"
                                      htmlFor={`preset-content-${
                                        module.title + index
                                      }`}
                                    >
                                      Content:
                                    </label>
                                    <input
                                      value={preset.content}
                                      onChange={(e) =>
                                        setNewCourseData({
                                          ...newCourseData,
                                          title: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="px-3 form-control"
                                      id={`preset-content-${
                                        module.title + index
                                      }`}
                                      placeholder="Enter content"
                                    />
                                  </div>
                                </>
                              );
                            })}
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
                              (personalized, index) => {
                                return (
                                  <>
                                    <div className="form-group">
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                        htmlFor={`personalized-title-${
                                          module.title + index
                                        }`}
                                      >
                                        Personalized Title:
                                      </label>
                                      <input
                                        value={personalized.title}
                                        onChange={(e) =>
                                          setNewCourseData({
                                            ...newCourseData,
                                            title: e.target.value,
                                          })
                                        }
                                        type="text"
                                        className="px-3 form-control"
                                        id={`personalized-title-${
                                          module.title + index
                                        }`}
                                        placeholder="Enter personalized title"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                        htmlFor={`personalized-priority-${
                                          module.title + index
                                        }`}
                                      >
                                        Priority:
                                      </label>
                                      <input
                                        value={personalized.priority}
                                        onChange={(e) =>
                                          setNewCourseData({
                                            ...newCourseData,
                                            title: e.target.value,
                                          })
                                        }
                                        type="number"
                                        className="px-3 form-control"
                                        id={`personalized-priority-${
                                          module.title + index
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
                                        console.log(value);
                                        setResourceType(value);
                                      }}
                                      defaultValue={resourceType}
                                      valuesList={[
                                        "Video",
                                        "Article",
                                        "Resource",
                                      ]}
                                    />
                                    <div className="py-2" />
                                    <div className="form-group">
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                        htmlFor={`personalized-url-${
                                          module.title + index
                                        }`}
                                      >
                                        URL:
                                      </label>
                                      <input
                                        value={personalized.url}
                                        onChange={(e) =>
                                          setNewCourseData({
                                            ...newCourseData,
                                            title: e.target.value,
                                          })
                                        }
                                        type="text"
                                        className="px-3 form-control"
                                        id={`personalized-url-${
                                          module.title + index
                                        }`}
                                        placeholder="Enter url"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                        htmlFor={`personalized-content-${
                                          module.title + index
                                        }`}
                                      >
                                        Content:
                                      </label>
                                      <input
                                        value={personalized.content}
                                        onChange={(e) =>
                                          setNewCourseData({
                                            ...newCourseData,
                                            title: e.target.value,
                                          })
                                        }
                                        type="text"
                                        className="px-3 form-control"
                                        id={`personalized-content-${
                                          module.title + index
                                        }`}
                                        placeholder="Enter content"
                                      />
                                    </div>
                                  </>
                                );
                              }
                            )}
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
