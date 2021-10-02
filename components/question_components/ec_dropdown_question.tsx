import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Dropdown from "react-dropdown";
import QuestionSubPageHeader from "../../components/question_components/question_subpage_header";
import QuestionSummaryCard from "../../components/question_components/question_summary_card";

export default function ECDropDown() {
  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-evenly">
      <span>Achievements</span>
      <Dropdown
        controlClassName="dropdown-btn"
        menuClassName="dropdown-menu-custom"
        options={["Customize", "Government", "Children"]}
        onChange={() => {}}
        placeholder="Pick some tags..."
      />
    </div>
  );
}
