import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckBox from "src/common/components/CheckBox/CheckBox";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import UploadTextInput from "src/main-pages/AdminPages/components/UploadTextInput/UploadTextInput";
import SubQuestionForm from "src/main-pages/AdminPages/QuestionUploadPage/components/QuestionForm/components/SubQuestionForm/SubQuestionForm";

const QuestionForm = ({
  currQuestionList,
  currQuestion,
  chunkIndex,
  setCurrQuestionList,
  questionIndex,
}: {
  currQuestionList: QuestionList;
  currQuestion: Question;
  chunkIndex: number;
  questionIndex: number;
  setCurrQuestionList: Function;
}) => {
  return (
    <>
      <div className="ms-3">
        <button
          className="me-2"
          style={{
            width: "36px",
            height: "36px",
            color: "red",
          }}
          onClick={() => {
            let copy = currQuestionList;
            copy.chunks[chunkIndex].questions.splice(questionIndex, 1);
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
            value={currQuestion.question}
            onChange={(e) => {
              let currQuestionListCopy = currQuestionList;
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].question = e.target.value;
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
            type="text"
            className="px-3 form-control"
            placeholder="Enter Question"
          />
        </div>
        {currQuestion._id ? (
          <div className="form-group mb-2">
            <label style={{ fontSize: "0.9em" }} className="text-muted">
              Question ID:
            </label>
            <input
              disabled
              value={currQuestion._id.toString()}
              type="text"
              className="px-3 form-control"
              placeholder="No ID"
            />
          </div>
        ) : null}
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
              ].type = value;
              if (
                value === "DoubleDropdownQuestion" ||
                value === "DoubleTextInputQuestion"
              ) {
                currQuestionListCopy.chunks[chunkIndex].questions[
                  questionIndex
                ].data = [
                  {
                    _id: 0,
                    question: "",
                    type:
                      value === "DoubleDropdownQuestion"
                        ? "DropDownQuestion"
                        : "TextInputQuestion",
                    placeholder: "",
                    data: [""],
                    isConcatenable: false,
                    isRequired: false,
                  },
                  {
                    _id: 0,
                    question: "",
                    type:
                      value === "DoubleDropdownQuestion"
                        ? "DropDownQuestion"
                        : "TextInputQuestion",
                    placeholder: "",
                    data: [""],
                    isConcatenable: false,
                    isRequired: false,
                  },
                ];
              }
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
            defaultValue={currQuestion.type}
            placeholder="Choose Question Type"
            valuesList={[
              "CheckBox",
              "MCQ",
              "TextInput",
              "Ranking",
              "ECTimeFrame",
              "ECTextInput",
              "DropDownQuestion",
              "ListQuestion",
              "CompositeQuestion",
              "DoubleTextInputQuestion",
              "DoubleDropdownQuestion",
            ]}
          />
        </div>
        <UploadTextInput
          title={"Pop Up Text (Optional)"}
          onChange={(e) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].popUpText = e.target.value;
            setCurrQuestionList({ ...currQuestionListCopy });
          }}
          placeholder="Enter Pop Text"
          value={currQuestion.popUpText}
        />
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Data:
          </label>
          <div className="d-flex flex-row w-100 flex-wrap">
            {currQuestion.data.map((dataValue, dataIndex) =>
              currQuestion.type === "DoubleDropdownQuestion" ||
              currQuestion.type === "DoubleTextInputQuestion" ? (
                <div className="d-flex flex-column">
                  <UploadTextInput
                    title={"Question"}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex].question = e.target.value;
                      setCurrQuestionList({
                        ...currQuestionListCopy,
                      });
                    }}
                    value={dataValue.question}
                  />
                  <div className="d-flex flex-row w-100 flex-wrap">
                    <label style={{ fontSize: "0.9em" }} className="text-muted">
                      Data:
                    </label>
                    {dataValue.data.map((subValue, subIndex) => {
                      return (
                        <div className="form-group">
                          <input
                            value={subValue}
                            onChange={(e) => {
                              let currQuestionListCopy = currQuestionList;
                              currQuestionListCopy.chunks[chunkIndex].questions[
                                questionIndex
                              ].data[dataIndex].data[subIndex] = e.target.value;
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
                  </div>
                  <UploadTextInput
                    title={"Placeholder"}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex].placeholder = e.target.value;
                      setCurrQuestionList({
                        ...currQuestionListCopy,
                      });
                    }}
                    value={dataValue.placeholder}
                  />
                </div>
              ) : currQuestion.type === "DropDownQuestion" ? (
                <div className="form-group">
                  <input
                    value={dataValue}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex] = e.target.value;
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
              ) : currQuestion.type === "ListQuestion" ||
                currQuestion.type === "CompositeQuestion" ? (
                <SubQuestionForm
                  currQuestionList={currQuestionList}
                  dataIndex={dataIndex}
                  chunkIndex={chunkIndex}
                  dataValue={dataValue}
                  questionIndex={questionIndex}
                  setCurrQuestionList={setCurrQuestionList}
                />
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
                    value={dataValue.op}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex].op = e.target.value;
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
                    value={dataValue.tag}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex].tag = e.target.value;
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
            {currQuestion.type !== "DoubleDropdownQuestion" &&
              currQuestion.type !== "DoubleTextInputQuestion" && (
                <button
                  style={{ width: "24px", height: "24px" }}
                  className="align-self-center align-items-center justify-content-center"
                  onClick={() => {
                    let currQuestionListCopy = currQuestionList;
                    if (currQuestion.type === "DropDownQuestion") {
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data.push("");
                    } else if (
                      currQuestion.type === "ListQuestion" ||
                      currQuestion.type === "CompositeQuestion"
                    ) {
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data.push({
                        _id: null,
                        question: "",
                        type: "",
                        placeholder: "",
                        data: [],
                        isConcatenable: false,
                        isRequired: false,
                      });
                    } else {
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data.push({ op: "", tag: "" });
                    }
                    setCurrQuestionList({ ...currQuestionListCopy });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
          </div>
        </div>
        <UploadTextInput
          title={"Placeholder (Optional)"}
          onChange={(e) => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks[chunkIndex].questions[
              questionIndex
            ].placeholder = e.target.value;
            setCurrQuestionList({ ...currQuestionListCopy });
          }}
          placeholder="Enter Placeholder"
          value={currQuestion.placeholder}
        />
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Is Concatenable (Optional):
          </label>
          <CheckBox
            selected={currQuestion.isConcatenable}
            setSelected={(selectState) => {
              let currQuestionListCopy = currQuestionList;
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].isConcatenable = selectState;
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Is Required (Optional):
          </label>
          <CheckBox
            selected={currQuestion.isRequired}
            setSelected={(selectState) => {
              let currQuestionListCopy = currQuestionList;
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].isRequired = selectState;
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
          />
        </div>
        {currQuestion.type === "TextInput" && (
          <>
            <div className="form-group">
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Numbers Only (Optional):
              </label>
              <CheckBox
                selected={currQuestion.numbersOnly}
                setSelected={(selectState) => {
                  let currQuestionListCopy = currQuestionList;
                  currQuestionListCopy.chunks[chunkIndex].questions[
                    questionIndex
                  ].numbersOnly = selectState;
                  setCurrQuestionList({ ...currQuestionListCopy });
                }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Text Area (Optional):
              </label>
              <CheckBox
                selected={currQuestion.isTextArea}
                setSelected={(selectState) => {
                  let currQuestionListCopy = currQuestionList;
                  currQuestionListCopy.chunks[chunkIndex].questions[
                    questionIndex
                  ].isTextArea = selectState;
                  setCurrQuestionList({ ...currQuestionListCopy });
                }}
              />
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => {
          let currQuestionListCopy = currQuestionList;
          currQuestionListCopy.chunks[chunkIndex].questions.splice(
            questionIndex + 1,
            0,
            {
              _id: null,
              question: "",
              type: "",
              placeholder: "",
              data: [],
              isRequired: false,
              isConcatenable: false,
            }
          );
          setCurrQuestionList({ ...currQuestionListCopy });
        }}
      >
        Add Another Question
      </button>
    </>
  );
};
export default QuestionForm;
