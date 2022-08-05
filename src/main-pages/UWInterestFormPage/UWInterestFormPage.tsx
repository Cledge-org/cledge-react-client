import { useRouter } from "next/router";
import { useState } from "react";
import MCQQuestion from "src/common/components/Questions/MCQQuestion/MCQQuestion";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";
import { callPutUWWaitlist } from "src/utils/apiCalls";

const UWInterestFormPage = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    phoneNum: "",
    userType: "",
    grade: "",
  });
  const onSubmit = () => {
    const keys = Object.keys(formState);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "phoneNum" && !formState[keys[i]]) {
        alert("Please make sure to fill out all the fields with a *!");
        return;
      }
    }
    callPutUWWaitlist({
      ...formState,
      ref: router.query.ref,
    });
  };
  const updateState = (parameter: string, value: any) => {
    setFormState((oldState) => ({ ...oldState, [parameter]: value }));
  };
  console.log(formState);
  return (
    <div className="d-flex flex-column align-items-center w-100 pb-5">
      <div style={{ fontSize: "24px" }} className="cl-dark-text fw-bold">
        UW CS Package Interest Form
      </div>
      <div style={{ fontSize: "16px" }}>
        Fill out this form to be the first to know when this product releases
        and get an early access discount!
      </div>
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <TextInputQuestion
          question={{
            question: "First Name*",
            type: "TextInput",
            helpText: "John",
          }}
          userAnswer={""}
          onChange={(newFirstName) => {
            updateState("firstName", newFirstName);
          }}
        />
        <TextInputQuestion
          question={{
            question: "Last Name*",
            type: "TextInput",
            helpText: "Doe",
          }}
          userAnswer={""}
          onChange={(newLastName) => {
            updateState("lastName", newLastName);
          }}
        />
      </div>
      <div className="d-flex flex-row align-items-center justify-content-around w-100">
        <TextInputQuestion
          question={{
            question: "Email*",
            type: "TextInput",
            helpText: "example@domain.com",
          }}
          userAnswer={""}
          onChange={(email) => {
            updateState("email", email);
          }}
        />
        <TextInputQuestion
          question={{
            question: "Zip Code*",
            type: "TextInput",
            helpText: "12345",
          }}
          userAnswer={""}
          onChange={(zipCode) => {
            updateState("zipCode", zipCode);
          }}
        />
      </div>
      <div className="d-flex flex-row align-items-center w-50">
        <TextInputQuestion
          question={{
            question: "Phone #",
            type: "TextInput",
            helpText: "123-456-7890",
          }}
          userAnswer={""}
          onChange={(phoneNum) => {
            updateState("phoneNum", phoneNum);
          }}
        />
      </div>
      <div className="d-flex flex-column w-50">
        <MCQQuestion
          question={{
            question: "I am a... *",
            type: "MCQ",
            data: [{ op: "Parent" }, { op: "Student" }],
          }}
          userAnswer={""}
          onChange={(userType) => {
            updateState("userType", userType);
          }}
          tags={[]}
        />
        <MCQQuestion
          question={{
            question: "I am/my child is in*",
            type: "MCQ",
            data: [
              { op: "8th Grade" },
              { op: "9th Grade" },
              { op: "10th Grade" },
              { op: "11th Grade" },
              { op: "12th Grade" },
            ],
          }}
          userAnswer={""}
          onChange={(grade) => {
            updateState("grade", grade);
          }}
          tags={[]}
        />
      </div>
      <button onClick={() => onSubmit()} className="cl-btn-blue mt-3">
        Submit
      </button>
    </div>
  );
};
export default UWInterestFormPage;
