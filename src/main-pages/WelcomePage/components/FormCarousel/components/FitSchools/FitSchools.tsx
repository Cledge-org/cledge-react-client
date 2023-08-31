import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import cs from 'classnames';
import styles from "./MultipleChoiceQuestion.module.scss";
import Image from "next/image";
import { MainContainer,Heading } from "../styles";

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

function FitSchools({
  children = undefined,
  classNames,
}: Props) {
   const content = {
      heading: "Here are some schools that fit your needs:",
   }
  return (
    <MainContainer className={cs(classNames)}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
         <Heading>{content.heading}</Heading>
        </div>
        <div className={styles.gridItem}>
          <button className={styles.infoButton}>
            <Image layout="fill" src="/icons/info.svg" alt="more info" />
          </button>
        </div>
      </div>
      {children}
    </MainContainer>
  );
}

export default FitSchools;
