import { useState } from "react";
import CheckBoxQuestion from "./checkbox_question";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";
import ECTimeFrame from "./ec_timeframe_question";
import MCQQuestion from "./mcq_question";
import RankingQuestion from "./ranking_question";
import TextInputQuestion from "./textinput_question";
const ListQuestion = ({
  listMax,
  userTags,
  title,
  questions,
  responses,
  numResponse,
  onTagChange,
  onNumResponseChange,
  onChange,
}: {
  listMax: number;
  questions: Question[];
  responses: any[];
  title: string;
  userTags?: string[];
  numResponse: number;
  onTagChange?: Function;
  onChange: Function;
  onNumResponseChange: Function;
}) => {
  const [currNum, setCurrNum] = useState(numResponse);
  const [questionsResponses, setQuestionsResponses] = useState(
    responses ? responses : []
  );
  const getNumList = () => {
    let nums = [];
    for (let i = 1; i < listMax + 1; i++) {
      nums.push(i);
    }
    return nums;
  };
  const getQuestionType = (
    question: Question,
    response: any,
    index: number
  ): JSX.Element => {
    if (question.type === "TextInput") {
      return (
        <TextInputQuestion
          question={question}
          userAnswer={response}
          onChange={(answer) => {
            onChange(answer, index, question._id);
          }}
        />
      );
    }
    if (question.type === "Ranking") {
      return (
        <RankingQuestion
          question={question}
          tags={userTags}
          userAnswers={response}
          onChange={(answer) => {
            onChange(answer, index, question._id);
          }}
        />
      );
    }
    if (question.type === "MCQ") {
      return (
        <MCQQuestion
          tags={userTags}
          question={question}
          userAnswer={response}
          onChange={(answer, newQTags, oldQTags) => {
            onChange(answer, index, question._id);
          }}
        />
      );
    }
    if (question.type === "CheckBox") {
      return (
        <CheckBoxQuestion
          tags={userTags}
          question={question}
          userAnswers={response}
          onChange={(answer, newQTags, oldQTags) => {
            onChange(answer, index, question._id);
          }}
        />
      );
    }

    if (question.type === "ECDropDown") {
      return (
        <ECDropDown
          isConcatenable={question.isConcatenable}
          valuesList={question.data}
          onChange={(value) => {
            onChange(value, index, question._id);
          }}
          key={question._id}
          questionTitle={question.question}
          defaultValue={response}
        />
      );
    }
    if (question.type === "ECTextInput") {
      return (
        <ECTextInputQuestion
          questionTitle={question.question}
          userResponse={response}
          placeholder={""}
          onChange={(value) => {
            onChange(value, index, question._id);
          }}
        />
      );
    }
    if (question.type === "ECTimeFrame") {
      return (
        <ECTimeFrame
          defaultProgress={response.progress}
          defaultStart={
            response.start instanceof Date
              ? response.start
              : new Date(response.start)
          }
          defaultEnd={
            response.finished instanceof Date
              ? response.finished
              : new Date(response.finished)
          }
          onChange={(value) => {
            onChange(value, index, question._id);
          }}
        />
      );
    }
    return (
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
          <div className="w-75">{response ?? "No answer"}</div>
        </div>
      </div>
    );
  };
  const renderQuestions = () => {
    let renderedQuestions = [];
    console.log(questionsResponses);
    questionsResponses?.forEach((response, index) => {
      renderedQuestions.push(
        <div>
          {questions.map((question) =>
            getQuestionType(question, response[question._id], index)
          )}
        </div>
      );
    });
    return renderedQuestions;
  };
  return (
    <div>
      {title}
      <ECDropDown
        isForWaitlist
        placeholder="Choose a Number..."
        onChange={(value) => {
          onNumResponseChange(value);
          setCurrNum(value);
          setQuestionsResponses((responses) => {
            if (responses.length > value) {
              responses.splice(0, responses.length - value);
            } else {
              for (let i = 0; i < value - responses.length; i++) {
                responses.push({});
              }
            }
            return responses;
          });
        }}
        defaultValue={numResponse > 0 ? numResponse + "" : null}
        valuesList={getNumList()}
      />
      {renderQuestions()}
    </div>
  );
};
export default ListQuestion;
