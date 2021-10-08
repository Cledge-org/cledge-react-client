import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCalendar,
  faCalendarDay,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECDropDown from "./ec_dropdown_question";

interface ECCalendarDropDownProps {}
const defaultProps: ECCalendarDropDownProps = {};

export default function ECCalendarDropDown() {
  const [chosen, setChosen] = useState(new Date());
  const changeChosen = (value: Date) => {
    setChosen(value);
  };
  const buildDays = () => {
    let daysRows = [];
    let k = 0;
    let currDate = new Date(chosen.getFullYear(), chosen.getMonth(), 1);
    for (let i = 0; i < 6; i++) {
      let days = [];
      for (let j = 0; j < 7; j++) {
        if (
          (i == 0 && currDate.getDay() <= j + 1) ||
          (i > 0 && currDate.getMonth() == chosen.getMonth())
        ) {
          let copy = k + 1;
          days.push(
            <button
              key={copy + "ECCalendar"}
              onClick={() => {
                changeChosen(
                  new Date(chosen.getFullYear(), chosen.getMonth(), copy)
                );
              }}
              className={
                chosen.getDay() === copy ? "day-btn-chosen" : "day-btn"
              }
            >
              {k + 1}
            </button>
          );
          currDate = new Date(chosen.getFullYear(), chosen.getMonth(), k + 2);
          k++;
        } else {
          days.push(<div style={{ width: "45px", height: "45px" }} />);
        }
      }
      daysRows.push(
        <div className="d-flex w-100 justify-content-evenly align-items-center">
          {days}
        </div>
      );
    }
    return daysRows;
  };
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  useEffect(() => {
    console.log(chosen);
  }, [chosen]);
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly">
      <span>Achievements</span>
      <div className="dropdown">
        <button
          className="btn btn-secondary"
          type="button"
          id="ec-dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="cl-dark-text" style={{ fontWeight: 600 }}>
            {chosen.toString()}
          </span>
          <div style={{ width: "20px" }} className="cl-mid-text">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
        </button>
        <div
          className="dropdown-menu"
          aria-labelledby="ec-calendar-dropdown-menu"
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="me-2" style={{ width: "30%" }}>
              <ECDropDown
                forCalendar
                defaultValue={"October"}
                valuesList={["October"]}
              ></ECDropDown>
            </div>
            <div className="ms-2" style={{ width: "30%" }}>
              <ECDropDown
                forCalendar
                defaultValue={"2021"}
                valuesList={["2021", "2022"]}
              ></ECDropDown>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-evenly align-items-center pt-3">
            <div className="d-flex w-100 justify-content-evenly align-items-center">
              <div className="weekday-titles">Mo</div>
              <div className="weekday-titles">Tu</div>
              <div className="weekday-titles">We</div>
              <div className="weekday-titles">Th</div>
              <div className="weekday-titles">Fr</div>
              <div className="weekday-titles">Sa</div>
              <div className="weekday-titles">Su</div>
            </div>
            {buildDays()}
          </div>
        </div>
      </div>
    </div>
  );
}
ECCalendarDropDown.defaultProps = defaultProps;
