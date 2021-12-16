import { Dispatch, SetStateAction, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { NextApplicationPage } from "../_app";
import ECDropDown from "../../components/question_components/ec_dropdown_question";
import CheckBox from "../../components/common/CheckBox";
import UploadPage from "../../components/common/upload-page";
import { getProgressInfo } from "../api/get-progress-info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        questionMetadata: (await getProgressInfo("")).questionData.questionList,
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
  const questionListTitles = questionMetadata.map(({ title }) => title);
  const [currQuestionList, setCurrQuestionList] = useState({
    title: questionMetadata[0].title,
    index: 0,
  });
  const [currQuestionChunk, setCurrQuestionChunk] = useState({
    title: questionMetadata[0].chunks[0].title,
    index: 0,
  });
  const [currQuestion, setCurrQuestion]: [
    currQuestion: Question,
    setCurrQuestion: Dispatch<SetStateAction<Question>>
  ] = useState({
    id: "",
    question: "",
    type: "",
    helpVid: "",
    helpText: "",
    data: [],
    isConcatenable: false,
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
    <UploadPage>
      <div className="mt-4 d-flex flex-column w-100">
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Current Question List:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              setCurrQuestionList({
                title: value,
                index: questionListTitles.indexOf(value),
              });
            }}
            defaultValue={currQuestionList.title}
            valuesList={questionListTitles}
          />
        </div>
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Current Question Chunk:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              setCurrQuestionChunk({
                title: value,
                index: questionMetadata[
                  currQuestionList.index
                ].chunks.findIndex(({ title }) => title === value),
              });
            }}
            defaultValue={currQuestionChunk.title}
            valuesList={questionMetadata[currQuestionList.index].chunks.map(
              ({ title }) => title
            )}
          />
        </div>
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Current Question:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {
              setCurrQuestion(
                fillUndefinedFields(
                  questionMetadata[currQuestionList.index].chunks[
                    currQuestionChunk.index
                  ].questions.find(({ question }) => question === value)
                )
              );
            }}
            defaultValue={"ADDING NEW"}
            valuesList={questionMetadata[currQuestionList.index].chunks[
              currQuestionChunk.index
            ].questions
              .map(({ question }) => question)
              .concat("ADDING NEW")}
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Id:
          </label>
          <input
            value={currQuestion.id}
            onChange={(e) =>
              setCurrQuestion({
                ...currQuestion,
                id: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="id"
            placeholder="Enter Id"
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Question:
          </label>
          <input
            value={currQuestion.question}
            onChange={(e) =>
              setCurrQuestion({
                ...currQuestion,
                question: e.target.value,
              })
            }
            type="text"
            className="px-3 form-control"
            id="source"
            placeholder="Enter Source"
          />
        </div>
        <div className="form-group mb-2">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Question Type:
          </label>
          <ECDropDown
            isForWaitlist
            onChange={(value) => {}}
            placeholder="Choose Question Type"
            valuesList={[]}
          />
        </div>
        <div className="form-group">
          <label style={{ fontSize: "0.9em" }} className="text-muted">
            Data:
          </label>
          <div className="d-flex flex-row w-100 flex-wrap">
            {currQuestion.data.map((tag, index) => (
              <input
                value={tag}
                onChange={(e) => {
                  let question = currQuestion;
                  question.data[index] = e.target.value;
                  setCurrQuestion(question);
                }}
                type="text"
                className="px-3 form-control me-2 mt-2"
                style={{ width: "10vw" }}
                id="data"
                placeholder="Enter data"
              />
            ))}
            <button
              style={{ width: "24px", height: "24px" }}
              className="align-self-center align-items-center justify-content-center"
              onClick={() => {
                let questionData = currQuestion.data;
                questionData.push("");
                setCurrQuestion({
                  ...currQuestion,
                  data: questionData,
                });
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
            onChange={(e) =>
              setCurrQuestion({
                ...currQuestion,
                helpVid: e.target.value,
              })
            }
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
            onChange={(e) =>
              setCurrQuestion({
                ...currQuestion,
                helpText: e.target.value,
              })
            }
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
              setCurrQuestion({
                ...currQuestion,
                isConcatenable: selectState,
              });
            }}
          />
        </div>
      </div>
    </UploadPage>
  );
};
export default QuestionUploadPage;
