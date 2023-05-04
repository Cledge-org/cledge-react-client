import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext, NextPage } from "next";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Modal from "react-modal";
import TextInputQuestion from "../../common/components/Questions/TextInputQuestion/TextInputQuestion";
import { NextApplicationPage } from "../AppPage/AppPage";
import { useSession } from "next-auth/react";
import { connect } from "react-redux";
import { store } from "../../utils/redux/store";
import {
  updateAccountAction,
  updateQuestionResponsesAction,
} from "../../utils/redux/actionFunctions";

import LoadingScreen from "../../common/components/Loading/Loading";
import InfoSection from "./components/InfoSection/InfoSection";
import styles from "./account-page.module.scss";
import classNames from "classnames";
import {
  callPutQuestionResponses,
  callUpdateUser,
  alertSlackError,
} from "src/utils/apiCalls";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import PageErrorBoundary from "src/common/components/PageErrorBoundary/PageErrorBoundary";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import Link from "next/link";
import MCQQuestion from "src/common/components/Questions/MCQQuestion/MCQQuestion";
import DoubleTextInputQuestion from "src/common/components/Questions/DoubleTextInputQuestion/DoubleTextInputQuestion";
import CompositeQuestion from "src/common/components/Questions/CompositeQuestion/CompositeQuestion";
import { accountQuestions } from "src/main-pages/AccountPage/questions";
// account page

