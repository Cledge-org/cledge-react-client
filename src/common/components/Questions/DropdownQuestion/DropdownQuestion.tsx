import {
  faArrowLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import styles from "./dropdown-question.module.scss";
interface DropDownQuestionProps {
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
  containerStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
  isForDashboard?: boolean;
  isCentered?: boolean;
  smallTitle?: boolean;
  isForCST?: boolean;
}
const defaultProps: DropDownQuestionProps = {
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
export default function DropDownQuestion({
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
  isForCST,
  onChange,
  isCentered,
  containerStyles,
  smallTitle,
  buttonStyles,
}: DropDownQuestionProps) {
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
        setIsOpen(false);
        return value;
      }
      let prevChosenArr = prevChosen instanceof Array ? prevChosen.slice() : [];
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
    return chosen === "" || chosen?.length === 0
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
      className={`${
        isForCST
          ? "w-100 d-flex flex-column"
          : !forCalendar && !isForWaitlist && !smallTitle
          ? "w-100 d-flex flex-column pt-5"
          : "w-100 d-flex flex-column"
      } ${isCentered ? "justify-content-center" : ""}`}
      style={
        isForDashboard
          ? { flex: "0.2", ...containerStyles }
          : { ...containerStyles }
      }
    >
      {!forCalendar && !isForWaitlist ? (
        <div
          className={`fw-bold ${
            smallTitle ? "cl-light-gray pb-1" : "cl-dark-text pb-3"
          }`}
          style={{
            fontSize: smallTitle ? "1em" : "1.4em",
            width: "fit-content",
          }}
        >
          {questionTitle}
        </div>
      ) : null}
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <button
          className={`${styles.dropdownQuestionBtn + " px-3 py-3"} ${
            isForWaitlist || isForCST ? "bg-white" : ""
          } ${
            isForDashboard ? "py-0 " + styles.bottomBorderPathwayFilter : ""
          }`}
          style={
            isForDashboard
              ? {
                  border: "none",
                  borderRadius: 0,
                  height: "87%",
                  // borderBottom: "3px solid #656565",
                  backgroundColor: "transparent",
                  color: "#070452",
                  ...buttonStyles,
                }
              : { ...buttonStyles }
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {!forCalendar &&
          (defaultValue === "" || defaultValue?.length === 0 || !defaultValue)
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
              isOpen
                ? "center-child " + styles.iconOpen
                : "center-child " + styles.iconClose
            }
            style={{ width: "12px", height: "10px" }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </button>
        <div
          className={classNames(
            `dropdown-menu-custom`,
            styles.dropdownQuestionMenu,
            "shadow-sm"
          )}
          style={
            !forCalendar && !isForWaitlist && !isForCST && !smallTitle
              ? { display: isOpen ? "flex" : "none" }
              : {
                  width: "100%",
                  display: isOpen ? "flex" : "none",
                }
          }
        >
          {valuesList.map((name) => (
            <button
              onClick={() => {
                changeChosen(name);
              }}
              key={name}
              className={classNames(
                {
                  [styles.dropdownItemPicked]:
                    itemIsPicked(name) && !forCalendar,
                  [styles.dropdownItemPicked + " center-child"]:
                    itemIsPicked(name) && forCalendar,
                  [styles.dropdownItem]: !itemIsPicked(name) && !forCalendar,
                  [styles.dropdownItem + " center-child"]:
                    !itemIsPicked(name) && forCalendar,
                },
                "py-2 px-3"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
DropDownQuestion.defaultProps = defaultProps;
