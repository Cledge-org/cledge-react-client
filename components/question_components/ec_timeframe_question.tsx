import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCalendar,
  faCalendarDay,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECCalendarDropDown from "./ec_calendar_dropdown";
import ECDropDown from "./ec_dropdown_question";

interface ECCalendarDropDownProps {
  defaultStart?: Date;
  defaultEnd?: Date;
}
const defaultProps: ECCalendarDropDownProps = {};

export default function ECTimeFrame({
  defaultEnd,
  defaultStart,
}: ECCalendarDropDownProps) {
  const [progress, setProgress] = useState("none");
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
      <div className="fw-bold cl-dark-text pb-3" style={{ fontSize: "1.4em" }}>
        Time Frame
      </div>
      <div className="d-flex w-100 flex-row justify-content-between align-items-center pb-3">
        <button
          onClick={() => {
            setProgress("finished");
          }}
          className={
            progress === "finished" ? "cl-btn-gray-selected" : "cl-btn-gray"
          }
          style={{ width: "47%", fontSize: "1.1em" }}
        >
          Finished
        </button>
        <button
          onClick={() => {
            setProgress("ongoing");
          }}
          className={
            progress === "ongoing" ? "cl-btn-gray-selected" : "cl-btn-gray"
          }
          style={{ width: "47%", fontSize: "1.1em" }}
        >
          Ongoing
        </button>
      </div>
      <div className="cl-mid-gray pb-2" style={{ fontSize: "0.9em" }}>
        Start:
      </div>
      <ECCalendarDropDown />
      {progress === "finished" ? <div className="py-3" /> : null}
      {progress === "finished" ? (
        <div className="cl-mid-gray pb-2" style={{ fontSize: "0.9em" }}>
          Finish:
        </div>
      ) : null}
      {progress === "finished" ? <ECCalendarDropDown /> : null}
    </div>
  );
}
