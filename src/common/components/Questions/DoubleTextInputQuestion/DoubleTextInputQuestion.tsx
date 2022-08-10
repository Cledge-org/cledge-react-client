import { useState } from "react";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";

const DoubleTextInputQuestion = ({
  userResponses,
  question,
  onChange,
}: {
  userResponses: string[];
  question: Question;
  onChange: (input1, input2) => void;
}) => {
  const [responses, setResponses] = useState(userResponses);
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <TextInputQuestion
        question={undefined}
        userAnswer={""}
        onChange={undefined}
      />
      <TextInputQuestion
        question={undefined}
        userAnswer={""}
        onChange={undefined}
      />
    </div>
  );
};
export default DoubleTextInputQuestion;
