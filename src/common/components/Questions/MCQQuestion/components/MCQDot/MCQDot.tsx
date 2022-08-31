import React, { useState } from "react";
import palette from "../../../styles/palette.module.scss";
interface MCQDotProps {
  selected: boolean;
  isThick?: boolean;
  setSelected: Function;
}

export default function MCQDot({
  selected,
  setSelected,
  isThick,
}: MCQDotProps) {
  return (
    <button
      onClick={() => {
        setSelected(!selected);
      }}
      style={{ outline: "none", border: "none" }}
    >
      <div
        style={{
          borderStyle: "solid",
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          borderWidth: isThick ? "3px" : "1px",
          borderColor: isThick ? palette.clMidGray : palette.clLightGray,
        }}
      >
        {selected && (
          <div
            style={{
              backgroundColor: palette.clBlue,
            }}
          />
        )}
      </div>
    </button>
  );
}
