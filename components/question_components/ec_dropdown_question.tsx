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

export default function ECDropDown() {
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
          Pick some tags...
        </button>
        <ul className="dropdown-menu" aria-labelledby="ec-dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
