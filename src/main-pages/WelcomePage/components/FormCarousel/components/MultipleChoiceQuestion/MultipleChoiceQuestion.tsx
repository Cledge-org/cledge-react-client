import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import cs from 'classnames';
import styles from "./MultipleChoiceQuestion.module.scss";
import Image from "next/image";
import { MainContainer, Heading } from "../styles";
import preventDefault from "src/utils/js/preventDefault";
import { UnMappedValues } from "src/ClientSideFunctions/getQuestionMappings";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

const OptionsContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-basis: 80%;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 810px) {
    justify-content:start;
    width: 100%;
  }
`;
const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer !important;
  & * {
    cursor: pointer !important;
  }
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
  _id: string;
  answers?: {
    op: string;
    tag: string;
  }[];
  handler?: (e: UnMappedValues) => void;
  classNames?: string;
}

function MultipleChoiceQuestion({
  question,
  answers: options,
  classNames,
  _id,
  handler: handler = () => { },
}: Props) {
  const router = useRouter();
  const [selected, setSelected] = React.useState('');
  const handleInput = (value: string) => {
    setSelected(value);
    handler({ [_id]: value });
  }
  const { width, height } = useWindowSize();
  const isMobile = width <= 810;
  return (
    <MainContainer className={cs(classNames)} flexDirection={isMobile ? "column" : "row"} alignItems={isMobile ? "center" : "start"}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <Heading className="cl-white">{question}</Heading>
        </div>
        <div className={styles.gridItem}>
          <button onClick={preventDefault} className={styles.infoButton}>
            <Image layout="fill" src="/icons/info.svg" alt="more info" />
          </button>
        </div>
      </div>
      {options.length > 0 && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionContainer
              key={option.tag}
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
    </MainContainer>
  );
}

export default MultipleChoiceQuestion;
