import React from "react";
import styled from "styled-components";
import cs from 'classnames';
import styles from './Splash.module.scss';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 60px;
  gap: 70px;
  justify-content: space-between;
  align-items: center;
  /* Card boarder */
  /* Shadow large */
  :hover {
    cursor: pointer;
  }
  box-shadow: 0px 2px 22px 9px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  `;


interface Props {
  buttonHandler?: () => void;
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
    subHeading: "Get a headstart this application season with a personalized college list to help you explore your best-fit, safety, fit, and reach colleges."
  }
  return (
    <MainContainer className={cs(classNames)}>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <h1 className={cs(styles.heading,"cl-white")}>{content.heading}</h1>
          <p className={styles.subHeading}>{content.subHeading}</p>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.newIcon}>New</div>
        </div>
      </div>
      <div className={styles.flexContainer}>
          <img src="/images/landing_search_tool.png" alt="more info" />
        <button className={cs(styles.signUpButton, "bg-cl-orange")} color="orange" onClick={buttonHandler}>Try Now</button>
      </div>
      {children}
    </MainContainer>
  );
}

export default Splash;