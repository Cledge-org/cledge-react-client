import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import {
  updateAccountAction,
  updateTagsAction,
  updateQuestionResponsesAction,
} from "../../../../utils/redux/actionFunctions";
import { store } from "../../../../utils/redux/store";
import classNames from "classnames";
import { callPutQuestionResponses } from "src/utils/apiCalls";
import RankingQuestion from "src/common/components/Questions/RankingQuestion/RankingQuestion";
import TextInputQuestion from "src/common/components/Questions/TextInputQuestion/TextInputQuestion";
import MCQQuestion from "src/common/components/Questions/MCQQuestion/MCQQuestion";
import CheckBoxQuestion from "src/common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import DropDownQuestion from "src/common/components/Questions/DropdownQuestion/DropdownQuestion";
import SliderQuestion from "src/common/components/Questions/SliderQuestion/SliderQuestion";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface PathwayQuestionCardProps extends PathwayQuestion {
  // userAnswers: UserResponse[];
  // allAnswers?: UserResponse[];
  number: number;
  onUpdate: Function;
}

export default function PathwayQuestion({
  // userAnswers,
  question,
  questionType,
  data,
  helpText,
  number,
  onUpdate,
}: // allAnswers,
PathwayQuestionCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  const [userAnswer, setUserAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<UserResponse>>
  ] = useState({ response: "", questionId: "" });
  const [originalAnswer, setOriginalAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<any>>
  ] = useState();
  const session = useSession();
  const getQuestion = useMemo((): JSX.Element => {
    if (questionType === "PathwayTextInput") {
      return (
        <TextInputQuestion
          isPathwayQuestion
          question={{
            question: `${number}. ${question}`,
            questionType,
            data,
            helpText,
            type: "question",
          }}
          userAnswer={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (questionType === "PathwayDropdown") {
      return (
        <div className="w-100">
          <DropDownQuestion
            isForWaitlist
            isForDashboard
            defaultValue={userAnswer?.response}
            valuesList={data}
            onChange={(answer) => {
              setUserAnswer({ ...userAnswer, response: answer });
            }}
          />
        </div>
      );
    }
    // if (questionType === "PathwayRanking") {
    //   return (
    //     <RankingQuestion
    //       isPathwayQuestion
    //       question={{
    //         question: `${number}. ${question}`,
    //         questionType,
    //         data,
    //         helpText,
    //         type: "question",
    //       }}
    //       tags={[]}
    //       userAnswers={userAnswer?.response}
    //       onChange={(answer) => {
    //         setUserAnswer({ ...userAnswer, response: answer });
    //       }}
    //     />
    //   );
    // }
    if (questionType === "PathwayMCQ") {
      return (
        <MCQQuestion
          tags={[]}
          isPathwayQuestion
          question={{
            question: `${number}. ${question}`,
            questionType,
            data,
            helpText,
            type: "question",
          }}
          userAnswer={userAnswer?.response}
          onChange={(answer, newQTags, oldQTags) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (questionType === "PathwayCheckBox") {
      return (
        <CheckBoxQuestion
          tags={[]}
          isPathwayQuestion
          question={{
            question: `${number}. ${question}`,
            questionType,
            data,
            helpText,
            type: "question",
          }}
          userAnswers={userAnswer?.response}
          onChange={(answer, newQTags, oldQTags) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (questionType === "PathwayLinearQuestion") {
      return <SliderQuestion min={"0"} max={"5"} onChange={() => {}} />;
    }
    return (
      <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {`${number} ${question}`}
        </span>
        <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
          <div className="w-75">{userAnswer.response ?? "No answer"}</div>
        </div>
      </div>
    );
  }, [userAnswer, question]);
  return <div>{getQuestion}</div>;
}
