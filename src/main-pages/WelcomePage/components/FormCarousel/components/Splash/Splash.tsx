import React from "react";
import cs from "classnames";
import styles from "./Splash.module.scss";
import { MainContainer, Heading } from "../styles";
import { Button } from "../../../Button/Button";
import { useWindowSize } from "src/utils/hooks/useWindowSize";

interface Props {
  buttonHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: string;
}

function Splash({ buttonHandler = () => {}, classNames }: Props) {
  const { width, height } = useWindowSize();
  const isMobile = width <= 810;
  const content = {
    heading: "Get Your Personalized College List",
    subHeading: isMobile
      ? ""
      : "Get a headstart this application season with a personalized college list to help you explore your best-fit, safety, fit, and reach colleges.",
  };
  return (
    <MainContainer
      gap={isMobile ? "0" : "70px"}
      flexDirection={isMobile ? "column" : "row"}
      className={cs(classNames)}
    >
      <div className={cs(styles.flexContainer, styles.left)}>
        <div className={styles.icon}>
          <div className={styles.newIcon}>New</div>
        </div>
        <div className={styles.text}>
          <Heading className={cs("cl-white")}>{content.heading}</Heading>
          <p className={styles.subHeading}>{content.subHeading}</p>
        </div>
        {!isMobile && <div className={styles.button}>
          <Button
            color="#F7BC76"
            fixedWidth={false}
            className={cs(styles.tryNow)}
            onClick={buttonHandler}
          >
            Try Now
          </Button>
        </div>}
      </div>
      <div className={cs(styles.right)}>
        <img src="/images/landing_search_tool.png" alt="more info" />
        {isMobile && <div className={styles.button}>
          <Button
            color="#F7BC76"
            fixedWidth={false}
            className={cs(styles.tryNow)}
            onClick={buttonHandler}
          >
            Try Now
          </Button>
        </div>}
      </div>
    </MainContainer>
  );
}

export default Splash;
