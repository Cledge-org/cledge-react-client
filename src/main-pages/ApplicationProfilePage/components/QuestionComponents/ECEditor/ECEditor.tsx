import { faArrowLeft, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CheckBoxQuestion from "../../../../../common/components/Questions/CheckboxQuestion/CheckboxQuestion";
import DropDownQuestion from "../../../../../common/components/Questions/DropdownQuestion/DropdownQuestion";
import MCQQuestion from "../../../../../common/components/Questions/MCQQuestion/MCQQuestion";
import TextInputQuestion from "../../../../../common/components/Questions/TextInputQuestion/TextInputQuestion";
import ECTimeFrame from "../../../../../common/components/Questions/TimeframeQuestion/TimeframeQuestion";
import ListQuestion from "../../../../../common/components/Questions/ListQuestion/ListQuestion";

import styles from "./ec-editor.module.scss";
interface ECEditorProps {
  title?: string;
  onSave: Function;
  onAbort: Function;
  chunkQuestions: Question[];
  userResponse: UserResponse[];
  isEditing: boolean;
  index: number;
  editText?: string;
  addingText?: string;
}

export default function ECEditor({
  onSave,
  chunkQuestions,
  isEditing,
  userResponse,
  index,
  editText,
  addingText,
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
          {isEditing
            ? editText || "Editing Activity"
            : addingText || "Adding a New Activity"}
        </span>
        {chunkQuestions.map((questionData) => {
          const { question, isConcatenable, data, type, _id } = questionData;
          //console.log(userResponse);
          if (type === "MCQ") {
            return (
              <MCQQuestion
                tags={[]}
                question={questionData}
                userAnswer={
                  isEditing &&
                  userResponse &&
                  userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  )
                    ? userResponse.find(
                        ({ questionId }) => questionId === _id.toString()
                      ).response
                    : null
                }
                onChange={(value, newQTags, oldQTags) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
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
                question={questionData}
                userAnswers={
                  isEditing &&
                  userResponse &&
                  userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  )
                    ? userResponse.find(
                        ({ questionId }) => questionId === _id.toString()
                      ).response
                    : null
                }
                onChange={(value, newQTags, oldQTags) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
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
                  //console.log(value);
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
                key={_id.toString()}
                questionTitle={question}
                defaultValue={
                  isEditing &&
                  userResponse &&
                  userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  )
                    ? userResponse.find(
                        ({ questionId }) => questionId === _id.toString()
                      ).response
                    : null
                }
              />
            );
          }
          if (type === "ECTextInput") {
            return (
              <TextInputQuestion
                question={questionData}
                userAnswer={
                  isEditing &&
                  userResponse &&
                  userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  )
                    ? userResponse.find(
                        ({ questionId }) => questionId === _id.toString()
                      ).response
                    : ""
                }
                onChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          if (type === "TextInput") {
            return (
              <TextInputQuestion
                question={questionData}
                userAnswer={
                  isEditing &&
                  userResponse &&
                  userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  )
                    ? userResponse.find(
                        ({ questionId }) => questionId === _id.toString()
                      ).response
                    : ""
                }
                onChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  if (
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
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
              userResponse.find(
                ({ questionId }) => questionId === _id.toString()
              )
                ? userResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  ).response
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
                      ({ questionId }) => questionId === _id.toString()
                    )
                  ) {
                    totallyNewResponse.find(
                      ({ questionId }) => questionId === _id.toString()
                    ).response = value;
                  } else {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
                      response: value,
                    });
                  }
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          if (type === "ListQuestion") {
            let response = userResponse.find(
              ({ questionId }) => questionId === _id.toString()
            );
            return (
              <ListQuestion
                responses={response?.response?.questionsResponses}
                onChange={(value, index, questionId) => {
                  let totallyNewResponse = newResponse.slice();
                  let foundResponse = totallyNewResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  );
                  if (foundResponse) {
                    if (!foundResponse.response) {
                      foundResponse.response = {
                        numResponse: -1,
                        questionsResponses: [],
                      };
                    }
                    if (!foundResponse.response.questionsResponses[index]) {
                      foundResponse.response.questionsResponses.push({});
                    }
                    //console.log(foundResponse.response);
                    foundResponse.response.questionsResponses[index][
                      questionId
                    ] = value;
                  }
                  setNewResponse(totallyNewResponse);
                }}
                title={question}
                listMax={12}
                questions={data}
                numResponse={response?.response?.numResponse}
                onNumResponseChange={(value) => {
                  let totallyNewResponse = newResponse.slice();
                  const foundResponse = totallyNewResponse.find(
                    ({ questionId }) => questionId === _id.toString()
                  );
                  if (!foundResponse) {
                    totallyNewResponse.push({
                      questionId: _id.toString(),
                      response: {
                        numResponse: value,
                        questionsResponses: [new Array(value).map(() => ({}))],
                      },
                    });
                  } else {
                    foundResponse.response.numResponse = value;
                  }
                  if (
                    value > foundResponse?.response?.questionsResponses?.length
                  ) {
                    for (
                      let i = 0;
                      i <
                      value -
                        foundResponse?.response?.questionsResponses?.length;
                      i++
                    ) {
                      foundResponse.response.questionsResponses.push({});
                    }
                  } else {
                    foundResponse?.response?.questionsResponses?.splice(
                      value - 1,
                      foundResponse?.response?.questionsResponses?.length -
                        value
                    );
                  }
                  //console.log(totallyNewResponse);
                  setNewResponse(totallyNewResponse);
                }}
              />
            );
          }
          return null;
        })}
        <button
          onClick={() => {
            //console.log(newResponse);
            onSave(newResponse);
          }}
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
