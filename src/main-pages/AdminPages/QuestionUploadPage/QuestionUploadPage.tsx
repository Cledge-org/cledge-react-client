import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Modal from "react-modal";
import CheckBox from "../../../common/components/CheckBox/CheckBox";

import { NextApplicationPage } from "../../AppPage/AppPage";
import UploadPage from "../components/UploadPage/UploadPage";
import DropDownQuestion from "../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import {
  callPutQuestion,
  callPutQuestionChunk,
  callPutQuestionList,
} from "src/utils/apiCalls";
import QuestionForm from "src/main-pages/AdminPages/QuestionUploadPage/components/QuestionForm/QuestionForm";

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
            placeholder: "",
            data: [],
            isConcatenable: false,
          },
        ],
      },
    ],
  });
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
            //console.log(currQuestionList.chunks[i]._id);
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
            //console.log(i + " " + value.status);
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
            //console.log("LIST " + value.status);
            if (value.status !== 200) {
              unsuccessful = true;
              alert(
                "Upload Unsuccessful! (should probably talk to Yousef or Bryan)"
              );
            }
            if (!unsuccessful) {
              alert("Upload Successful!");
              router.push({ pathname: "/my-learning" });
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
                          placeholder: "",
                          data: [],
                          isConcatenable: false,
                          isRequired: false,
                        },
                      ],
                    },
                  ],
                });
                return;
              }
              //console.log(
              //   questionMetadata.find(({ name }) => name === value)._id
              // );
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
                  placeholder: "",
                  data: [],
                  isConcatenable: false,
                  isRequired: false,
                });
                setCurrQuestionList({ ...currQuestionListCopy });
              }}
            >
              Add Question To Beginning
            </button>
            {currChunk.questions.map((currQuestion, questionIndex) => (
              <QuestionForm
                currQuestionList={currQuestionList}
                currQuestion={currQuestion}
                chunkIndex={chunkIndex}
                questionIndex={questionIndex}
                setCurrQuestionList={setCurrQuestionList}
              />
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
                  placeholder: "",
                  data: [],
                  isConcatenable: false,
                  isRequired: false,
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
                    //console.log(currQuestionList.chunks[i]._id);
                    let value = await callPutQuestionChunk({
                      questionChunkId:
                        currQuestionList.chunks[i]._id === null
                          ? "625da082d9f9ed4e88412124"
                          : currQuestionList.chunks[i]._id,
                    });
                    let unsuccessful = false;
                    //console.log(i + " " + value.status);
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
                callPutQuestionList({
                  questionListId:
                    currQuestionList._id === null
                      ? "625da082d9f9ed4e88412124"
                      : currQuestionList._id,
                })
                  .then(async (value) => {
                    let unsuccessful = false;
                    //console.log("LIST " + value.status);
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
                      pathname: "/my-learning",
                    });
                  })
                  .catch((err) => console.error(err));
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
