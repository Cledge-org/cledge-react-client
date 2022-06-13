import classNames from "classnames";
import React, { useMemo, useState } from "react";
import styles from "./slider-question.module.scss";
interface SliderProps {
  title?: string;
  min: string;
  max: string;
  isPathwayQuestion?: boolean;
  displayValue?: string;
  step?: string;
  plus?: boolean;
  onChange: Function;
}
export default function SliderQuestion({
  title = undefined,
  min,
  max,
  isPathwayQuestion,
  displayValue = min,
  step = "1",
  plus = false,
  onChange,
}: SliderProps) {
  var [sliderData, setSliderData] = useState(displayValue);
  const range = useMemo(() => {
    let rangeArr = [];
    for (let i = 0; i < parseInt(max) - parseInt(min) + 1; i++) {
      rangeArr.push(i);
    }
    return rangeArr;
  }, []);
  return (
    <div
      className={`container-fluid h-100 d-flex flex-column align-items-${
        isPathwayQuestion ? "start" : "center"
      } justify-content-center w-100 cl-dark-text fw-bold my-4`}
    >
      {typeof title !== "undefined" && (
        <span className="pt-4 pb-2" style={{ fontSize: "1.4em" }}>
          {title}
        </span>
      )}
      <div
        className="w-100 position-relative center-child"
        style={{ height: "2em" }}
      >
        <input
          type="range"
          className={classNames(
            "form-range",
            styles.questionnaireSlider,
            "w-100"
          )}
          min={min}
          max={max}
          step={step}
          defaultValue={displayValue}
          onChange={(e) => {
            onChange(e.target.value);
            setSliderData(e.target.value);
          }}
        />
        <div
          className="w-100 position-absolute"
          style={{ top: "2em", right: "1em" }}
        >
          {range.map((value) => (
            <div
              style={{
                position: "absolute",
                left: `${100 * (value / (range.length - 1))}%`,
                bottom: "0.5em",
                width: "2em",
                height: "2em",
                borderRadius: "1em",
                backgroundColor: "white",
              }}
            />
          ))}
        </div>
      </div>
      <span
        className={`pt-4 pb-2 ${isPathwayQuestion ? "align-self-center" : ""}`}
        style={{ fontSize: "1.4em" }}
      >
        {sliderData}
        {plus && sliderData == max && "+"}
      </span>
    </div>
  );
}
