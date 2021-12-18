import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import Modal from "react-modal";
import TextInputQuestion from "../components/question_components/textinput_question";
import { NextApplicationPage } from "./_app";
import { getAccountInfo } from "./api/get-account";

// account page

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    let accountInfo: AccountInfo = await getAccountInfo("testUser");
    accountInfo.birthday = accountInfo.birthday.toDateString(); //THIS WORKS -- IT'S A TEMPORARY SOLUTION
    return { props: { accountInfo } };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};

const AccountPage: NextApplicationPage<{ accountInfo: AccountInfo }> = ({
  accountInfo,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
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
            value={accountInfo.name}
            onEdit={() => {
              setModalOpen(true);
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
            value={accountInfo.address}
            onEdit={() => {
              setModalOpen(true);
            }}
          />
          <InfoSection
            name="PASSWORD"
            value="******"
            onEdit={() => {
              setModalOpen(true);
            }}
          />
        </div>
        <div className="myaccount-blob">
          <span className="title">Contact Info</span>
          <InfoSection
            name="Email"
            value={accountInfo.email}
            onEdit={() => {
              setModalOpen(true);
            }}
          />
        </div>
        <div className="myaccount-blob">
          <span className="title">Academic Info</span>
          <InfoSection
            name="Grade"
            value={accountInfo.grade}
            onEdit={() => {
              setModalOpen(true);
            }}
          />
        </div>
      </div>
      <Modal
        style={{
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
        <TextInputQuestion question={undefined} userAnswer={""} />
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
export default AccountPage;
