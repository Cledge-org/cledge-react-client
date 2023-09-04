import React from "react";
import cs from "classnames";
import styles from "./Splash.module.scss";
import { MainContainer, Heading } from "../styles";
import { Button } from "../../../../components/Button/Button";

interface Props {
  buttonHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode | React.ReactNode[] | undefined;
  classNames?: string;
}

function Splash({
  children = undefined,
  buttonHandler = () => { },
  classNames,
}: Props) {
  const content = {
    heading: "Get Your Personalized College List",
    subHeading:
      "Get a headstart this application season with a personalized college list to help you explore your best-fit, safety, fit, and reach colleges.",
  };
  return (
    <MainContainer className={cs(classNames)}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <Heading className={cs("cl-white")}>{content.heading}</Heading>
          <p className={styles.subHeading}>{content.subHeading}</p>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.newIcon}>New</div>
        </div>
      </div>
      <div className={styles.flexContainer}>
        <img src="/images/landing_search_tool.png" alt="more info" />
        <Button
          color="#F7BC76"
          fixedWidth={false}
          className={cs(styles.tryNow)}
          onClick={buttonHandler}
        >
          Try Now
        </Button>
      </div>
      {children}
    </MainContainer>
  );
}

export default Splash;
