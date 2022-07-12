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
import DataRow from "./components/DataRow/DataRow";

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
                isOverview={true}
                elNum={4}
                title="Admissions"
                sub1="Acceptance rate"
                sub1data={
                  Math.round(
                    data["acceptance_rate"]["acceptance_rate_total"] * 100
                  ) + "%"
                }
                sub2="Total number of applicants/year"
                sub2data={data["applicants_per_year"]}
                sub3="Application deadline"
                sub3data="No Data"
                sub4="Matriculation rate"
                sub4data={data["matriculation_rate"]}
              />
              <OverviewCard
                isOverview={true}
                elNum={4}
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
                isOverview={true}
                elNum={4}
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
                isOverview={true}
                elNum={4}
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
          </Row>
        ) : value == 1 ? (
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <InfoContainer>
                <h1>Admission Requirements</h1>
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
                  <p className="cl-dark-text">Highschool GPA</p>
                  <h3 className="cl-dark-text">Not used</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool rank</p>
                  <h3 className="cl-dark-text">Required</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool record</p>
                  <h3 className="cl-dark-text">November 15</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p>SAT/ACT</p>
                  <h3>November 15</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">
                    TOEFL policy (International appllicants)
                  </p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>SAT Score Data (Admitted Students)</h1>
                <DataRow
                  colNum={3}
                  sub1="Section"
                  sub2="25th percentile"
                  sub3="75th percentile"
                />
                <DataRow
                  colNum={3}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Reading"
                  sub2="2"
                  sub3="3"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Math"
                  sub2="2"
                  sub3="3"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Writing"
                  sub2="2"
                  sub3="3"
                  type="content"
                />
              </InfoContainer>
              <InfoContainer>
                <h1>ACT Score Data (Admitted Students)</h1>
                <DataRow
                  colNum={3}
                  sub1="Section"
                  sub2="25th percentile"
                  sub3="75th percentile"
                />
                <DataRow
                  colNum={3}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  type="content"
                />
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Admission Rate</h1>
                <div>
                  <h2>Overall acceptance rate</h2>
                  <h3>1</h3>
                </div>
                <div>
                  <h2>Female acceptance rate</h2>
                  <h3>1</h3>
                </div>
                <div>
                  <h2>Male acceptance rate</h2>
                  <h3>1</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Commit Rate</h1>
                <div>
                  <h2>Female commit rate</h2>
                  <h3>1</h3>
                </div>
                <div>
                  <h2>Male commit rate</h2>
                  <h3>1</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Enrollment Rate</h1>
                <div>
                  <h2>Female enrollment rate</h2>
                  <h3>1</h3>
                </div>
                <div>
                  <h2>Male enrollment rate</h2>
                  <h3>1</h3>
                </div>
              </InfoContainer>
            </Col>
          </Row>
        ) : value == 2 ? (
          <Row gutter={[16, 16]} justify="space-evenly">
            <Col span={12}>
              <InfoContainer>
                <h1>Academic Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">4-year graduation rate</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">6-year graduation rate</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
            </Col>
            <Col span={12}>
              <InfoContainer>
                <h1>Academic Offerings</h1>
                <div className="inline">
                  <p className="cl-dark-text">Study abroad</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Land grant institution</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
            </Col>
          </Row>
        ) : value == 3 ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <InfoContainer>
                <h1>Total Costs</h1>
                <Row>
                  <Col span={8}>
                    <h2>In-State Tuition</h2>
                    <h3>1</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Out-Of-State Tuition</h2>
                    <h3>1</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Average Room and Board Cost</h2>
                    <h3></h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h2>Total In-State Tuition</h2>
                    <h3></h3>
                  </Col>
                  <Col span={8}>
                    <h2>Total Out-Of-State Tuition</h2>
                    <h3></h3>
                  </Col>
                  <Col span={8}>
                    <h2></h2>
                    <h3></h3>
                  </Col>
                </Row>
              </InfoContainer>
            </Col>
            <Col span={15}>
              <InfoContainer>
                <h1>Financial Aid Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Average Grant/Scolarship and Net Price</h1>
                <DataRow
                  colNum={4}
                  sub1="Income Level"
                  sub2="Median Debt"
                  sub3="Average Grange"
                  sub4="Net Price"
                />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="Overall average"
                  sub2="2"
                  sub3="3"
                  sub4="4"
                  type="content"
                />
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Student Body Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Average Salary</h1>
                <h2>10 years after graduation</h2>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <br />
                <h2>6 years after graduation</h2>
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
              </InfoContainer>
            </Col>
          </Row>
        ) : value == 4 ? (
          <Row gutter={[16, 16]}>
            <Col span={15}>
              <OverviewCard
                isOverview={true}
                elNum={10}
                title="Student Body Statistics"
                sub1="Total Undergraduate Enrollment"
                sub1data={data["student_faculty_ratio"] + " : 1"}
                sub2="Enrolled First-Year Students"
                sub2data={data["4_year_graduation_rate"] * 100 + "%"}
                sub3="Percent In-State"
                sub3data={
                  Math.round(data["retention_rate_4_years"] * 100) + "%"
                }
                sub4="Retention Rate"
                sub4data={
                  data["enrollment"]["total_undergrad"] +
                  data["enrollment"]["total_grad"]
                }
                sub5="Percent Out-Of State"
                sub5data={1}
                sub6="4-Year Graduation Rate"
                sub6data={1}
                sub7="Percent First-Gen Students"
                sub7data={1}
                sub8="6-Year Graduation Rate"
                sub8data={1}
                sub9="Student Faculty Ratio"
                sub9data="1"
                sub10="Admission Policy"
                sub10data="1"
              />
              <InfoContainer>
                <h1>Faculty Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">Total Instructional Staff</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Total Male Staff</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Total Female Staff</p>
                  <h3 className="cl-dark-text">Total Research Staff</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Atheletics</h1>
                <div className="inline">
                  <p className="cl-dark-text">NCAA Member</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Football</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Basketball</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Track</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Baseball</p>
                  <h3 className="cl-dark-text">95+</h3>
                </div>
                <Divider />
              </InfoContainer>
            </Col>
          </Row>
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
            margin: 0;
        }

  & .inline {
    p {
      display: inline-block;
    }

    h3 {
      float: right;
      margin-left: auto;
      display: block;
    }
`;
