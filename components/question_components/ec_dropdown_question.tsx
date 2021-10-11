import {
  faArrowLeft,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";

interface ECDropDownProps {
  isConcatenable?: boolean;
  placeholder: string;
  forCalendar?: boolean;
  defaultValue?: string | string[];
  valuesList: string[];
  key: String;
}
const defaultProps: ECDropDownProps = {
  isConcatenable: false,
  placeholder: "Pick some tags...",
  forCalendar: false,
  valuesList: ["Sike"],
  key: "",
};

export default function ECDropDown({
  isConcatenable,
  placeholder,
  forCalendar,
  defaultValue,
  valuesList,
  key,
}: ECDropDownProps) {
  const [chosen, setChosen] = useState(isConcatenable ? [] : "");
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
    <div className="w-100 d-flex flex-column justify-content-evenly pt-5">
      {!forCalendar ? (
        <div
          className="fw-bold cl-dark-text pb-3"
          style={{ fontSize: "1.4em" }}
        >
          Achievements
        </div>
      ) : null}
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id={"ec-dropdown" + key}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {!forCalendar
            ? chosen.length === 0
              ? placeholder
              : !isConcatenable
              ? chosen
              : chosen.toString()
            : defaultValue}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="ec-dropdown-menu"
        >
          {valuesList.map((name) => (
            <li
              onClick={() => changeChosen(name)}
              className={
                itemIsPicked(name) ? "dropdown-item-picked" : "dropdown-item"
              }
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
ECDropDown.defaultProps = defaultProps;
