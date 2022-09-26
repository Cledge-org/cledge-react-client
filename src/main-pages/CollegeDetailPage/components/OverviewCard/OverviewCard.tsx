import React from "react";
import InfoContainer from "../../../CollegePage/components/InfoContainer/InfoContainer";
import { Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import { RiTruckLine } from "react-icons/ri";

interface CardProps {
  title: string;
  sub1: string;
  sub1data: string | number;
  sub2: string;
  sub2data: string | number;
  sub3: string;
  sub3data: string | number;
  sub4: string;
  sub4data: string | number;
  elNum: number;
  isOverview?: boolean;
}

function OverviewCard(props) {
  const cols = [];
  for (let i = 1; i <= props.elNum; i++) {
    cols.push(
      <Col span={12}>
        <h2>{props["sub" + i]}</h2>
        <h3>
          {props["sub" + i + "data"] ? props["sub" + i + "data"] : "No Data"}
        </h3>
      </Col>
    );
  }

  return (
    <InfoContainer isOverview={true}>
      <h1>{props.title}</h1>
      {props.isOverview ? <Divider></Divider> : <></>}
      <Row gutter={[16, 16]}>{cols}</Row>
    </InfoContainer>
  );
}

export default OverviewCard;
