import CheckBoxQuestion from "../CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../MCQQuestion/MCQQuestion";
import RankingQuestion from "../RankingQuestion/RankingQuestion";
import TextInputQuestion from "../TextInputQuestion/TextInputQuestion";
import TimeFrameQuestion from "../TimeframeQuestion/TimeframeQuestion";
import DropdownQuestion from "../DropdownQuestion/DropdownQuestion";
import { useState } from "react";
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
    if (question.type === "TextInput" || question.type === "ECTextInput") {
      return (
        <TextInputQuestion
          question={question}
          isDark={question.type === "ECTextInput"}
          userAnswer={response}
          onChange={(answer) => {
            onChange(answer, index, question._id.toString());
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
            onChange(answer, index, question._id.toString());
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
            onChange(answer, index, question._id.toString());
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
            onChange(answer, index, question._id.toString());
          }}
        />
      );
    }

    if (question.type === "ECDropDown") {
      return (
        <DropdownQuestion
          isConcatenable={question.isConcatenable}
          valuesList={question.data}
          onChange={(value) => {
            onChange(value, index, question._id);
          }}
          key={question._id.toString()}
          questionTitle={question.question}
          defaultValue={response}
        />
      );
    }
    if (question.type === "ECTimeFrame") {
      return (
        <TimeFrameQuestion
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
            onChange(value, index, question._id.toString());
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
          {questions.map((question) => {
            console.log(response[question._id.toString()]);
            return getQuestionType(
              question,
              response[question._id.toString()],
              index
            );
          })}
        </div>
      );
    });
    return renderedQuestions;
  };
  return (
    <div>
      {title}
      <DropdownQuestion
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
