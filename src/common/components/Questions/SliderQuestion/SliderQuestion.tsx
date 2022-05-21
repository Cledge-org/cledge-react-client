import classNames from "classnames";
import React, { useState } from "react";
import styles from "./slider-question.module.scss";
interface SliderProps {
  title?: string;
  min: string;
  max: string;
  displayValue?: string;
  step?: string;
  plus?: boolean;
  onChange: Function;
}
export default function Slider({
  title = undefined,
  min,
  max,
  displayValue = min,
  step = "1",
  plus = false,
  onChange,
}: SliderProps) {
  var [sliderData, setSliderData] = useState(displayValue);

  return (
    <div className="container-fluid h-100 d-flex flex-column align-items-center justify-content-center w-100 cl-dark-text fw-bold my-4">
      {typeof title !== "undefined" && (
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {title}
        </span>
      )}
      <input
        type="range"
        className={classNames("form-range", styles.questionnaireSlider)}
        min={min}
        max={max}
        step={step}
        defaultValue={displayValue}
        onChange={(e) => {
          onChange(e);
          setSliderData(e.target.value);
        }}
      />
      <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
        {sliderData}
        {plus && sliderData == max && "+"}
      </span>
    </div>
  );
}