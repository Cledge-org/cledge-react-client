import classNames from "classnames"
import { useState } from "react";

export interface SignUpTextInput {
  onChange?: Function,
  placeholder?: string,
  value: any,
  type?: string
  question?: string
}

export default function SignUpLongText(props: SignUpTextInput) {
  const [currValue, setCurrValue] = useState(props.value);
  return (
    <div
      className={classNames(
          `d-flex flex-column align-items-${
            "center"
          } justify-content-evenly w-100 cl-dark-text fw-bold my-3`,
        )}
      >
      <span className="cl-dark-text fw-bold mb-2" style={{ fontSize: "1.4em" }}>{props.question}</span>
        <div
          className={`d-flex flex-column justify-content-evenly align-items-${
             "center"
          } h-75 w-100`}
        >
          <textarea
            defaultValue={currValue}
            placeholder={props.placeholder}
            rows={8}
            onChange={(e) => {
              props.onChange(e.target.value);
              setCurrValue(e.target.value)
            }}
            value={currValue}
            className={`form-control cl-dark-text fw-bold`}
            style={{
              borderRadius: "10px",
              maxWidth: "40rem"

            }}
          />
        </div>
    </div>
  )
}