import {
  faArrowLeft,
  faSortDown,
  faSortUp,
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
  onChange: Function;
  key: String;
}
const defaultProps: ECDropDownProps = {
  isConcatenable: false,
  title: "Achievements",
  placeholder: "Pick some tags...",
  forCalendar: false,
  valuesList: ["None"],
  key: "",
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
  forCalendar,
  defaultValue,
  valuesList,
  key,
  onChange,
}: ECDropDownProps) {
  const [chosen, setChosen] = useState(isConcatenable ? [] : "");
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
        return value;
      }
      let prevChosenArr = prevChosen instanceof Array ? prevChosen : [];
      if (prevChosenArr.includes(value)) {
        prevChosenArr.splice(prevChosen.indexOf(" " + value));
        return prevChosenArr;
      }
      prevChosenArr.push(" " + value);
      return prevChosenArr;
    });
  };
  const itemIsPicked = (itemName: string) => {
    if (isConcatenable) {
      return chosen.includes(" " + itemName);
    }
    return chosen === itemName;
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
    <div
      className={
        !forCalendar
          ? "w-100 d-flex flex-column justify-content-evenly pt-5"
          : "w-100 d-flex flex-column justify-content-evenly"
      }
    >
      {!forCalendar ? (
        <div
          className="fw-bold cl-dark-text pb-3"
          style={{ fontSize: "1.4em" }}
        >
          {title}
        </div>
      ) : null}
      <div ref={wrapperRef} className="dropdown-container">
        <button className="ec-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          {!forCalendar
            ? chosen.length === 0
              ? placeholder
              : !isConcatenable
              ? chosen
              : chosen.toString()
            : defaultValue}
          <div
            className={
              isOpen ? "center-child icon-open" : "center-child icon-close"
            }
            style={{ width: "12px", height: "10px" }}
          >
            <FontAwesomeIcon icon={faSortDown} />
          </div>
        </button>
        <div
          className="dropdown-menu-custom ec-dropdown-menu"
          style={
            !forCalendar
              ? { display: isOpen ? "flex" : "none" }
              : { width: "100%", display: isOpen ? "flex" : "none" }
          }
        >
          {valuesList.map((name) => (
            <div
              onClick={() => {
                changeChosen(name);
                onChange();
              }}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
ECDropDown.defaultProps = defaultProps;
