import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Modal from "react-modal";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import { QuestionList, Question } from "../../../types/types";
import { NextApplicationPage } from "../../AppPage/AppPage";
import UploadPage from "../components/UploadPage/UploadPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import {
  callPutQuestion,
  callPutQuestionChunk,
  callPutQuestionList,
} from "src/utils/apiCalls";

// logged in landing page
const QuestionUploadPage: NextApplicationPage<{
  questionMetadata: QuestionList[];
}> = ({ questionMetadata }) => {
  const router = useRouter();
  const questionListTitles = questionMetadata
    .map(({ name }) => name)
    .concat(["NEW QUESTION LIST"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currQuestionList, setCurrQuestionList]: [
    QuestionList,
    Dispatch<SetStateAction<QuestionList>>
  ] = useState({
    name: "",
    isCheckin: false,
    _id: null,
    chunks: [
      {
        name: "",
        _id: null,
        questions: [
          {
            _id: null,
            question: "",
            type: "",
            helpVid: "",
            helpText: "",
            data: [],
            isConcatenable: false,
          },
        ],
      },
    ],
  });
  const fillUndefinedFields = (question: Question) => {
    if (question.isConcatenable === undefined) {
      question.isConcatenable = false;
    }
    if (question.data === undefined) {
      question.data = [];
    }
    if (question.helpText === undefined) {
      question.helpText = "";
    }
    if (question.helpVid === undefined) {
      question.helpVid = "";
    }
    return question;
  };
  return (
    <UploadPage
      onUpload={async () => {
        for (let i = 0; i < currQuestionList.chunks.length; i++) {
          try {
            let resArr = await Promise.all([
              ...currQuestionList.chunks[i].questions.map((question, index) =>
                callPutQuestion({
                  questionId:
                    currQuestionList._id === null ? undefined : question._id,
                  question: {
                    ...question,
                    _id: undefined,
                  },
                })
              ),
            ]);
            let jsonArr = await Promise.all(
              resArr.map(async (res) => await res.json())
            );
            console.log(currQuestionList.chunks[i]._id);
            let value = await callPutQuestionChunk({
              questionChunkId:
                currQuestionList.chunks[i]._id === null
                  ? undefined
                  : currQuestionList.chunks[i]._id,
              questionChunk: {
                name: currQuestionList.chunks[i].name,
                questions: jsonArr.map(({ questionId }) => questionId),
              },
            });
            let unsuccessful = false;
            console.log(i + " " + value.status);
            if (value.status !== 200) {
              unsuccessful = true;
              alert(
                "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
              );
              return;
            }
          } catch (err) {
            console.error("AYO" + err);
          }
        }
        callPutQuestionList({
          questionListId:
            currQuestionList._id === null ? undefined : currQuestionList._id,
          questionList: {
            ...currQuestionList,
            name: currQuestionList.name,
            chunks: currQuestionList.chunks.map(({ name }) => name),
          },
        })
          .then(async (value) => {
            let unsuccessful = false;
            console.log("LIST " + value.status);
            if (value.status !== 200) {
              unsuccessful = true;
              alert(
                "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
              );
            }
            if (!unsuccessful) {
              alert("Upload Successful!");
              router.push({ pathname: "/dashboard" });
            }
          })
          .catch((err) => console.error("AYO" + err));
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Current Question List:
          </label>
          <DropDownQuestion
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW QUESTION LIST") {
                setCurrQuestionList({
                  name: "",
                  _id: null,
                  isCheckin: false,
                  chunks: [
                    {
                      name: "",
                      _id: null,
                      questions: [
                        {
                          _id: null,
                          question: "",
                          type: "",
                          helpVid: "",
                          helpText: "",
                          data: [],
                          isConcatenable: false,
                        },
                      ],
                    },
                  ],
                });
                return;
              }
              console.log(
                questionMetadata.find(({ name }) => name === value)._id
              );
              setCurrQuestionList(
                questionMetadata.find(({ name }) => name === value)
              );
            }}
            defaultValue={
              currQuestionList.name === ""
                ? "NEW QUESTION LIST"
                : currQuestionList.name
            }
            valuesList={questionListTitles}
          />
        </div>
        {currQuestionList._id === null ? null : (
          <div className="form-group">
            <button
              className="cl-btn-red w-100"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              DELETE THIS QUESTION LIST
            </button>
          </div>
        )}
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Question List Title:
          </label>
          <input
            value={currQuestionList.name}
            onChange={(e) => {
              setCurrQuestionList({
                ...currQuestionList,
                name: e.target.value,
              });
            }}
            type="text"
            className="px-3 form-control"
            placeholder="Enter Question Chunk Title"
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Is Checkin ?
          </label>
          <CheckBox
            selected={currQuestionList.isCheckin}
            setSelected={(selectState) => {
              setCurrQuestionList({
                ...currQuestionList,
                isCheckin: selectState,
              });
            }}
          />
        </div>
        {currQuestionList.isCheckin ? (
          <>
            <div className="form-group mb-2">
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Part:
              </label>
              <input
                value={currQuestionList.part}
                onChange={(e) => {
                  setCurrQuestionList({
                    ...currQuestionList,
                    part: e.target.value,
                  });
                }}
                type="text"
                className="px-3 form-control"
                placeholder="Enter Part"
              />
            </div>
            <div className="form-group mb-2">
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Order: (Lower number means it's at the beginning or higher
                priority)
              </label>
              <input
                value={currQuestionList.order}
                onChange={(e) => {
                  setCurrQuestionList({
                    ...currQuestionList,
                    order: parseInt(e.target.value),
                  });
                }}
                type="text"
                className="px-3 form-control"
                placeholder="Enter Order"
              />
            </div>
          </>
        ) : null}
        <label style={{ fontSize: "1.2em" }} className="text-muted">
          CHUNKS:
        </label>
        {currQuestionList.chunks.map((currChunk, chunkIndex) => (
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
                copy.chunks.splice(chunkIndex, 1);
                setCurrQuestionList({
                  ...copy,
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="form-group mb-2">
              <label style={{ fontSize: "0.9em" }} className="text-muted">
                Question Chunk Title:
              </label>
              <input
                value={currChunk.name}
                onChange={(e) => {
                  let currQuestionListCopy = currQuestionList;
                  currQuestionListCopy.chunks[chunkIndex].name = e.target.value;
                  setCurrQuestionList({ ...currQuestionListCopy });
                }}
                type="text"
                className="px-3 form-control"
                placeholder="Enter Question Chunk Title"
              />
            </div>
            <label style={{ fontSize: "1.2em" }} className="text-muted">
              QUESTIONS:
            </label>
            <button
              onClick={() => {
                let currQuestionListCopy = currQuestionList;
                currQuestionListCopy.chunks[chunkIndex].questions.splice(0, 0, {
                  _id: null,
                  question: "",
                  type: "",
                  helpVid: "",
                  helpText: "",
                  data: [],
                  isConcatenable: false,
                });
                setCurrQuestionList({ ...currQuestionListCopy });
              }}
            >
              Add Question To Beginning
            </button>
            {currChunk.questions.map((currQuestion, questionIndex) => (
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
                      copy.chunks[chunkIndex].questions.splice(
                        questionIndex,
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
                      <label
                        style={{ fontSize: "0.9em" }}
                        className="text-muted"
                      >
                        Question ID:
                      </label>
                      <input
                        disabled
                        value={currQuestion._id}
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
<<<<<<< HEAD:src/main-pages/UploadPages/QuestionUploadPage/QuestionUploadPage.tsx
                        "DropDownQuestion",
=======
                        "ECDropDown",
                        "ListQuestion",
>>>>>>> master:pages/upload/question-upload.tsx
                      ]}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: "0.9em" }} className="text-muted">
                      Data:
                    </label>
                    <div className="d-flex flex-row w-100 flex-wrap">
<<<<<<< HEAD:src/main-pages/UploadPages/QuestionUploadPage/QuestionUploadPage.tsx
                      {currQuestion.data.map((value, index) =>
                        currQuestion.type === "DropDownQuestion" ? (
=======
                      {currQuestion.data.map((dataValue, dataIndex) =>
                        currQuestion.type === "ECDropDown" ? (
>>>>>>> master:pages/upload/question-upload.tsx
                          <div className="form-group">
                            <input
                              value={dataValue}
                              onChange={(e) => {
                                let currQuestionListCopy = currQuestionList;
                                currQuestionListCopy.chunks[
                                  chunkIndex
                                ].questions[questionIndex].data[dataIndex] =
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
                        ) : currQuestion.type === "ListQuestion" ? (
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
                                copy.chunks[chunkIndex].questions[
                                  questionIndex
                                ].data.splice(dataIndex, 1);
                                setCurrQuestionList({
                                  ...copy,
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                Question:
                              </label>
                              <input
                                value={dataValue.question}
                                onChange={(e) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ].question = e.target.value;
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
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                Question ID: Inner
                              </label>
                              <input
                                value={dataValue._id}
                                type="text"
                                onChange={(e) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ]._id = e.target.value;
                                  setCurrQuestionList({
                                    ...currQuestionListCopy,
                                  });
                                }}
                                className="px-3 form-control"
                                placeholder="No ID"
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                Question Type:
                              </label>
                              <ECDropDown
                                isForWaitlist
                                onChange={(value) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ].type = value;
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
                                  "ECDropDown",
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
                                {dataValue.data.map((value, index) =>
                                  dataValue.type === "ECDropDown" ? (
                                    <div className="form-group">
                                      <input
                                        value={value}
                                        onChange={(e) => {
                                          let currQuestionListCopy =
                                            currQuestionList;
                                          currQuestionListCopy.chunks[
                                            chunkIndex
                                          ].questions[questionIndex].data[
                                            dataIndex
                                          ].data[index] = e.target.value;
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
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                      >
                                        Op:
                                      </label>
                                      <input
                                        value={value.op}
                                        onChange={(e) => {
                                          let currQuestionListCopy =
                                            currQuestionList;
                                          currQuestionListCopy.chunks[
                                            chunkIndex
                                          ].questions[questionIndex].data[
                                            dataIndex
                                          ].data[index].op = e.target.value;
                                          setCurrQuestionList({
                                            ...currQuestionListCopy,
                                          });
                                        }}
                                        type="text"
                                        className="px-3 form-control me-2 mt-2"
                                        style={{ width: "10vw" }}
                                        placeholder="Enter Op"
                                      />
                                      <label
                                        style={{ fontSize: "0.9em" }}
                                        className="text-muted"
                                      >
                                        Tag:
                                      </label>
                                      <input
                                        value={value.tag}
                                        onChange={(e) => {
                                          let currQuestionListCopy =
                                            currQuestionList;
                                          currQuestionListCopy.chunks[
                                            chunkIndex
                                          ].questions[questionIndex].data[
                                            dataIndex
                                          ].data[index].tag = e.target.value;
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
                                    if (dataValue.type === "ECDropDown") {
                                      currQuestionListCopy.chunks[
                                        chunkIndex
                                      ].questions[questionIndex].data[
                                        dataIndex
                                      ].data.push("");
                                    } else {
                                      currQuestionListCopy.chunks[
                                        chunkIndex
                                      ].questions[questionIndex].data[
                                        dataIndex
                                      ].data.push({
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
                            </div>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                HelpVid (Optional):
                              </label>
                              <input
                                value={dataValue.helpVid}
                                onChange={(e) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ].helpVid = e.target.value;
                                  setCurrQuestionList({
                                    ...currQuestionListCopy,
                                  });
                                }}
                                type="text"
                                className="px-3 form-control"
                                id="description"
                                placeholder="Enter Description"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                HelpText (Optional):
                              </label>
                              <input
                                value={dataValue.helpText}
                                onChange={(e) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ].helpText = e.target.value;
                                  setCurrQuestionList({
                                    ...currQuestionListCopy,
                                  });
                                }}
                                type="text"
                                className="px-3 form-control"
                                id="description"
                                placeholder="Enter Description"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                style={{ fontSize: "0.9em" }}
                                className="text-muted"
                              >
                                Is Concatenable (Optional):
                              </label>
                              <CheckBox
                                selected={dataValue.isConcatenable}
                                setSelected={(selectState) => {
                                  let currQuestionListCopy = currQuestionList;
                                  currQuestionListCopy.chunks[
                                    chunkIndex
                                  ].questions[questionIndex].data[
                                    dataIndex
                                  ].isConcatenable = selectState;
                                  setCurrQuestionList({
                                    ...currQuestionListCopy,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="form-group"
                            style={{
                              borderTop: "2px solid black",
                              borderBottom: "2px solid black",
                            }}
                          >
                            <label
                              style={{ fontSize: "0.9em" }}
                              className="text-muted"
                            >
                              Op:
                            </label>
                            <input
                              value={dataValue.op}
                              onChange={(e) => {
                                let currQuestionListCopy = currQuestionList;
                                currQuestionListCopy.chunks[
                                  chunkIndex
                                ].questions[questionIndex].data[dataIndex].op =
                                  e.target.value;
                                setCurrQuestionList({
                                  ...currQuestionListCopy,
                                });
                              }}
                              type="text"
                              className="px-3 form-control me-2 mt-2"
                              style={{ width: "10vw" }}
                              placeholder="Enter Op"
                            />
                            <label
                              style={{ fontSize: "0.9em" }}
                              className="text-muted"
                            >
                              Tag:
                            </label>
                            <input
                              value={dataValue.tag}
                              onChange={(e) => {
                                let currQuestionListCopy = currQuestionList;
                                currQuestionListCopy.chunks[
                                  chunkIndex
                                ].questions[questionIndex].data[dataIndex].tag =
                                  e.target.value;
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
                          } else if (currQuestion.type === "ListQuestion") {
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
            ))}
          </div>
        ))}
        <button
          onClick={() => {
            let currQuestionListCopy = currQuestionList;
            currQuestionListCopy.chunks.push({
              name: "",
              _id: null,
              questions: [
                {
                  _id: null,
                  question: "",
                  type: "",
                  helpVid: "",
                  helpText: "",
                  data: [],
                  isConcatenable: false,
                },
              ],
            });
            setCurrQuestionList({ ...currQuestionListCopy });
          }}
        >
          Add Another Chunk
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
          Are you sure you want to delete this question list?
          <div className="w-100 center-child mt-3">
            <button
              className="cl-btn-blue me-2"
              onClick={async () => {
                for (let i = 0; i < currQuestionList.chunks.length; i++) {
                  try {
                    let resArr = await Promise.all([
                      ...currQuestionList.chunks[i].questions.map(
                        (question, index) =>
                          callPutQuestion({
                            questionId:
                              currQuestionList._id === null
                                ? "625da082d9f9ed4e88412124"
                                : question._id,
                          })
                      ),
                    ]);
                    let jsonArr = await Promise.all(
                      resArr.map(async (res) => await res.json())
                    );
                    console.log(currQuestionList.chunks[i]._id);
                    let value = await callPutQuestionChunk({
                      questionChunkId:
                        currQuestionList.chunks[i]._id === null
                          ? "625da082d9f9ed4e88412124"
                          : currQuestionList.chunks[i]._id,
                    });
                    let unsuccessful = false;
                    console.log(i + " " + value.status);
                    if (value.status !== 200) {
                      unsuccessful = true;
                      alert(
                        "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
                      );
                      return;
                    }
                  } catch (err) {
                    console.error("AYO" + err);
                  }
                }
                callPutQuestionList({
                  questionListId:
                    currQuestionList._id === null
                      ? "625da082d9f9ed4e88412124"
                      : currQuestionList._id,
                })
                  .then(async (value) => {
                    let unsuccessful = false;
                    console.log("LIST " + value.status);
                    if (value.status !== 200) {
                      unsuccessful = true;
                      alert(
                        "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
                      );
                    }
                    if (!unsuccessful) {
                      alert("Upload Successful!");
                    }
                    router.push({
                      pathname: "/dashboard",
                    });
                  })
                  .catch((err) => console.error("AYO" + err));
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
export default QuestionUploadPage;
