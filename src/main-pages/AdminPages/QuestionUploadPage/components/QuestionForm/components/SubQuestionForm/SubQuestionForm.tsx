import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckBox from "src/common/components/CheckBox/CheckBox";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import UploadTextInput from "src/main-pages/AdminPages/components/UploadTextInput/UploadTextInput";

const SubQuestionForm = ({
  currQuestionList,
  dataIndex,
  dataValue,
  chunkIndex,
  setCurrQuestionList,
  questionIndex,
}: {
  currQuestionList: QuestionList;
  dataIndex: number;
  chunkIndex: number;
  dataValue: Question;
  questionIndex: number;
  setCurrQuestionList: Function;
}) => {
  return (
    <div className="ms-4">
      <button
        className="me-2"
        style={{
          width: "36px",
          height: "36px",
          color: "red",
        }}
        onClick={() => {
          let copy = currQuestionList;
          copy.chunks[chunkIndex].questions[questionIndex].data.splice(
            dataIndex,
            1
          );
          setCurrQuestionList({
            ...copy,
          });
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className="form-group">
        <label style={{ fontSize: "0.9em" }} className="text-muted">
          Question:
        </label>
        <input
          value={dataValue.question}
          onChange={(e) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].data[dataIndex].question = e.target.value;
            setCurrQuestionList({
              ...currQuestionListCopy,
            });
          }}
          type="text"
          className="px-3 form-control"
          placeholder="Enter Question"
        />
      </div>
      <div className="form-group mb-2">
        <label style={{ fontSize: "0.9em" }} className="text-muted">
          Question ID: Inner
        </label>
        <input
          value={dataValue._id}
          type="text"
          onChange={(e) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].data[dataIndex]._id = e.target.value;
            setCurrQuestionList({
              ...currQuestionListCopy,
            });
          }}
          className="px-3 form-control"
          placeholder="No ID"
        />
      </div>
      <div className="form-group mb-2">
        <label style={{ fontSize: "0.9em" }} className="text-muted">
          Question Type:
        </label>
        <DropDownQuestion
          isForWaitlist
          onChange={(value) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].data[dataIndex].type = value;
            if (
              value === "DoubleDropdownQuestion" ||
              value === "DoubleTextInputQuestion"
            ) {
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].data[dataIndex].data = [
                {
                  _id: 0,
                  question: "",
                  type:
                    value === "DoubleDropdownQuestion"
                      ? "DropDownQuestion"
                      : "TextInputQuestion",
                  helpVid: "",
                  helpText: "",
                  data: [""],
                  isConcatenable: false,
                },
                {
                  _id: 1,
                  question: "",
                  type:
                    value === "DoubleDropdownQuestion"
                      ? "DropDownQuestion"
                      : "TextInputQuestion",
                  helpVid: "",
                  helpText: "",
                  data: [""],
                  isConcatenable: false,
                },
              ];
              console.log(
                currQuestionListCopy.chunks[chunkIndex].questions[questionIndex]
                  .data[dataIndex].data
              );
            }
            setCurrQuestionList({
              ...currQuestionListCopy,
            });
          }}
          defaultValue={dataValue.type}
          placeholder="Choose Question Type"
          valuesList={[
            "CheckBox",
            "MCQ",
            "TextInput",
            "Ranking",
            "ECTimeFrame",
            "ECTextInput",
            "DropDownQuestion",
            "DoubleTextInputQuestion",
            "DoubleDropdownQuestion",
          ]}
        />
      </div>
      <div className="form-group">
        <label style={{ fontSize: "0.9em" }} className="text-muted">
          Data:
        </label>
        <div className="d-flex flex-row w-100 flex-wrap">
          {dataValue.data.map((value, index) =>
            dataValue.type === "DoubleDropdownQuestion" ||
            dataValue.type === "DoubleTextInputQuestion" ? (
              <div className="d-flex flex-column">
                <UploadTextInput
                  title={"Question"}
                  onChange={(e) => {
                    let currQuestionListCopy = currQuestionList;
                    currQuestionListCopy.chunks[chunkIndex].questions[
                      questionIndex
                    ].data[dataIndex].data[index].question = e.target.value;
                    setCurrQuestionList({
                      ...currQuestionListCopy,
                    });
                  }}
                  value={value.question}
                />
                <div className="d-flex flex-row w-100 flex-wrap">
                  <label style={{ fontSize: "0.9em" }} className="text-muted">
                    Data:
                  </label>
                  {value.data.map((subValue, subIndex) => {
                    return (
                      <div className="form-group">
                        <input
                          value={subValue}
                          onChange={(e) => {
                            let currQuestionListCopy = currQuestionList;
                            currQuestionListCopy.chunks[chunkIndex].questions[
                              questionIndex
                            ].data[dataIndex].data[index].data[subIndex] =
                              e.target.value;
                            setCurrQuestionList({
                              ...currQuestionListCopy,
                            });
                          }}
                          type="text"
                          className="px-3 form-control me-2 mt-2"
                          style={{ width: "10vw" }}
                          placeholder="Enter Value"
                        />
                      </div>
                    );
                  })}
                  <button
                    style={{ width: "24px", height: "24px" }}
                    className="align-self-center align-items-center justify-content-center"
                    onClick={() => {
                      let currQuestionListCopy = currQuestionList;
                      console.log(
                        currQuestionListCopy.chunks[chunkIndex].questions[
                          questionIndex
                        ].data[dataIndex].data[index].data
                      );
                      if (value.type === "DropDownQuestion") {
                        currQuestionListCopy.chunks[chunkIndex].questions[
                          questionIndex
                        ].data[dataIndex].data[index].data.push("");
                      } else {
                        currQuestionListCopy.chunks[chunkIndex].questions[
                          questionIndex
                        ].data[dataIndex].data[index].data.push({
                          op: "",
                          tag: "",
                        });
                      }
                      setCurrQuestionList({
                        ...currQuestionListCopy,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <UploadTextInput
                  title={"HelpText"}
                  onChange={(e) => {
                    let currQuestionListCopy = currQuestionList;
                    currQuestionListCopy.chunks[chunkIndex].questions[
                      questionIndex
                    ].data[dataIndex].data[index].helpText = e.target.value;
                    setCurrQuestionList({
                      ...currQuestionListCopy,
                    });
                  }}
                  value={value.helpText}
                />
              </div>
            ) : dataValue.type === "DropDownQuestion" ? (
              <div className="form-group">
                <input
                  value={value}
                  onChange={(e) => {
                    let currQuestionListCopy = currQuestionList;
                    currQuestionListCopy.chunks[chunkIndex].questions[
                      questionIndex
                    ].data[dataIndex].data[index] = e.target.value;
                    setCurrQuestionList({
                      ...currQuestionListCopy,
                    });
                  }}
                  type="text"
                  className="px-3 form-control me-2 mt-2"
                  style={{ width: "10vw" }}
                  placeholder="Enter Value"
                />
              </div>
            ) : (
              <div
                className="form-group"
                style={{
                  borderTop: "2px solid black",
                  borderBottom: "2px solid black",
                }}
              >
                <label style={{ fontSize: "0.9em" }} className="text-muted">
                  Op:
                </label>
                <input
                  value={value.op}
                  onChange={(e) => {
                    let currQuestionListCopy = currQuestionList;
                    currQuestionListCopy.chunks[chunkIndex].questions[
                      questionIndex
                    ].data[dataIndex].data[index].op = e.target.value;
                    setCurrQuestionList({
                      ...currQuestionListCopy,
                    });
                  }}
                  type="text"
                  className="px-3 form-control me-2 mt-2"
                  style={{ width: "10vw" }}
                  placeholder="Enter Op"
                />
                <label style={{ fontSize: "0.9em" }} className="text-muted">
                  Tag:
                </label>
                <input
                  value={value.tag}
                  onChange={(e) => {
                    let currQuestionListCopy = currQuestionList;
                    currQuestionListCopy.chunks[chunkIndex].questions[
                      questionIndex
                    ].data[dataIndex].data[index].tag = e.target.value;
                    setCurrQuestionList({
                      ...currQuestionListCopy,
                    });
                  }}
                  type="text"
                  className="px-3 form-control me-2 mt-2"
                  style={{ width: "10vw" }}
                  placeholder="Enter Tag"
                />
              </div>
            )
          )}
          {!(
            dataValue.type === "DoubleTextInputQuestion" ||
            dataValue.type === "DoubleDropdownQuestion"
          ) && (
            <button
              style={{ width: "24px", height: "24px" }}
              className="align-self-center align-items-center justify-content-center"
              onClick={() => {
                let currQuestionListCopy = currQuestionList;
                if (dataValue.type === "DropDownQuestion") {
                  currQuestionListCopy.chunks[chunkIndex].questions[
                    questionIndex
                  ].data[dataIndex].data.push("");
                } else {
                  currQuestionListCopy.chunks[chunkIndex].questions[
                    questionIndex
                  ].data[dataIndex].data.push({
                    op: "",
                    tag: "",
                  });
                }
                setCurrQuestionList({
                  ...currQuestionListCopy,
                });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
      </div>
      <UploadTextInput
        title={"HelpVid (Optional)"}
        onChange={(e) => {
          let currQuestionListCopy = currQuestionList;
          currQuestionListCopy.chunks[chunkIndex].questions[questionIndex].data[
            dataIndex
          ].helpVid = e.target.value;
          setCurrQuestionList({
            ...currQuestionListCopy,
          });
        }}
        value={dataValue.helpVid}
        placeholder="Enter Description"
      />
      <UploadTextInput
        title={"HelpText (Optional)"}
        onChange={(e) => {
          let currQuestionListCopy = currQuestionList;
          currQuestionListCopy.chunks[chunkIndex].questions[questionIndex].data[
            dataIndex
          ].helpText = e.target.value;
          setCurrQuestionList({
            ...currQuestionListCopy,
          });
        }}
        value={dataValue.helpText}
        placeholder="Enter Description"
      />
      <div className="form-group">
        <label style={{ fontSize: "0.9em" }} className="text-muted">
          Is Concatenable (Optional):
        </label>
        <CheckBox
          selected={dataValue.isConcatenable}
          setSelected={(selectState) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].data[dataIndex].isConcatenable = selectState;
            setCurrQuestionList({
              ...currQuestionListCopy,
            });
          }}
        />
      </div>
    </div>
  );
};
export default SubQuestionForm;
