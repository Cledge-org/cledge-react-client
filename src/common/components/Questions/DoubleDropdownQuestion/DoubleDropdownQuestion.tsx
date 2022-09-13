import classNames from "classnames";
import { useState } from "react";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import { Tooltip } from "src/common/components/Tooltip/Tooltip";

const DoubleDropdownQuestion = ({
  userResponses,
  question,
  onChange,
  isCentered,
}: {
  userResponses: string[];
  isCentered?: boolean;
  question: Question;
  onChange: (newResponses: string[]) => void;
}) => {
  const [responses, setResponses] = useState(userResponses || ["", ""]);
  return (
    <div className="d-flex flex-row align-items-center justify-content-between w-100">
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
        <DropDownQuestion
          questionTitle={question.data[0].question}
          smallTitle
          valuesList={question.data[0].data}
          defaultValue={responses && responses[0]}
          onChange={(val1) => {
            onChange([val1, responses[1]]);
            setResponses([val1, responses[1]]);
          }}
        />
        <div style={{ width: "5%" }} />
        <DropDownQuestion
          questionTitle={question.data[1].question}
          smallTitle
          valuesList={question.data[1].data}
          defaultValue={responses && responses[1]}
          onChange={(val2) => {
            onChange([responses[0], val2]);
            setResponses([responses[0], val2]);
          }}
        />
      </div>
    </div>
  );
};
export default DoubleDropdownQuestion;
