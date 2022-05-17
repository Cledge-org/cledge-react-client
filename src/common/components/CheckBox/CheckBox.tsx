import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface CheckBoxProps {
  selected: boolean;
  setSelected: Function;
}

export default function CheckBox({ selected, setSelected }: CheckBoxProps) {
  return (
    <button
      onClick={() => {
        setSelected(!selected);
      }}
      className="checkbox-container"
    >
      <div className={selected ? "checkbox-true" : "checkbox"}>
        {selected ? <FontAwesomeIcon icon={faCheck} color="#ffffff" /> : null}
      </div>
    </button>
  );
}
