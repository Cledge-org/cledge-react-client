import React from "react";
import cs from 'classnames';
import styles from "./FitSchools.module.scss";
import { MainContainer,Heading } from "../styles";

interface Props {
  classNames?: string;
}

function FitSchools({
  classNames,
}: Props) {
   const content = {
      heading: "Here are some schools that fit your needs:",
   }
  return (
    <MainContainer flexDirection="column" className={cs(classNames)}>
      <div className={styles.flexContainer}>
      <div className={styles.flexItem}>
         <Heading>{content.heading}</Heading>
      </div>
      <div className={styles.flexItem}>
        <img />
      </div>
      <button className={cs(styles.signUpButton, "bg-cl-orange")}>Sign Up to View More!</button>
      </div>
    </MainContainer>
  );
}

export default FitSchools;
