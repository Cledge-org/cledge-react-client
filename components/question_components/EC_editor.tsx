import { faArrowLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import ECCalendarDropDown from "./ec_calendar_dropdown";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";
import ECTimeFrame from "./ec_timeframe_question";

interface ECEditorProps {
  title?: string;
  onSave: Function;
  chunkQuestions: Question[];
  userResponses: any[];
  isEditing: boolean;
  index: number;
}

export default function ECEditor({
  onSave,
  chunkQuestions,
  isEditing,
  userResponses,
  index,
}: ECEditorProps) {
  console.log(userResponses[index]);
  return (
    <div
      className="container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative"
      style={{ overflowY: "scroll" }}
    >
      <button
        onClick={() => {
          onSave();
        }}
        className="ec-editor-btn-back"
      >
        <FontAwesomeIcon icon={faArrowLeft} color="#000000" />
      </button>
      <div
        className="align-self-center d-flex h-100 w-50 py-3 flex-column"
        style={{ textAlign: "start" }}
      >
        <span
          className="cl-dark-text"
          style={{ fontSize: "1.8em", fontWeight: 800 }}
        >
          {isEditing ? "Editing Experience" : "Adding a New Experience"}
        </span>
        {chunkQuestions.map(({ question, type, id, isConcatenable, data }) => {
          if (type === "ECDropDown") {
            return (
              <ECDropDown
                isConcatenable={isConcatenable}
                valuesList={data}
                key={id}
                questionTitle={question}
                defaultValue={
                  isEditing &&
                  userResponses[index].find(
                    ({ questionId }) => questionId === id
                  ) !== undefined
                    ? userResponses[index].find(
                        ({ questionId }) => questionId === id
                      ).response
                    : []
                }
              />
            );
          }
          if (type === "ECTextInput") {
            return (
              <ECTextInputQuestion
                questionTitle={question}
                userResponse={
                  isEditing &&
                  userResponses[index].find(
                    ({ questionId }) => questionId === id
                  ) !== undefined
                    ? userResponses[index].find(
                        ({ questionId }) => questionId === id
                      ).response
                    : ""
                }
                placeholder={""}
                onChange={() => {}}
              />
            );
          }
          if (type === "ECTimeFrame") {
            return <ECTimeFrame />;
          }
          return null;
        })}
        <button
          onClick={() => onSave()}
          className="cl-btn-blue align-self-center mt-5"
          style={{ transform: "scale(1.2)" }}
        >
          Save
        </button>
        <div className="py-4" />
      </div>
    </div>
  );
}
