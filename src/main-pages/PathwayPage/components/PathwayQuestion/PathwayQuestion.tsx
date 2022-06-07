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
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface PathwayQuestionCardProps extends PathwayQuestion {
  userAnswers: UserResponse[];
  allAnswers?: UserResponse[];
  onUpdate: Function;
}

export default function PathwayQuestion({
  userAnswers,
  question,
  questionType,
  data,
  helpText,
  onUpdate,
  allAnswers,
}: PathwayQuestionCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  const [userAnswer, setUserAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<UserResponse>>
  ] = useState();
  // const [originalAnswer, setOriginalAnswer]: [
  //   UserResponse,
  //   Dispatch<SetStateAction<UserResponse>>
  // ] = useState(
  //   JSON.parse(
  //     JSON.stringify(
  //       userAnswers?.find((response) => {
  //         return response.questionId === question._id;
  //       })
  //         ? userAnswers.find((response) => {
  //             return response.questionId === question._id;
  //           })
  //         : { questionId: question._id, response: null }
  //     )
  //   )
  // );
  const session = useSession();
  // const getQuestion = useMemo((): JSX.Element => {
  //   if (questionType === "TextInput") {
  //     return (
  //       <TextInputQuestion
  //         question={question}
  //         userAnswer={userAnswer?.response}
  //         onChange={(answer) => {
  //           setUserAnswer({ ...userAnswer, response: answer });
  //         }}
  //       />
  //     );
  //   }
  //   if (questionType === "Ranking") {
  //     return (
  //       <RankingQuestion
  //         question={question}
  //         tags={[]}
  //         userAnswers={userAnswer?.response}
  //         onChange={(answer) => {
  //           setUserAnswer({ ...userAnswer, response: answer });
  //         }}
  //       />
  //     );
  //   }
  //   if (questionType === "MCQ") {
  //     return (
  //       <MCQQuestion
  //         tags={[]}
  //         question={question}
  //         userAnswer={userAnswer?.response}
  //         onChange={(answer, newQTags, oldQTags) => {
  //           setUserAnswer({ ...userAnswer, response: answer });
  //         }}
  //       />
  //     );
  //   }
  //   if (questionType === "CheckBox") {
  //     return (
  //       <CheckBoxQuestion
  //         tags={[]}
  //         question={question}
  //         userAnswers={userAnswer?.response}
  //         onChange={(answer, newQTags, oldQTags) => {
  //           setUserAnswer({ ...userAnswer, response: answer });
  //         }}
  //       />
  //     );
  //   }
  //   return (
  //     <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold">
  //       <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
  //         {question.question}
  //       </span>
  //       <div className="d-flex flex-column justify-content-evenly align-items-center h-75 w-100">
  //         <div className="w-75">{userAnswer.response ?? "No answer"}</div>
  //       </div>
  //     </div>
  //   );
  // }, [userAnswer, question]);
  return <div></div>;
}
