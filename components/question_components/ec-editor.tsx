import { faArrowLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import ECCalendarDropDown from "./ec_calendar_dropdown";
import ECDropDown from "./ec_dropdown_question";
import ECTextInputQuestion from "./ec_textinput_question";
import ECTimeFrame from "./ec_timeframe_question";
import CheckBoxQuestion from "./checkbox_question";

interface ECEditorProps {
  title?: string;
  onSave: Function;
  onAbort: Function;
  chunkQuestions: Question[];
  userResponse: UserResponse[];
  isEditing: boolean;
  index: number;
}

export default function ECEditor({
  onSave,
  chunkQuestions,
  isEditing,
  userResponse,
  index,
  onAbort,
}: ECEditorProps) {
  const [newResponse, setNewResponse] = useState(
    userResponse ? userResponse : []
  );
  return (
    <div
      className="container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative"
      style={{ overflowY: "scroll" }}
    >
      <button
        onClick={() => {
          onAbort();
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
          {isEditing ? "Editing Activity" : "Adding a New Activity"}
        </span>
        {chunkQuestions.map((questionData) => {
          const { question, isConcatenable, data, type, _id } = questionData;
          console.log(userResponse);
          if (type === "CheckBox") {
            return (
              <CheckBoxQuestion
                tags={[]}
                inEC
                question={questionData}
                userAnswers={
                  isEditing &&
                  userResponse &&
                  userResponse.find(({ questionId }) => questionId === _id)
                    ? userResponse.find(({ questionId }) => questionId === _id)
                        .response
                    : null
                }
                onChange={(value, newQTags, oldQTags) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id,
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          if (type === "ECDropDown") {
            return (
              <ECDropDown
                isConcatenable={isConcatenable}
                valuesList={data}
                onChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  console.log(value);
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id,
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
                key={_id}
                questionTitle={question}
                defaultValue={
                  isEditing &&
                  userResponse &&
                  userResponse.find(({ questionId }) => questionId === _id)
                    ? userResponse.find(({ questionId }) => questionId === _id)
                        .response
                    : null
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
                  userResponse &&
                  userResponse.find(({ questionId }) => questionId === _id)
                    ? userResponse.find(({ questionId }) => questionId === _id)
                        .response
                    : ""
                }
                placeholder={""}
                onChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id,
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          if (type === "ECTimeFrame") {
            let response =
              isEditing &&
              userResponse &&
              userResponse.find(({ questionId }) => questionId === _id)
                ? userResponse.find(({ questionId }) => questionId === _id)
                    .response
                : { progress: "", finished: new Date(), start: new Date() };
            return (
              <ECTimeFrame
                defaultProgress={response.progress}
                defaultStart={
                  response.start instanceof Date
                    ? response.start
                    : new Date(response.start)
                }
                defaultEnd={
                  response.finished instanceof Date
                    ? response.finished
                    : new Date(response.finished)
                }
                onChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id,
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          return null;
        })}
        <button
          onClick={() => onSave(newResponse)}
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
