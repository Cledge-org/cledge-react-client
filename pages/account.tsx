import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import TextInputQuestion from "../components/question_components/textinput_question";

// my accounts page
export default function Account() {
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
            value="John Cena"
            onEdit={() => {
              setModalOpen(true);
            }}
          />
          <InfoSection
            name="BIRTHDAY"
            value="2021-09-13"
            onEdit={() => {
              setModalOpen(true);
            }}
          />
          <InfoSection
            name="ADDRESS"
            value="null"
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
            value="yousefgomaa@hotmail.com"
            onEdit={() => {
              setModalOpen(true);
            }}
          />
        </div>
        <div className="myaccount-blob">
          <span className="title">Academic Info</span>
          <InfoSection
            name="Grade"
            value="10"
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
        <TextInputQuestion />
      </Modal>
    </div>
  );
}
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
Account.requireAuth = false;
