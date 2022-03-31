import {
  faArrowLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";

interface ECDropDownProps {
  isConcatenable?: boolean;
  title: string;
  placeholder: string;
  forCalendar?: boolean;
  defaultValue?: string | string[];
  valuesList: string[];
  questionTitle: string;
  isForWaitlist?: boolean;
  onChange: Function;
  index?: number;
  rankings?: string[];
  key: String;
  isForDashboard?: boolean;
}
const defaultProps: ECDropDownProps = {
  isConcatenable: false,
  title: "Achievements",
  placeholder: "Pick some tags...",
  forCalendar: false,
  valuesList: ["None"],
  key: "",
  questionTitle: "",
  onChange: () => {},
};
function useOutsideAlerter(ref, handleClickOutside) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default function ECDropDown({
  isConcatenable,
  title,
  placeholder,
  rankings,
  forCalendar,
  index,
  defaultValue,
  valuesList,
  key,
  isForWaitlist,
  questionTitle,
  isForDashboard,
  onChange,
}: ECDropDownProps) {
  const [chosen, setChosen] = useState(
    //WORKS!!!
    isConcatenable && defaultValue instanceof Array
      ? defaultValue.map((element) => " " + element)
      : ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

  const changeChosen = (value: string) => {
    setChosen((prevChosen) => {
      if (!isConcatenable) {
        onChange(value, setChosen);
        return value;
      }
      let prevChosenArr = prevChosen instanceof Array ? prevChosen.slice() : [];
      console.log(prevChosenArr);
      if (prevChosenArr.includes(" " + value)) {
        prevChosenArr.splice(prevChosen.indexOf(" " + value));
        onChange(prevChosenArr.map((element) => element.substring(1)));
        return prevChosenArr;
      }
      prevChosenArr.push(" " + value);
      onChange(prevChosenArr.map((element) => element.substring(1)));
      return prevChosenArr;
    });
  };
  const itemIsPicked = (itemName: string) => {
    if (isConcatenable) {
      return chosen.length === 0
        ? defaultValue.includes(itemName)
        : chosen.includes(" " + itemName);
    }
    return chosen === "" || chosen === []
      ? defaultValue === itemName
      : chosen === itemName;
  };
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  useEffect(() => {
    if (
      rankings &&
      typeof chosen === "string" &&
      rankings.indexOf(chosen) !== index
    ) {
      setChosen("");
    }
  }, [rankings]);
  return (
    <div
      className={
        !forCalendar && !isForWaitlist
          ? "w-100 d-flex flex-column justify-content-evenly pt-5"
          : "w-100 d-flex flex-column justify-content-evenly"
      }
      style={isForDashboard ? { flex: "0.2" } : {}}
    >
      {!forCalendar && !isForWaitlist ? (
        <div
          className="fw-bold cl-dark-text pb-3"
          style={{ fontSize: "1.4em" }}
        >
          {questionTitle}
        </div>
      ) : null}
      <div ref={wrapperRef} className="dropdown-container">
        <button
          className={`ec-dropdown-btn ${isForWaitlist ? "bg-white" : ""} ${
            isForDashboard ? "py-0 bottom-border-pathway-filter" : ""
          }`}
          style={
            isForDashboard
              ? {
                  border: "none",
                  borderRadius: 0,
                  height: "87%",
                  borderBottom: "3px solid #656565",
                  backgroundColor: "transparent",
                  color: "#070452",
                }
              : {}
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {!forCalendar &&
          (defaultValue === "" || defaultValue === [] || !defaultValue)
            ? chosen.length === 0
              ? placeholder
              : !isConcatenable
              ? chosen
              : chosen.toString()
            : chosen.length === 0
            ? defaultValue instanceof Array
              ? defaultValue.reduce((prev, curr) => {
                  return prev === "" ? curr : prev + ", " + curr;
                }, "")
              : defaultValue
            : chosen.toString()}
          <div
            className={
              isOpen ? "center-child icon-open" : "center-child icon-close"
            }
            style={{ width: "12px", height: "10px" }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </button>
        <div
          className="dropdown-menu-custom ec-dropdown-menu"
          style={
            !forCalendar && !isForWaitlist
              ? { display: isOpen ? "flex" : "none" }
              : { width: "100%", display: isOpen ? "flex" : "none" }
          }
        >
          {valuesList.map((name) => (
            <button
              onClick={() => {
                changeChosen(name);
              }}
              key={name}
              className={
                itemIsPicked(name)
                  ? !forCalendar
                    ? "ec-dropdown-item-picked"
                    : "ec-dropdown-item-picked center-child"
                  : !forCalendar
                  ? "ec-dropdown-item"
                  : "ec-dropdown-item center-child"
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
ECDropDown.defaultProps = defaultProps;
