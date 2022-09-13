import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./check-box.module.scss";
import palette from "../../styles/palette.module.scss";
interface CheckBoxProps {
  selected: boolean;
  isThick?: boolean;
  setSelected: Function;
}

export default function CheckBox({
  selected,
  setSelected,
  isThick,
}: CheckBoxProps) {
  return (
    <button
      onClick={() => {
        setSelected(!selected);
      }}
      className={styles.checkboxContainer}
    >
      <div
        style={{
          borderStyle: "solid",
          borderWidth: isThick ? "3px" : "1px",
          borderColor: isThick ? palette.clMidGray : palette.clLightGray,
        }}
        className={selected ? styles.checkboxTrue : styles.checkbox}
      >
        {selected ? <FontAwesomeIcon icon={faCheck} color="#ffffff" /> : null}
      </div>
    </button>
  );
}
