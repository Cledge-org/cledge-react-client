import React from "react";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import styled from "styled-components";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import InfoContainer from "./components/InfoContainer/InfoContainer";
import { Row, Col, Divider } from "antd";
import Script from "next/script";
import { width } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OverviewCard from "src/main-pages/CollegePage/components/OverviewCard";

const CollegeDetailPage = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const raw = router.query.data;
  const data = JSON.parse(raw.toString());
  console.log(data);

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
        <IconButton aria-label="delete" size="large">
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
      </BackButton>
      <Script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></Script>
      <CollegeCard
        title={data.title}
        location={data.location}
        img={data["img_link"] ? data["img_link"] : data["img_wiki_link"]}
        schoolType={data["college_type"]}
        inState={data["in-state_tuition"]}
        outState={data["out-state_tuition"]}
        isDetail
        tabCallBack={handleChange}
        tabValue={value}
      />
      <CollegeInfoWrapper>
        {value == 0 ? (
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <InfoContainer>
                <div>
                  <h2>Phone Number</h2>
                  <h5>{data["contact_phone_num"]}</h5>
                </div>
                <div>
                  <h2>Address</h2>
                  <h5>{data["standard_address"]}</h5>
                </div>
                <div>
                  <h2>Homepage</h2>
                  <h5>
                    <a
                      href={`https://${data["institution_url"]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {data["institution_url"]}
                    </a>
                  </h5>
                </div>
                <div>
                  <h2>Region</h2>
                  <h5>{data["location"]}</h5>
                </div>
                <div>
                  <h2>Setting</h2>
                  <h5>Urban</h5>
                </div>
              </InfoContainer>
              <InfoContainer>
                <div>
                  <h2>Institutional Category</h2>
                  <h5>{data["instituional_category"]}</h5>
                </div>
                <div>
                  <h2>Land Grant Institution</h2>
                  <h5>
                    {data["land_grant_institution?"] ===
                    "Land Grant Institution"
                      ? "Yes"
                      : "No"}
                  </h5>
                </div>
              </InfoContainer>
            </Col>
            <Col span={16}>
              <OverviewCard
                title="Admissions"
                sub1="Acceptance rate"
                sub1data={
                  data["acceptance_rate"]["acceptance_rate_total"] * 100 + "%"
                }
                sub2="Total number of applicants/year"
                sub2data={data["applicants_per_year"]}
                sub3="Application deadline"
                sub3data="No Data"
                sub4="Matriculation rate"
                sub4data={data["matriculation_rate"]}
              />
              <OverviewCard
                title="Academics"
                sub1="Honors program"
                sub1data="No Data"
                sub2="Calendar system"
                sub2data={data["calendar_system"]}
                sub3="Average GPA"
                sub3data="No Data"
                sub4="Most popular major"
                sub4data="No Data"
              />
              <OverviewCard
                title="Finance"
                sub1="Average resident cost of living"
                sub1data={
                  "$ " + data["estimate_cost_in_state_living_off_campus"]
                }
                sub2="In state tuition"
                sub2data={"$ " + data["in-state_tuition"]}
                sub3="Average non-resident total cost"
                sub3data={
                  "$ " + data["estimate_cost_out_state_living_off_campus"]
                }
                sub4="Out of state tuition"
                sub4data={"$ " + data["out-state_tuition"]}
              />
              <OverviewCard
                title="Students"
                sub1="Student faculty ratio"
                sub1data={data["student_faculty_ratio"] + " : 1"}
                sub2="4 year graduation rate"
                sub2data={data["4_year_graduation_rate"] * 100 + "%"}
                sub3="Retention rate"
                sub3data={
                  Math.round(data["retention_rate_4_years"] * 100) + "%"
                }
                sub4="Total enrollment"
                sub4data={
                  data["enrollment"]["total_undergrad"] +
                  data["enrollment"]["total_grad"]
                }
              />
            </Col>

            {/* <InfoContainer>
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
            </InfoContainer> */}
          </Row>
        ) : value == 1 ? (
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <InfoContainer>
                <h1>Application Information</h1>
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
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Application Conditions</h1>
                <div className="inline">
                  <p className="cl-dark-text">Highschool GPA</p>
                  <h3 className="cl-dark-text">Required</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool Rank</p>
                  <h3 className="cl-dark-text">Not Required</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool Record</p>
                  <h3 className="cl-dark-text">Recommended</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">SAT</p>
                  <h3 className="cl-dark-text">Recommended</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ACT</p>
                  <h3 className="cl-dark-text">Recommended</h3>
                </div>
              </InfoContainer>
            </Col>
          </Row>
        ) : value == 2 ? (
          <Row gutter={[16, 16]}>
            <Col span={15}>
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
            </Col>
            <Col span={9}>
              <InfoContainer></InfoContainer>
            </Col>
          </Row>
        ) : value == 3 ? (
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <InfoContainer></InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer></InfoContainer>
            </Col>
          </Row>
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
