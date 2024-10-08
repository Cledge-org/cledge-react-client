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
import CheckBoxQuestion from "../../../../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import MCQQuestion from "../../../../../common/components/Questions/MCQQuestion/MCQQuestion";
import RankingQuestion from "../../../../../common/components/Questions/RankingQuestion/RankingQuestion";
import TextInputQuestion from "../../../../../common/components/Questions/TextInputQuestion/TextInputQuestion";

import {
  updateAccountAction,
  updateTagsAction,
  updateQuestionResponsesAction,
} from "../../../../../utils/redux/actionFunctions";
import { store } from "../../../../../utils/redux/store";
import styles from "./question-summary-card.module.scss";
import classNames from "classnames";
import CompositeQuestion from "src/common/components/Questions/CompositeQuestion/CompositeQuestion";
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import DoubleDropdownQuestion from "src/common/components/Questions/DoubleDropdownQuestion/DoubleDropdownQuestion";
Modal.defaultStyles.overlay.backgroundColor = "rgba(177, 176, 176, 0.6)";

interface QuestionSummaryCardProps {
  question: Question;
  userAnswers: UserResponse[];
  userTags: string[];
  isAC?: boolean;
  allAnswers?: UserResponse[];
  onUpdate: Function;
}

export default function QuestionSummaryCard({
  question,
  userAnswers,
  onUpdate,
  isAC,
  allAnswers,
  userTags,
}: QuestionSummaryCardProps) {
  const [displayingQuestion, setDisplayingQuestion] = useState(false);
  const [newTags, setNewTags] = useState([]);
  const [oldTags, setOldTags] = useState([]);
  const [userAnswer, setUserAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<UserResponse>>
  ] = useState(
    userAnswers?.find((response) => {
      return response.questionId === question._id.toString();
    })
      ? userAnswers.find((response) => {
          return response.questionId === question._id.toString();
        })
      : { questionId: question._id.toString(), response: null }
  );
  const [originalAnswer, setOriginalAnswer]: [
    UserResponse,
    Dispatch<SetStateAction<UserResponse>>
  ] = useState(
    JSON.parse(
      JSON.stringify(
        userAnswers?.find((response) => {
          return response.questionId === question._id.toString();
        })
          ? userAnswers.find((response) => {
              return response.questionId === question._id.toString();
            })
          : { questionId: question._id, response: null }
      )
    )
  );
  const session = useSession();
  const filterDuplicates = (toFilter: any[]) => {
    return toFilter.filter((element, index, self) => {
      let indexOfDuplicate = self.findIndex((value) => value === element);
      return indexOfDuplicate === -1 || index === indexOfDuplicate;
    });
  };
  const hasAnswerOrNotRequired = useMemo(() => {
    const hasNoResponseRequired = question.isRequired && !userAnswer?.response;
    if (hasNoResponseRequired) {
      return false;
    } else if (question.isRequired && userAnswer.response instanceof Array) {
      return userAnswer.response.find((res) => res);
    } else {
      return true;
    }
  }, [question, userAnswer]);
  const getQuestionType = (): JSX.Element => {
    if (question.type === "TextInput") {
      return (
        <TextInputQuestion
          question={question}
          isCentered
          userAnswer={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (question.type === "Ranking") {
      return (
        <RankingQuestion
          question={question}
          tags={userTags}
          userAnswers={userAnswer?.response}
          onChange={(answer) => {
            setUserAnswer({ ...userAnswer, response: answer });
          }}
        />
      );
    }
    if (question.type === "MCQ") {
      return (
        <MCQQuestion
          tags={userTags}
          question={question}
          isCentered
          userAnswer={userAnswer?.response}
          onChange={(answer, newQTags, oldQTags) => {
            setUserAnswer({ ...userAnswer, response: answer });
            setNewTags(filterDuplicates(newTags.concat(newQTags)));
            setOldTags(filterDuplicates(oldTags.concat(oldQTags)));
          }}
        />
      );
    }
    if (question.type === "CheckBox") {
      return (
        <CheckBoxQuestion
          tags={userTags}
          question={question}
          isCentered
          userAnswers={userAnswer?.response}
          onChange={(answer, newQTags, oldQTags) => {
            setUserAnswer({ ...userAnswer, response: answer });
            setNewTags(filterDuplicates(newTags.concat(newQTags)));
            setOldTags(filterDuplicates(oldTags.concat(oldQTags)));
          }}
        />
      );
    }
    if (question?.type === "CompositeQuestion") {
      return (
        <CompositeQuestion
          question={question}
          responses={userAnswer?.response}
          onChange={(answer, index) => {
            setUserAnswer((userAnswer) => {
              if (userAnswer.response) {
                userAnswer.response[index] = answer;
              } else {
                userAnswer.response = [];
                userAnswer.response[index] = answer;
              }
              return { ...userAnswer };
            });
          }}
          title={question.question}
          questions={question.data}
        />
      );
    }
    if (question?.type === "DoubleTextInputQuestion") {
      return (
        <DoubleTextInputQuestion
          userResponses={userAnswer?.response}
          question={question}
          onChange={(value) => {
            setUserAnswer((userAnswer) => {
              userAnswer.response = value;
              return { ...userAnswer };
            });
          }}
        />
      );
    }
    if (question?.type === "DoubleTextInputQuestion") {
      return (
        <DoubleDropdownQuestion
          userResponses={userAnswer?.response}
          question={question}
          onChange={(value) => {
            setUserAnswer((userAnswer) => {
              userAnswer.response = value;
              return { ...userAnswer };
            });
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
          <div className="w-75">{userAnswer.response ?? "No answer"}</div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={classNames(
        "w-100 d-flex flex-column justify-content-evenly",
        styles.qsummaryCardContainer,
        "mt-3"
      )}
    >
      <div
        className={classNames(
          "d-flex justify-content-between align-items-center px-4 pt-3 border-bottom border-2",
          styles.questionText
        )}
      >
        {question.question}
        <button
          onClick={() => {
            setDisplayingQuestion(true);
          }}
          className={classNames(styles.iconBtn, "center-child")}
        >
          <div style={{ width: "40%" }}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        </button>
      </div>
      <span className="ps-4 pb-4 pt-3">
        {userAnswer.response !== null
          ? userAnswer.response instanceof Array
            ? userAnswer.response.reduce((prev, curr) => {
                return prev === "" ? curr : prev + ", " + curr;
              }, "")
            : userAnswer.response
          : "No answer"}
      </span>
      <Modal
        ariaHideApp={false}
        className={styles.modal}
        style={{
          overlay: {
            background: "rgba(50, 50, 50, 0.5)",
          },
        }}
        onRequestClose={() => {
          setUserAnswer(originalAnswer);
          setNewTags([]);
          setOldTags([]);
          setDisplayingQuestion(false);
        }}
        isOpen={displayingQuestion}
      >
        {getQuestionType()}
        <div className="center-child w-100 pt-2">
          <button
            disabled={!hasAnswerOrNotRequired}
            onClick={async () => {
              if (isAC) {
                let newUserResponses = allAnswers;
                if (
                  !newUserResponses?.find(({ questionId }) => {
                    return questionId === "Academics";
                  })
                ) {
                  newUserResponses.push({
                    questionId: "Academics",
                    response: {
                      "All Academics": {
                        generalQuestions: [],
                        semesterQuestions: [],
                      },
                    },
                  });
                }
                let generalQuestions = newUserResponses?.find(
                  ({ questionId }) => {
                    return questionId === "Academics";
                  }
                ).response["All Academics"].generalQuestions;
                let indexOfResponse = generalQuestions.findIndex(
                  ({ questionId }) => {
                    return questionId === userAnswer.questionId;
                  }
                );
                if (indexOfResponse !== -1) {
                  generalQuestions[indexOfResponse] = userAnswer;
                } else {
                  generalQuestions.push(userAnswer);
                }
                userTags.filter((value) => !oldTags.includes(value));
                userTags.length === 0
                  ? (userTags = newTags)
                  : (userTags = userTags.concat(newTags));
                setNewTags([]);
                setOldTags([]);
                Promise.all(
                  [
                    fetch(`/api/user/put-question-responses`, {
                      method: "POST",
                      body: JSON.stringify({
                        responses: newUserResponses,
                        userId: session.data.user.uid,
                      }),
                    }),
                  ].concat(
                    question.type === "MCQ" || question.type === "CheckBox"
                      ? [
                          fetch(`/api/user/update-user`, {
                            method: "POST",
                            body: JSON.stringify({
                              userInfo: { tags: userTags },
                              userId: session.data.user.uid,
                            }),
                          }),
                        ]
                      : []
                  )
                ).then(() => {
                  store.dispatch(updateTagsAction(userTags));
                  store.dispatch(
                    updateQuestionResponsesAction(newUserResponses)
                  );
                  onUpdate(userTags);
                  setOriginalAnswer(userAnswer);
                  setDisplayingQuestion(false);
                });
              } else {
                let newUserResponses = userAnswers;
                let indexOfResponse = newUserResponses.findIndex(
                  ({ questionId }) => {
                    return questionId === userAnswer.questionId;
                  }
                );
                if (indexOfResponse !== -1) {
                  newUserResponses[indexOfResponse] = userAnswer;
                } else {
                  newUserResponses.push(userAnswer);
                }
                userTags.filter((value) => !oldTags.includes(value));
                userTags.length === 0
                  ? (userTags = newTags)
                  : (userTags = userTags.concat(newTags));
                setNewTags([]);
                setOldTags([]);
                if (question._id.toString() === "61c6b6f2d3054b6dd0f1fc64") {
                  fetch(`/api/user/update-user`, {
                    method: "POST",
                    body: JSON.stringify({
                      userInfo: {
                        grade: parseInt(
                          userAnswer.response.includes("9")
                            ? "9"
                            : userAnswer.response.substring(
                                0,
                                userAnswer.response.indexOf("t")
                              )
                        ),
                      },
                      userId: session.data.user.uid,
                    }),
                  }).then(() => {
                    store.dispatch(
                      updateAccountAction({
                        ...store.getState().accountInfo,
                        grade: parseInt(
                          userAnswer.response.includes("9")
                            ? "9"
                            : userAnswer.response.substring(
                                0,
                                userAnswer.response.indexOf("t")
                              )
                        ),
                        _id: undefined,
                      })
                    );
                  });
                }
                Promise.all(
                  [
                    fetch(`/api/questions/put-question-responses`, {
                      method: "POST",
                      body: JSON.stringify({
                        responses: newUserResponses,
                        userId: session.data.user.uid,
                      }),
                    }),
                  ].concat(
                    question.type === "MCQ" || question.type === "CheckBox"
                      ? [
                          fetch(`/api/user/update-user`, {
                            method: "POST",
                            body: JSON.stringify({
                              userInfo: { tags: userTags },
                              userId: session.data.user.uid,
                            }),
                          }),
                        ]
                      : []
                  )
                ).then(() => {
                  store.dispatch(updateTagsAction(userTags));
                  store.dispatch(
                    updateQuestionResponsesAction(newUserResponses)
                  );
                  onUpdate(userTags);
                  setOriginalAnswer(userAnswer);
                  setDisplayingQuestion(false);
                });
              }
            }}
            className="general-submit-btn mt-2"
          >
            SUBMIT
          </button>
        </div>
      </Modal>
    </div>
  );
}
