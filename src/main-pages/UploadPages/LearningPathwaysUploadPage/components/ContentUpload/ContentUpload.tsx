import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import RichTextEditor from "src/common/components/RichTextEditor/RichTextEditor";
import UploadTextInput from "src/main-pages/UploadPages/components/UploadTextInput/UploadTextInput";

const ContentUpload = ({
  module,
  currPathwayData,
  index,
  setCurrPathwayData,
  isPersonalized,
}: {
  module: PathwayModule;
  currPathwayData: Pathway;
  index: number;
  setCurrPathwayData: Function;
  isPersonalized: boolean;
}) => {
  const content = isPersonalized
    ? module.personalizedContent
    : module.presetContent;
  const contentType = isPersonalized ? "personalizedContent" : "presetContent";
  return (
    <>
      {content.map((overallContent, contentIndex) => {
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
                course.modules[index][contentType].splice(contentIndex, 1);
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
                title="Content Name"
                onChange={(e) => {
                  let course = currPathwayData;
                  course.modules[index][contentType][contentIndex].name =
                    e.target.value;
                  setCurrPathwayData({
                    ...currPathwayData,
                    modules: course.modules,
                  });
                }}
                placeholder="Enter name"
                value={overallContent.name}
              />
              <UploadTextInput
                title="Priority"
                onChange={(e) => {
                  let course = currPathwayData;
                  course.modules[index][contentType][contentIndex].priority =
                    parseInt(e.target.value);
                  setCurrPathwayData({
                    ...currPathwayData,
                    modules: course.modules,
                  });
                }}
                isNumber
                placeholder="Enter priority"
                value={overallContent.priority}
              />
              <div className="py-1" />
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Primary Type:
              </label>
              <DropDownQuestion
                isForWaitlist
                onChange={(value) => {
                  let course = currPathwayData;
                  course.modules[index][contentType][contentIndex].primaryType =
                    value;
                  setCurrPathwayData({
                    ...currPathwayData,
                    modules: course.modules,
                  });
                }}
                defaultValue={overallContent.primaryType}
                placeholder="Pick Content Type"
                valuesList={["video", "question", "text", "image"]}
              />
              <div className="py-2" />
              {isPersonalized && (
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
                    {currPathwayData.modules[index].personalizedContent[
                      contentIndex
                    ].tags.map((tag, tagIndex) => (
                      <input
                        value={tag}
                        onChange={(e) => {
                          let course = currPathwayData;
                          course.modules[index].personalizedContent[
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
                    ))}
                    <button
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
              )}
              <div className="form-group">
                <label
                  style={{ fontSize: "0.9em" }}
                  className="text-muted"
                  htmlFor={`overallContent-content-${
                    module.name + contentIndex
                  }`}
                >
                  Content:
                </label>
                {overallContent.content.map((content, subContentIndex) => {
                  return (
                    <div className="ms-5">
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
                          const newContent =
                            value === "video"
                              ? {
                                  url: "",
                                  title: "",
                                  description: "",
                                  videoSource: "",
                                }
                              : value === "text"
                              ? {
                                  text: [],
                                }
                              : value === "image"
                              ? {
                                  url: "",
                                }
                              : {
                                  question: "",
                                  questionType: "",
                                  data: [],
                                  helpText: "",
                                };
                          course.modules[index][contentType][
                            contentIndex
                          ].content[subContentIndex] = {
                            type: value,
                            ...newContent,
                          };
                          setCurrPathwayData({
                            ...currPathwayData,
                            modules: course.modules,
                          });
                        }}
                        defaultValue={content.type}
                        placeholder="Pick Content Type"
                        valuesList={["video", "question", "text", "image"]}
                      />
                      <div className="py-2" />
                      {content.type === "text" ? (
                        <>
                          <RichTextEditor />
                        </>
                      ) : content.type === "question" ? (
                        <>
                          <UploadTextInput
                            title="Question"
                            onChange={(e) => {
                              let course = currPathwayData;
                              course.modules[index][contentType][
                                contentIndex
                              ].content[subContentIndex].question =
                                e.target.value;
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
                              Question Type:
                            </label>
                            <DropDownQuestion
                              isForWaitlist
                              onChange={(value) => {
                                let course = currPathwayData;
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].questionType = value;
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }}
                              defaultValue={content.questionType}
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
                          <div className="form-group">
                            <label
                              style={{ fontSize: "0.9em" }}
                              className="text-muted"
                            >
                              Data:
                            </label>
                            <div className="d-flex flex-row w-100 flex-wrap">
                              {content.data?.map((option) => (
                                <input
                                  value={option}
                                  onChange={(e) => {
                                    let course = currPathwayData;
                                    course.modules[index][contentType][
                                      contentIndex
                                    ].content[subContentIndex].data.push(
                                      e.target.value
                                    );
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
                              ))}
                              <button
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
                          <UploadTextInput
                            title="helpText"
                            onChange={(e) => {
                              let course = currPathwayData;
                              course.modules[index][contentType][
                                contentIndex
                              ].content[subContentIndex].helpText =
                                e.target.value;
                              setCurrPathwayData({
                                ...currPathwayData,
                                modules: course.modules,
                              });
                            }}
                            placeholder="Enter helpText"
                            value={content.helpText}
                          />
                        </>
                      ) : content.type === "image" ? (
                        <>
                          <img src={content.base64Img} />
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                              if (event.target.files && event.target.files[0]) {
                                let img = event.target.files[0];
                                const imgURL = URL.createObjectURL(img);
                                let course = currPathwayData;
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].base64Img = imgURL;
                                setCurrPathwayData({
                                  ...currPathwayData,
                                  modules: course.modules,
                                });
                              }
                            }}
                          />
                        </>
                      ) : (
                        content.type === "video" && (
                          <>
                            <UploadTextInput
                              title="url"
                              onChange={(e) => {
                                let course = currPathwayData;
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].url = e.target.value;
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
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].title =
                                  e.target.value;
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
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].description =
                                  e.target.value;
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
                                course.modules[index][contentType][
                                  contentIndex
                                ].content[subContentIndex].videoSource =
                                  e.target.value;
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
                })}
                <button
                  onClick={() => {
                    let course = currPathwayData;
                    course.modules[index][contentType][
                      contentIndex
                    ].content.push({ type: "" });
                    setCurrPathwayData({
                      ...currPathwayData,
                      modules: course.modules,
                    });
                  }}
                >
                  Add New Sub Content
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ContentUpload;
