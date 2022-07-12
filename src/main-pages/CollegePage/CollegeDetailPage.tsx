import React from "react";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import styled from "styled-components";
import CollegeCard from "./components/CollegeCard";
import InfoContainer from "./components/InfoContainer";
import { Row, Col, Divider } from "antd";
import Script from "next/script";
import { width } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import IconBack from "../../../public/images/back_icon.svg"

const CollegeDetailPage = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const raw = router.query;
  const data = raw;
  console.log(raw);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const BackButton = styled.div`
    border-radius: 50%;
    box-shadow: 0px 0px 22px 9px rgba(0, 0, 0, 0.06);
    position: absolute;
    top: 100px;
    left: 50px;
  `;
  

  return (
    <Wrapper>
      <BackButton onClick={() => router.push(`/college/`)}>
        <IconBack/>
      </BackButton>
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></Script>
      <CollegeCard
        title={data.title}
        location={data.location}
        img="uw.png"
        schoolType={data["college_type"]}
        inState={data["in-state_tuition"]}
        outState={data["out-state_tuition"]}
        isDetail
        tabCallBack={handleChange}
        tabValue={value}
      />
      <CollegeInfoWrapper>
        {value == 0 ? (
          <div>
            {/* <InfoContainer>
                <h1>Introduction</h1>
                <p className="cl-mid-gray">
                  University of Washington is a public institution that was
                  founded in 1861. It has a total undergraduate enrollment of
                  35,582 (fall 2020), its setting is urban, and the campus size
                  is 634 acres. It utilizes a quarter-based academic calendar.
                  University of Washington's ranking in the 2022 edition of Best
                  Colleges is National Universities, #59. Its in-state tuition
                  and fees are $12,076; out-of-state tuition and fees are
                  $39,906. Located north of downtown Seattle, the University of
                  Washington is one of the oldest public universities on the
                  West Coast. It is also a cutting-edge research instituti...
                </p>
              </InfoContainer> */}
            <InfoContainer>
              <h1>General Information</h1>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <h2>Phone Number</h2>
                  <h3>206-543-2100</h3>
                </Col>
                <Col span={8}>
                  <h2>Address</h2>
                  <h3>{data["standard_address"]}</h3>
                </Col>
                <Col span={8}>
                  <h2>Homepage</h2>
                  <h3>
                    <a
                      href={`https://${data["institution_url"]}`}
                      target="_blank"
                      rel="noreferrer">
                      {data["institution_url"]}
                    </a>
                  </h3>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <h2>Setting</h2>
                  <h3>Urban</h3>
                </Col>
                <Col span={8}>
                  <h2>Region</h2>
                  <h3>North West</h3>
                </Col>
                <Col span={8}>
                  <h2>Religious Affiliation</h2>
                  <h3>None</h3>
                </Col>
              </Row>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <h2>In-State Tuition (2021)</h2>
                  <h3>{"$ " + data["in-state_tuition"]}</h3>
                </Col>
                <Col span={8}>
                  <h2>Out-of-State Tuition (2021)</h2>
                  <h3>{"$ " + data["out-state_tuition"]}</h3>
                </Col>
              </Row>
            </InfoContainer>
            {/* <InfoContainer>
                <h1>Location</h1>
              </InfoContainer> */}
          </div>
        ) : value == 1 ? (
          <InfoContainer>
            <h1>2022 Application Requirements</h1>
            <div className="inline">
              <p className="cl-dark-text">Application deadline</p>
              <h3 className="cl-dark-text">November 15</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">Application fee</p>
              <h3 className="cl-dark-text">$80</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">Accepts common app</p>
              <h3 className="cl-dark-text">Yes</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">Recommendation letters</p>
              <h3 className="cl-dark-text">Not used</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">SAT/ACT testing policy</p>
              <h3 className="cl-dark-text">Required</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">Application deadline</p>
              <h3 className="cl-dark-text">November 15</h3>
            </div>
            <Divider />
            <div className="inline">
              <p className="cl-dark-text">
                TOEFL policy (International appllicants)
              </p>
              <h3 className="cl-dark-text">95+</h3>
            </div>
          </InfoContainer>
        ) : value == 2 ? (
          <InfoContainer>
            <h1>Faculty & Class</h1>
            <Row>
              <div>
                <h2>Student to Faculty Ratio</h2>
                <h3>20:1</h3>
              </div>
              <div style={{ marginLeft: 50 }}>
                <h2>Calendar System</h2>
                <h3>Quarter</h3>
              </div>
            </Row>
            <Divider />
          </InfoContainer>
        ) : value == 3 ? (
          <></>
        ) : value == 4 ? (
          <InfoContainer>
            <h1>Student Ethnicity Ratio</h1>
            <Row>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                  <h2>White</h2>
                  <h3>0.3703</h3>
                </div>
                <div style={{ marginLeft: 50 }}>
                  <h2>Black</h2>
                  <h3>0.0301</h3>
                </div>
                <div style={{ marginLeft: 50 }}>
                  <h2>Hispanic</h2>
                  <h3>0.0892</h3>
                </div>
                <div style={{ marginLeft: 50 }}>
                  <h2>Asian</h2>
                  <h3>0.2575</h3>
                </div>
                <div style={{ marginLeft: 50 }}>
                  <h2>American Indian/Alaska Native</h2>
                  <h3>0.0041</h3>
                </div>
                <div style={{ marginLeft: 50 }}>
                  <h2>Native Hawaiian/Pacific Islander</h2>
                  <h3>0.0045</h3>
                </div>
                <div>
                  <h2>2 or More Races</h2>
                  <h3> 0.0762</h3>
                </div>
              </div>
              
            </Row>
            <Divider />
          </InfoContainer>
        ) : value == 5 ? (
          <></>
        ) : (
          <></>
        )}
      </CollegeInfoWrapper>
    </Wrapper>
  );
};
            
export default CollegeDetailPage;

const Wrapper = styled.div`
  & > * {
    margin: auto;
    display: block;
  }
`;

const CollegeInfoWrapper = styled.div`
  margin: auto;
  max-width: 1000px;

  & .inline {
    p {
      display: inline-block;
    }

    h3 {
      float: right;
      margin-left: auto;
      display: block;
    }
  }

  .ant-divider {
    margin: 0.5rem 0;
  }
`;
