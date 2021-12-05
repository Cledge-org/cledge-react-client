import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCalendar,
  faCalendarDay,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import ECDropDown from "./ec_dropdown_question";

interface ECCalendarDropDownProps {}
const defaultProps: ECCalendarDropDownProps = {};
function useOutsideAlerter(ref, handleClickOutside) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default function ECCalendarDropDown() {
  const [chosen, setChosen] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let years = [];
  useEffect(() => {
    let yearsList: string[] = [];
    for (let i = 0; i < 4; i++) {
      yearsList.push((chosen.getFullYear() - i).toString());
    }
    years = yearsList;
  }, []);
  useOutsideAlerter(wrapperRef, (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });
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
              {copy}
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
    <div className="dropdown-container">
      <button className="ec-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="cl-dark-text" style={{ fontWeight: 600 }}>
          {months[chosen.getMonth()] + " " + chosen.getFullYear()}
        </span>
        <div style={{ width: "20px" }} className="cl-mid-text">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
      </button>
      <div
        ref={wrapperRef}
        className="dropdown-menu-custom ec-calendar-dropdown-menu"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="d-flex justify-content-center align-items-center pt-2">
          <div className="me-2" style={{ width: "25%" }}>
            <ECDropDown
              key={"-months"}
              forCalendar
              onChange={() => {}}
              defaultValue={months[chosen.getMonth() - 1]}
              valuesList={months}
            ></ECDropDown>
          </div>
          <div className="ms-2" style={{ width: "25%" }}>
            <ECDropDown
              forCalendar
              key={"-years"}
              defaultValue={chosen.getFullYear().toString()}
              valuesList={years}
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
  );
}
ECCalendarDropDown.defaultProps = defaultProps;
