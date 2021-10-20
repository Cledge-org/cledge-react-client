import React, { useState } from "react";
import QuestionSubPageHeader from "./question_subpage_header";
import QuestionSummaryCard from "./question_summary_card";

export default function ECTextInputQuestion({title=undefined, placeholder, fontSize=1.4, pt=5, onChange}) {
  const classes = ["w-100", "d-flex", "flex-column", "justify-content-evenly", `pt-${pt}`];

  return (
    <div className={classes.join(' ')}>
      {typeof title !== 'undefined' &&
        <div className="fw-bold cl-dark-text pb-3" style={{ fontSize: `${fontSize}em` }}>
          {title}
        </div>
      }
      <input
        type="text"
        className="form-control ec-text-input"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
