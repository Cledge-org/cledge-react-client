import { useState } from "react";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";

const DoubleDropdownQuestion = ({
  userResponses,
  question,
  onChange,
}: {
  userResponses: string[];
  question: Question;
  onChange: (newResponses: string[]) => void;
}) => {
  console.log(userResponses);
  const [responses, setResponses] = useState(userResponses || ["", ""]);
  return (
    <div className="d-flex flex-row align-items-center justify-content-between w-100">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
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
  );
};
export default DoubleDropdownQuestion;
