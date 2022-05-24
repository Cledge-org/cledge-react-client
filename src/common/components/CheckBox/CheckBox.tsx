import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./check-box.module.scss";

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
      className={styles.checkboxContainer}
    >
      <div className={selected ? styles.checkboxTrue : styles.checkbox}>
        {selected ? <FontAwesomeIcon icon={faCheck} color="#ffffff" /> : null}
      </div>
    </button>
  );
}
