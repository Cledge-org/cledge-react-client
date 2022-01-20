import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../_app";
import ECDropDown from "../../components/question_components/ec_dropdown_question";
import CheckBox from "../../components/common/CheckBox";
import UploadPage from "../../components/common/upload-page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ORIGIN_URL } from "../../config";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        questionMetadata: await (
          await fetch(`${ORIGIN_URL}/api/get-all-questions`)
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
const QuestionUploadPage: NextApplicationPage<{
  questionMetadata: QuestionList[];
}> = ({ questionMetadata }) => {
  const router = useRouter();
  const questionListTitles = questionMetadata
    .map(({ name }) => name)
    .concat(["NEW QUESTION LIST"]);
  const [currQuestionList, setCurrQuestionList]: [
    QuestionList,
    Dispatch<SetStateAction<QuestionList>>
  ] = useState({
    name: "",
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
                fetch("/api/put-question", {
                  method: "POST",
                  body: JSON.stringify({
                    questionId:
                      currQuestionList._id === null ? undefined : question._id,
                    question: {
                      ...question,
                      _id: undefined,
                    },
                  }),
                })
              ),
            ]);
            let jsonArr = await Promise.all(
              resArr.map(async (res) => await res.json())
            );
            console.log(currQuestionList.chunks[i]._id);
            let value = await fetch("/api/put-question-chunk", {
              method: "POST",
              body: JSON.stringify({
                questionChunkId:
                  currQuestionList.chunks[i]._id === null
                    ? undefined
                    : currQuestionList.chunks[i]._id,
                questionChunk: {
                  name: currQuestionList.chunks[i].name,
                  questions: jsonArr.map(({ questionId }) => questionId),
                },
              }),
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
            console.error(err);
          }
        }
        fetch("/api/put-question-list", {
          method: "POST",
          body: JSON.stringify({
            questionListId:
              currQuestionList._id === null ? undefined : currQuestionList._id,
            questionList: {
              name: currQuestionList.name,
              chunks: currQuestionList.chunks.map(({ name }) => name),
            },
          }),
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
          .catch((err) => console.error(err));
      }}
    >
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Current Question List:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              if (value === "NEW QUESTION LIST") {
                setCurrQuestionList({
                  name: "",
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
                return;
              }
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
            {currChunk.questions.map((currQuestion, questionIndex) => (
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
                <div className="form-group mb-2">
                  <label style={{ fontSize: "0.9em" }} className="text-muted">
                    Question Type:
                  </label>
                  <ECDropDown
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
                      "ECTimeFrame",
                      "ECTextInput",
                      "ECDropDown",
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "0.9em" }} className="text-muted">
                    Data:
                  </label>
                  <div className="d-flex flex-row w-100 flex-wrap">
                    {currQuestion.data.map((value, index) =>
                      currQuestion.type === "ECDropDown" ? (
                        <div className="form-group">
                          <input
                            value={value}
                            onChange={(e) => {
                              let currQuestionListCopy = currQuestionList;
                              currQuestionListCopy.chunks[chunkIndex].questions[
                                questionIndex
                              ].data[index] = e.target.value;
                              setCurrQuestionList({ ...currQuestionListCopy });
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
                              let currQuestionListCopy = currQuestionList;
                              currQuestionListCopy.chunks[chunkIndex].questions[
                                questionIndex
                              ].data[index].op = e.target.value;
                              setCurrQuestionList({ ...currQuestionListCopy });
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
                              let currQuestionListCopy = currQuestionList;
                              currQuestionListCopy.chunks[chunkIndex].questions[
                                questionIndex
                              ].data[index].tag = e.target.value;
                              setCurrQuestionList({ ...currQuestionListCopy });
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
                        if (currQuestion.type === "ECDropDown") {
                          currQuestionListCopy.chunks[chunkIndex].questions[
                            questionIndex
                          ].data.push("");
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
            ))}
            <button
              onClick={() => {
                let currQuestionListCopy = currQuestionList;
                currQuestionListCopy.chunks[chunkIndex].questions.push({
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
              Add Another Question
            </button>
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
    </UploadPage>
  );
};
export default QuestionUploadPage;