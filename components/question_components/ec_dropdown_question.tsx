import {
  faArrowLeft,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

interface ECDropDownProps {
  isConcatenable?: boolean;
  placeholder: string;
}
const defaultProps: ECDropDownProps = {
  isConcatenable: false,
  placeholder: "Pick some tags...",
};

export default function ECDropDown({
  isConcatenable,
  placeholder,
}: ECDropDownProps) {
  const [chosen, setChosen] = useState(isConcatenable ? [] : "");
  const changeChosen = (value) =>
    setChosen((prevChosen) => {
      if (!isConcatenable) {
        return value;
      }
      let prevChosenArr = prevChosen instanceof Array ? prevChosen : [];
      if (prevChosenArr.includes(value)) {
        prevChosenArr.splice(prevChosen.indexOf(value));
        return prevChosenArr;
      }
      prevChosenArr.push(value);
      return prevChosenArr;
    });
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  return (
    <div className="w-100 d-flex flex-column justify-content-evenly">
      <span>Achievements</span>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="ec-dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {chosen.length === 0
            ? placeholder
            : !isConcatenable
            ? chosen
            : chosen.toString().substring(1, chosen.toString().length - 1)}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="ec-dropdown-menu"
        >
          <li
            onClick={() => changeChosen("Customize")}
            className="dropdown-item"
          >
            Customize
          </li>
          <li
            onClick={() => changeChosen("Government")}
            className="dropdown-item"
          >
            Government
          </li>
          <li
            onClick={() => changeChosen("Children")}
            className="dropdown-item"
          >
            Children
          </li>
        </ul>
      </div>
    </div>
  );
}
ECDropDown.defaultProps = defaultProps;
