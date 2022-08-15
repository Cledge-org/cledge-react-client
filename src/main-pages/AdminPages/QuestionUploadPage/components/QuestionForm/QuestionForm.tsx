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
                        console.log(
                          currQuestionListCopy.chunks[chunkIndex].questions[
                            questionIndex
                          ].data[dataIndex].data
                        );
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
                    title={"HelpText"}
                    onChange={(e) => {
                      let currQuestionListCopy = currQuestionList;
                      currQuestionListCopy.chunks[chunkIndex].questions[
                        questionIndex
                      ].data[dataIndex].helpText = e.target.value;
                      setCurrQuestionList({
                        ...currQuestionListCopy,
                      });
                    }}
                    value={dataValue.helpText}
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
                    helpVid: "",
                    helpText: "",
                    data: [],
                    isConcatenable: false,
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
          </div>
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            HelpVid (Optional):
          </label>
          <input
            value={currQuestion.helpVid}
            onChange={(e) => {
              let currQuestionListCopy = currQuestionList;
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].helpVid = e.target.value;
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
            type="text"
            className="px-3 form-control"
            id="description"
            placeholder="Enter Description"
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            HelpText (Optional):
          </label>
          <input
            value={currQuestion.helpText}
            onChange={(e) => {
              let currQuestionListCopy = currQuestionList;
              currQuestionListCopy.chunks[chunkIndex].questions[
                questionIndex
              ].helpText = e.target.value;
              setCurrQuestionList({ ...currQuestionListCopy });
            }}
            type="text"
            className="px-3 form-control"
            id="description"
            placeholder="Enter Description"
          />
        </div>
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
              helpVid: "",
              helpText: "",
              data: [],
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
