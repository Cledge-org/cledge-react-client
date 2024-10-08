import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCalendar,
  faCalendarDay,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import DropDownQuestion from "../../../DropdownQuestion/DropdownQuestion";
import styles from "./calendar-dropdown.module.scss";
interface ECCalendarDropDownProps {
  onChange: Function;
  initialDate: Date;
}
function useOutsideAlerter(ref, handleClickOutside) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default function ECCalendarDropDown({
  onChange,
  initialDate,
}: ECCalendarDropDownProps) {
  const [chosen, setChosen] = useState(initialDate ? initialDate : new Date());
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
    onChange(value);
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
                chosen.getDay() === copy ? styles.dayBtnChosen : styles.dayBtn
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
    //console.log(chosen);
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
        className={classNames(
          "dropdown-menu-custom",
          styles.calendarDropdownMenu
        )}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="d-flex justify-content-center align-items-center pt-2">
          <div className="me-2" style={{ width: "25%" }}>
            <DropDownQuestion
              key={"-months"}
              forCalendar
              onChange={() => {}}
              defaultValue={months[chosen.getMonth() - 1]}
              valuesList={months}
            ></DropDownQuestion>
          </div>
          <div className="ms-2" style={{ width: "25%" }}>
            <DropDownQuestion
              forCalendar
              key={"-years"}
              defaultValue={chosen.getFullYear().toString()}
              valuesList={years}
            ></DropDownQuestion>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-evenly align-items-center pt-3">
          <div className="d-flex w-100 justify-content-evenly align-items-center">
            <div className={styles.weekdayTitles}>Mo</div>
            <div className={styles.weekdayTitles}>Tu</div>
            <div className={styles.weekdayTitles}>We</div>
            <div className={styles.weekdayTitles}>Th</div>
            <div className={styles.weekdayTitles}>Fr</div>
            <div className={styles.weekdayTitles}>Sa</div>
            <div className={styles.weekdayTitles}>Su</div>
          </div>
          {buildDays()}
        </div>
      </div>
    </div>
  );
}
