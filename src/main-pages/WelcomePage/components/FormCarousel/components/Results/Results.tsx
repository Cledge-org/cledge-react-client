import React from "react";
import cs from 'classnames';
import styles from "./Results.module.scss";
import { MainContainer, Heading } from "../styles";
import { Button } from "../../../Button/Button";

interface Props {
  classNames?: string;
}

function Results({
  classNames,
}: Props) {
  const content = {
    heading: "Here are some schools that fit your needs:",
  }
  return (
    <MainContainer flexDirection={'column'} gap={"20px"} className={cs(classNames)}>
      <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <Heading>{content.heading}</Heading>
        </div>
        <img className={styles.flexItem} />
        <img className={styles.flexItem} />
      </div>
      <Button
      color="#F7BC76"
      fixedWidth={false}
      className={cs(styles.signUpButton, "bg-cl-orange")}
      onClick={() => {}}
    >
   Sign Up to View More!</Button>
    </MainContainer>
  );
}

export default Results;
