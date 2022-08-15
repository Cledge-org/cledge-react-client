import { useState } from "react";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";

const DoubleTextInputQuestion = ({
  userResponses,
  question,
  onChange,
}: {
  userResponses: string[];
  question: Question;
  onChange: (newResponses: string[]) => void;
}) => {
  const [responses, setResponses] = useState(userResponses || ["", ""]);
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {question.question}
      </span>
      <TextInputQuestion
        question={question.data[0]}
        userAnswer={responses[0]}
        smallTitle
        onChange={(val1) => {
          onChange([val1, responses[1]]);
          setResponses([val1, responses[1]]);
        }}
      />
      <div style={{ width: "5%" }} />
      <TextInputQuestion
        question={question.data[1]}
        userAnswer={responses[1]}
        smallTitle
        onChange={(val2) => {
          onChange([responses[0], val2]);
          setResponses([responses[0], val2]);
        }}
      />
    </div>
  );
};
export default DoubleTextInputQuestion;
