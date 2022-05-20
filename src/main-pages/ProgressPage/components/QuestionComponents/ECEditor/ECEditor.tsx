import { faArrowLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CheckBoxQuestion from "../../../../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import DropDownQuestion from "../../../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import MCQQuestion from "../../../../../common/components/Questions/MCQQuestion/MCQQuestion";
import TextInputQuestion from "../../../../../common/components/Questions/TextInputQuestion/TextInputQuestion";
import ECTimeFrame from "../../../../../common/components/Questions/TimeframeQuestion/ECTimeframeQuestion";
import { Question, UserResponse } from "../../../../../types/types";
import styles from "./ec-editor.module.scss";
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
        className={styles.ecEditorBtnBack}
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
          if (type === "MCQ") {
            return (
              <MCQQuestion
                tags={[]}
                question={questionData}
                inEC
                userAnswer={
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
              <DropDownQuestion
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
              <TextInputQuestion
                isDark
                question={questionData}
                userAnswer={
                  isEditing &&
                  userResponse &&
                  userResponse.find(({ questionId }) => questionId === _id)
                    ? userResponse.find(({ questionId }) => questionId === _id)
                        .response
                    : ""
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
