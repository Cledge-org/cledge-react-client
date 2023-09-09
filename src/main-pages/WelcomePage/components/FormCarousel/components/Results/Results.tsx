import React from "react";
import cs from "classnames";
import styles from "./Results.module.scss";
import { MainContainer, Heading } from "../styles";
import { Button } from "../../../Button/Button";

interface Props {
  classNames?: string;
  schools: string[][];
}

function Results({ classNames, schools }: Props) {
  const content = {
    heading: "Here are some schools that fit your needs:",
  };
  return (
    <MainContainer
      flexDirection={"column"}
      gap={"20px"}
      className={cs(classNames)}
    >
      <div className={styles.flexContainer}>
        <div className={styles.flexItem}>
          <Heading>{content.heading}</Heading>
        </div>
        {schools.map((school) => (
          <div className={styles.flexItem}>
            <div className={styles.schoolCard}>
              <img src={school[1]} alt="school" />
              <span className={styles.title}>{school[0]}</span>
              <span className={styles.subtitle}>
                {school[2]} School | {school[3]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        color="#F7BC76"
        fixedWidth={false}
        className={cs(styles.signUpButton, "bg-cl-orange")}
        onClick={() => {}}
      >
        Sign Up to View More!
      </Button>
    </MainContainer>
  );
}

export default Results;
