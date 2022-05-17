import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext, NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { AccountInfo, UserResponse } from "../../types/types";

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
  const [currQuestion, setCurrQuestion] = useState({
    userAnswer: "",
    _id: null,
    question: "",
    type: "",
    helpVid: "",
    helpText: "",
    data: [],
    isConcatenable: false,
  });
  const [iteratedFirst, setIteratedFirst] = useState(false);
  const session = useSession();
  const updateUserData = async () => {
    await Promise.all([
      fetch(`/api/update-user`, {
        method: "POST",
        body: JSON.stringify({
          userInfo: { ...currUserData, _id: undefined },
          userId: session.data.user.uid,
        }),
      }),
      fetch(`/api/put-question-responses`, {
        method: "POST",
        body: JSON.stringify({
          responses: questionResponses,
          userId: session.data.user.uid,
        }),
      }),
    ]).then((reses) => {
      reses.forEach((res, index) => {
        if (index === 0) {
          store.dispatch(
            updateAccountAction({ ...currUserData, _id: undefined })
          );
        } else {
          store.dispatch(updateQuestionResponsesAction(questionResponses));
        }
        console.log(res.status);
      });
    });
  };
  useEffect(() => {
    if (!iteratedFirst) {
      setIteratedFirst(true);
    } else {
      setModalOpen(true);
    }
  }, [currQuestion]);
  useEffect(() => {
    console.log(currUserData);
  }, [currUserData]);
  return (
    <div className="container-fluid h-100 center-child">
      <div style={{ width: "40%" }}>
        <span className="cl-dark-text fw-bold" style={{ fontSize: "1.7em" }}>
          Personal Info
        </span>
        <div className="py-3" />
        <div className="myaccount-blob">
          <span className="title">Basic Info</span>
          <div className="pb-3" />
          <div className="myaccount-info-section">
            <span className="name align-self-start">PHOTO</span>
            <div className="info-container">
              <div
                className="bg-cl-blue center-child"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.4em",
                  width: "4vw",
                  height: "4vw",
                  border: "1px solid transparent",
                  borderRadius: "2vw",
                  userSelect: "none",
                }}
              >
                c
              </div>
              <div />
              {/* <button className="icon-btn" >
                <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
              </button> */}
            </div>
          </div>
          <InfoSection
            name="NAME"
            value={currUserData.name}
            onEdit={() => {
              setCurrQuestion({
                ...currQuestion,
                userAnswer: currUserData.name,
                question: "NAME",
              });
            }}
          />
          {/* <InfoSection
            name="BIRTHDAY"
            value={accountInfo.birthday.toString()}
            onEdit={() => {
              setModalOpen(true);
            }}
          /> */}
          <InfoSection
            name="ADDRESS"
            value={currUserData.address}
            onEdit={() => {
              setCurrQuestion({
                ...currQuestion,
                userAnswer: currUserData.address,
                question: "ADDRESS",
              });
            }}
          />
          <InfoSection name="PASSWORD" value="******" onEdit={() => {}} />
        </div>
        <div className="myaccount-blob">
          <span className="title">Contact Info</span>
          <InfoSection
            name="Email"
            value={currUserData.email}
            onEdit={() => {
              setCurrQuestion({
                ...currQuestion,
                userAnswer: currUserData.email,
                question: "Email",
              });
            }}
          />
        </div>
        <div className="myaccount-blob">
          <span className="title">Academic Info</span>
          <InfoSection
            name="Grade"
            value={currUserData.grade}
            onEdit={() => {
              setCurrQuestion({
                ...currQuestion,
                userAnswer: currUserData.grade.toString(),
                question: "Grade",
              });
            }}
          />
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        style={{
          overlay: {
            background: "rgba(50, 50, 50, 0.5)",
          },
          content: {
            top: "30%",
            left: "35%",
            width: "30%",
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
        <TextInputQuestion
          question={currQuestion}
          userAnswer={currQuestion.userAnswer}
          onChange={(value) => {
            let newUserData = currUserData;
            newUserData[currQuestion.question.toLowerCase()] =
              currQuestion.question.toLowerCase() === "grade"
                ? parseInt(value)
                : value;
            setCurrUserData({ ...newUserData });
            if (currQuestion.question.toLowerCase() === "grade") {
              let indexOfResponse = questionResponses.findIndex(
                ({ questionId }) => questionId === "61de0b617c405886579656ec"
              );
              let newUserResponses = questionResponses;
              if (indexOfResponse === -1) {
                newUserResponses.push({
                  questionId: "61de0b617c405886579656ec",
                  response: value,
                });
              } else {
                newUserResponses[indexOfResponse].response = value;
              }
            }
          }}
        />
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
  );
};
interface InfoSectionProps {
  name: string;
  value: any;
  onEdit: Function;
}
function InfoSection({ name, value, onEdit }: InfoSectionProps) {
  return (
    <div className="myaccount-info-section">
      <span className="name">{name.toUpperCase()}</span>
      <div className="info-container">
        {value}
        <button className="icon-btn" onClick={() => onEdit()}>
          <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
        </button>
      </div>
    </div>
  );
}
AccountPage.requireAuth = true;
export default connect((state) => ({
  accountInfo: state.accountInfo,
  questionResponses: state.questionResponses,
}))(AccountPage);
