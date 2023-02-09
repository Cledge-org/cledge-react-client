import React from "react";
import InfoContainer from "../../../CollegePage/components/InfoContainer/InfoContainer";
import { Row, Col, Divider } from "antd";
import "antd/dist/antd.css";

interface CardProps {
  title: string;
  sub1: string;
  sub1data: string | number | Function;
  sub2: string;
  sub2data: string | number | Function;
  sub3: string;
  sub3data: string | number | Function;
  sub4: string;
  sub4data: string | number | Function;
  elNum: number;
}

function Card(props: CardProps) {
  const rows = [];
  for (let i = 1; i <= props.elNum; i++) {
    rows.push(
      <>
        <div className="inline">
          <p className="cl-dark-text">{props["sub" + i]}</p>
          <h3 className="cl-dark-text">
            {props["sub" + i + "data"] ? props["sub" + i + "data"] : "No Data"}
          </h3>
        </div>
        {i == props.elNum ? "" : <Divider />}
      </>
    );
  }

  return (
    <InfoContainer>
      <h1>{props.title}</h1>
      <div>{rows}</div>
    </InfoContainer>
  );
}

export default Card;