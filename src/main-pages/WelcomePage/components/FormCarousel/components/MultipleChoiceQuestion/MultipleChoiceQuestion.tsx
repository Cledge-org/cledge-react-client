import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import cs from 'classnames';
import styles from "./MultipleChoiceQuestion.module.scss";
import Image from "next/image";
import { MainContainer,Heading } from "../styles";

const OptionsContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-basis: 50%;
  flex-direction: column;
  justify-content:center;
  gap: 20px;
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 10px;
  input[type="radio"] {
    width: auto;
  }
  h1{
    color:unset;
    font-size:unset;
    line-height:unset;
  }
`;
const OptionRadio = styled.input.attrs({ type: "radio" })`
  margin-right: 10px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  question: string;
  answers?: {
    op: string;
    tag: string;
  }[];
  inputHandler?: (e: string) => void;
  children?: React.ReactNode | React.ReactNode[] | undefined;
  classNames?: string;
}

function MultipleChoiceQuestion({
  question,
  answers: options,
  children = undefined,
  classNames,
  inputHandler = () => { },
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = React.useState(options[0].tag);
  const handleInput = (value: string) => {
    setSelected(value);
    inputHandler(value);
  }
  return (
    <MainContainer className={cs(classNames)}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <Heading className="cl-white">{question}</Heading>
        </div>
        <div className={styles.gridItem}>
          <button className={styles.infoButton}>
            <Image layout="fill" src="/icons/info.svg" alt="more info" />
          </button>
        </div>
      </div>
      {options.length > 0 && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionContainer
              className={
                selected === option.tag ? "bg-cl-orange" : "bg-cl-white"
              }
              onClick={() => {
                handleInput(option.tag);
              }}
            >
              <OptionRadio
                type="radio"
                value={option.tag}
                key={option.tag}
                checked={selected === option.tag}
                onChange={(e) => {
                  handleInput(e.target.value);
                }}
              />
              <OptionLabel>{option.op}</OptionLabel>
            </OptionContainer>
          ))}
        </OptionsContainer>
      )}
      {children}
    </MainContainer>
  );
}

export default MultipleChoiceQuestion;
