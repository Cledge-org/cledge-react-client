import { useState } from "react";
import palette from "src/common/styles/palette.module.scss";
import styles from "./signupMCQ.module.scss";
import { maxWidth } from "@mui/system";

export interface SignUpMCQProps {
  questionData: SignUpMCQInput
  onChange?: Function
  selected?: any
}

export interface SignUpMCQInput {
  question: string,
  options: SignUpMCQOption[]
}

interface SignUpMCQOption {
  optionText: string,
  optionValue: any
}

export default function SignUpMCQ(props: SignUpMCQProps) {
  const [selectedOption, setSelectedOption] = useState(props.questionData.options.find(e => e.optionValue == props.selected));

  const handleOptionSelect = (option: SignUpMCQOption) => {
    setSelectedOption(option);
    props.onChange(option);
  }

  return (
    <div
    >
      <div className="w-100 my-2">
        <div className="d-flex flex-column justify-content-center align-items-center">
        <span className="cl-dark-text fw-bold my-3" style={{ fontSize: "1.4em" }}>{props.questionData.question}</span>
          {props.questionData.options.map((option, index) => (
            <button 
              key={index} 
              className={(selectedOption == option.optionValue) ? styles.mcqAnswerBtnSelected : styles.mcqAnswerBtn}  
              style={{ width: "100%", margin: "5px", height: "3.5rem", maxWidth: "30rem" }}
              onClick={
                () => {
                  handleOptionSelect(option.optionValue)
                }
              }
            >
              <div className="d-flex flex-row mx-3">
                <div
                    className="center-child me-2"
                    style={{
                      minWidth: "22px",
                      minHeight: "22px",
                      backgroundColor: "white",
                      border: `1px solid ${
                        (
                          selectedOption == option.optionValue
                        )
                          ? palette.clBlue
                          : palette.clLightGray
                      }`,
                      borderRadius: "12px",
                    }}
                  >
                    {selectedOption == option.optionValue ? (<div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "5px",
                          backgroundColor: "#2651ed",
                        }}
                    />) : null}
                </div>
                {option.optionText}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}