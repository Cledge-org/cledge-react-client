import { useState } from "react";
import palette from "src/common/styles/palette.module.scss";
import styles from "./signupMCQ.module.scss";
import { maxWidth } from "@mui/system";

export interface SignUpShortText {
  question: string
  placeholder?: string
  onChange?: Function
  value: any
  type?: string
}

export default function SignUpShortText(props: SignUpShortText) {
  const [currValue, setCurrValue] = useState(props.value);

  return (
    <div
    >
      <div className="w-100 my-2">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-start w-100" style={{ maxWidth: "40rem" }}>
            <span className="cl-dark-text fw-bold my-3" style={{ fontSize: "1.4em" }}>{props.question}</span>
          </div>
          <input 
            className="form-control cl-dark-text fw-bold"
            type={props.type ? props.type : "text"} 
            style={{ width: "100%", marginBottom: "5px", height: "3.5rem", maxWidth: "40rem", borderRadius: "10px" }}
            onChange={
              (e) => {
                setCurrValue(e.target.value);
                props.onChange(e.target.value);
              }
            }
            value={props.value}
          >
          </input>
        </div>
      </div>
    </div>
  );
}