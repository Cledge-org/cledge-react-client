import CheckBoxQuestion from "../CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../MCQQuestion/MCQQuestion";
import RankingQuestion from "../RankingQuestion/RankingQuestion";
import TextInputQuestion from "../TextInputQuestion/TextInputQuestion";
import TimeFrameQuestion from "../TimeframeQuestion/TimeframeQuestion";
import DropdownQuestion from "../DropdownQuestion/DropdownQuestion";
import { useState } from "react";
import classNames from "classnames";
import DoubleDropdownQuestion from "src/common/components/Questions/DoubleDropdownQuestion/DoubleDropdownQuestion";
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";
const CompositeQuestion = ({
  userTags,
  title,
  question,
  questions,
  responses,
  onChange,
}: {
  questions: Question[];
  responses: any[];
  title: string;
  question: Question;
  userTags?: string[];
  onChange: Function;
}) => {
  const [questionsResponses, setQuestionsResponses] = useState(
    responses ? responses : []
  );
  const getQuestionType = (
    question: Question,
    response: any,
    index: number
  ): JSX.Element => {
    if (question.type === "TextInput" || question.type === "ECTextInput") {
      return (
        <TextInputQuestion
          question={question}
          smallTitle
          userAnswer={response}
          isCentered
          onChange={(answer) => {
            onChange(answer, index, question._id?.toString());
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
            onChange(answer, index, question._id?.toString());
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
            onChange(answer, index, question._id?.toString());
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
            onChange(answer, index, question._id?.toString());
          }}
        />
      );
    }

    if (question.type === "DropDownQuestion") {
      return (
        <DropdownQuestion
          isConcatenable={question.isConcatenable}
          valuesList={question.data}
          onChange={(value) => {
            onChange(value, index, question._id?.toString());
          }}
          key={question._id?.toString()}
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
            onChange(value, index, question._id);
          }}
        />
      );
    }
    if (question.type === "DoubleDropdownQuestion") {
      return (
        <DoubleDropdownQuestion
          userResponses={response}
          question={question}
          onChange={(value) => {
            onChange(value, index, question._id);
          }}
        />
      );
    }
    if (question.type === "DoubleTextInputQuestion") {
      <DoubleTextInputQuestion
        userResponses={response}
        question={question}
        onChange={(value) => {
          onChange(value, index, question._id);
        }}
      />;
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
    renderedQuestions = renderedQuestions.concat(
      <div className="w-100">
        {questions.map((question, index) => {
          return getQuestionType(
            question,
            responses && responses[index],
            index
          );
        })}
      </div>
    );
    return renderedQuestions;
  };
  return (
    <div
      className={classNames(
        `h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold`
      )}
    >
      <div
        style={{ width: "90%" }}
        className={classNames(
          "d-flex flex-row pt-4 pb-2 align-items-center justify-content-between"
        )}
      >
        <span className="cl-dark-text fw-bold" style={{ fontSize: "1.4em" }}>
          {`${question.question}${
            (question as Question).isRequired ? " *" : ""
          }`}
        </span>
        {(question as Question).popUpText && (
          <Tooltip
            tipId={(question as Question)._id?.toString()}
            text={(question as Question).popUpText}
          />
        )}
      </div>
      {renderQuestions()}
    </div>
  );
};
export default CompositeQuestion;
