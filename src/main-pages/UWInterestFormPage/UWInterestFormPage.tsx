import { useRouter } from "next/router";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";

const UWInterestFormPage = () => {
  const router = useRouter();
  return (
    <div>
      <TextInputQuestion
        question={{ question: "What's your name?", type: "TextInput" }}
        userAnswer={""}
        onChange={() => {}}
      />
      <TextInputQuestion
        question={{ question: "What's your email?", type: "TextInput" }}
        userAnswer={""}
        onChange={() => {}}
      />
    </div>
  );
};
export default UWInterestFormPage;