const AccountPage: NextApplicationPage<{
  accountInfo: AccountInfo;
  questionResponses: UserResponse[];
}> = ({ accountInfo, questionResponses }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currUserData, setCurrUserData]: [
    AccountInfo,
    Dispatch<SetStateAction<AccountInfo>>
  ] = useState(accountInfo);
    const [currQuestion, setCurrQuestion] = useState<Question>({
    _id: null,
    question: "",
    type: "",
    placeholder: "",
    data: [],
    popUpText: "",
    isConcatenable: false,
    isRequired: false,
  });
  const [currUserAnswer, setCurrUserAnswer] = useState<string | any[]>("");
  const [iteratedFirst, setIteratedFirst] = useState(false);
  const size = useWindowSize();
  const updateUserData = async () => {
    await Promise.all([
      callUpdateUser({ ...currUserData, _id: undefined }),
      callPutQuestionResponses(questionResponses),
    ]).then((reses) => {
      reses.forEach((res, index) => {
        if (index === 0) {
          store.dispatch(
            updateAccountAction({ ...currUserData, _id: undefined })
          );
        } else {
          store.dispatch(updateQuestionResponsesAction(questionResponses));
        }
      });
    });
  };
  const updateAccountAndQuestionReponse = useCallback(
    (value: string | any[], questionIdent: string) => {
      let newUserData = currUserData;
      setCurrUserAnswer(value);
      newUserData[currQuestion.question.toLowerCase()] =
        value instanceof Array
          ? questionIdent === "631fc0482734f1eb370771cc"
            ? value.reduce(
                (prev, curr) =>
                  prev
                    ? prev +
                      ", " +
                      (curr instanceof Array
                        ? curr.reduce(
                            (prev, curr) => (prev ? prev + ", " + curr : curr),
                            ""
                          )
                        : curr)
                    : curr,
                ""
              )
            : value.reduce(
                (prev, curr) => (prev ? prev + " " + curr : curr),
                ""
              )
          : value;
      setCurrUserData({ ...newUserData });
      let indexOfResponse = questionResponses.findIndex(
        ({ questionId }) => questionId === questionIdent
      );
      let newUserResponses = questionResponses;
      if (indexOfResponse === -1) {
        newUserResponses.push({
          questionId: questionIdent,
          response: value,
          tag: null
        });
      } else {
        newUserResponses[indexOfResponse].response = value;
      }
    },
    [currUserData, questionResponses, currQuestion]
  );

  useEffect(() => {
    if (!iteratedFirst) {
      setIteratedFirst(true);
    } else {
      setModalOpen(true);
    }
  }, [currQuestion]);

  return (
    <PageErrorBoundary>
      <div className="container-fluid h-100 center-child d-flex flex-column align-items-center">
        <div
          className="d-flex flex-column pt-5"
          style={{ width: size.width < 800 ? "95%" : "40%" }}
        >
          <span
            className="cl-dark-text fw-bold align-self-start"
            style={{ fontSize: "1.7em" }}
          >
            Personal Info
          </span>
          <div className="py-3" />
          <div className={classNames(styles.myaccountBlob, "px-4 py-4 mb-3")}>
            <span className={styles.title}>Basic Info</span>
            <div className="pb-3" />
            <InfoSection
              name="NAME"
              value={currUserData.name}
              onEdit={() => {
                setCurrUserAnswer(currUserData.name.split(" "));
                setCurrQuestion({
                  ...currQuestion,
                  ...accountQuestions[1],
                });
              }}
            />
            <InfoSection
              name="ADDRESS"
              value={currUserData.address}
              onEdit={() => {
                setCurrUserAnswer([
                  currUserData.address.split(", ")[0],
                  [
                    currUserData.address.split(", ")[1],
                    currUserData.address.split(", ")[2],
                  ],
                ]);
                setCurrQuestion({
                  ...currQuestion,
                  ...accountQuestions[0],
                });
              }}
            />
            <InfoSection
              name="PASSWORD"
              isPasswordEdit
              value="******"
              onEdit={() => {
                fetch(`/api/user/reset-password`, {
                  method: "POST",
                  body: JSON.stringify({ email: currUserData.email }),
                }).then((res) => {
                  //console.log(res.status);
                });
              }}
            />
          </div>
          <div className={classNames(styles.myaccountBlob, "px-4 py-4 mb-3")}>
            <span
              className="cl-dark-text fw-bold align-self-start"
              style={{ fontSize: "1em" }}
            >
              Academic Info
            </span>
            <InfoSection
              name="Grade"
              value={currUserData.grade}
              onEdit={() => {
                setCurrUserAnswer(currUserData.grade.toString());
                setCurrQuestion({
                  ...currQuestion,
                  ...accountQuestions[2],
                });
              }}
            />
          </div>
          <Link href="/auth/signout" className="align-self-center">
            <button className="cl-btn-red fw-bold" style={{ fontSize: "16px" }}>
              Log Out
            </button>
          </Link>
        </div>
        <Modal
          ariaHideApp={false}
          style={{
            overlay: {
              background: "rgba(50, 50, 50, 0.5)",
            },
            content: {
              top: "30%",
              left: size.width < 800 ? "5%" : "35%",
              width: size.width < 800 ? "90%" : "30%",
              height: "fit-content",
              borderRadius: "20px",
              borderColor: "white",
            },
          }}
          onRequestClose={() => {
            setModalOpen(false);
          }}
          isOpen={modalOpen}
        >
          {(currQuestion.type === "MCQ" && (
            <MCQQuestion
              question={currQuestion}
              userAnswer={currUserAnswer as string}
              isCentered
              onChange={(value) => {
                updateAccountAndQuestionReponse(
                  value,
                  "61c6b6f2d3054b6dd0f1fc64"
                );
              }}
              tags={[]}
            />
          )) ||
            (currQuestion.type === "DoubleTextInputQuestion" && (
              <DoubleTextInputQuestion
                userResponses={currUserAnswer as string[]}
                question={currQuestion}
                onChange={(newResponses: string[]) => {
                  updateAccountAndQuestionReponse(
                    newResponses,
                    "6319632cd1e56282060ad38a"
                  );
                }}
              />
            )) ||
            (currQuestion.type === "CompositeQuestion" && (
              <CompositeQuestion
                questions={currQuestion.data}
                responses={currUserAnswer as string[]}
                title={currQuestion.question}
                question={currQuestion}
                onChange={(responses, index) => {
                  let newResponses = (currUserAnswer as string[]).slice();
                  newResponses[index] = responses;
                  updateAccountAndQuestionReponse(
                    newResponses,
                    "631fc0482734f1eb370771cc"
                  );
                }}
              />
            ))}
          <div className="w-100 center-child">
            <button
              className="general-submit-btn mt-2"
              onClick={() => {
                updateUserData()
                  .then(() => {
                    setModalOpen(false);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              SUBMIT
            </button>
          </div>
        </Modal>
      </div>
    </PageErrorBoundary>
  );
};

AccountPage.requireAuth = true;
export default connect((state) => ({
  accountInfo: state?.accountInfo,
  questionResponses: state?.questionResponses,
}))(AccountPage);
