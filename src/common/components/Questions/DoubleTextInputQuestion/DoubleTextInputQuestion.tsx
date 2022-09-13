import classNames from "classnames";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";

const DoubleTextInputQuestion = ({
  userResponses,
  question,
  onChange,
  isCentered,
}: {
  isCentered?: boolean;
  userResponses: string[];
  question: Question;
  onChange: (newResponses: string[]) => void;
}) => {
  const [responses, setResponses] = useState(userResponses || ["", ""]);
  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div
        className={classNames(
          "d-flex flex-row pt-4 pb-2 align-items-center w-100",
          {
            ["justify-content-center"]: isCentered && !question.popUpText,
            ["justify-content-between"]: question.popUpText,
          }
        )}
      >
        <span className="cl-dark-text fw-bold" style={{ fontSize: "1.4em" }}>
          {question.question}
        </span>
        {question.popUpText && (
          <Tooltip tipId={question._id.toString()} text={question.popUpText} />
        )}
      </div>
      <div className="d-flex flex-row align-items-center">
        <TextInputQuestion
          question={question.data[0]}
          userAnswer={responses[0]}
          smallTitle
          isCentered={isCentered}
          onChange={(val1) => {
            onChange([val1, responses[1]]);
            setResponses([val1, responses[1]]);
          }}
        />
        <div style={{ width: "5%" }} />
        <TextInputQuestion
          question={question.data[1]}
          userAnswer={responses[1]}
          isCentered={isCentered}
          smallTitle
          onChange={(val2) => {
            onChange([responses[0], val2]);
            setResponses([responses[0], val2]);
          }}
        />
      </div>
    </div>
  );
};
export default DoubleTextInputQuestion;
