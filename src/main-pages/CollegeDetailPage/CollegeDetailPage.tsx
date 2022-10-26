import React from "react";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import InfoContainer from "../CollegePage/components/InfoContainer/InfoContainer";
import { Row, Col, Divider, Collapse } from "antd";
import { Tabs, Tab } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RoomIcon from "@mui/icons-material/Room";
import OverviewCard from "src/main-pages/CollegeDetailPage/components/OverviewCard/OverviewCard";
import DataRow from "./components/DataRow/DataRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { connect } from "react-redux";
import styles from "./college-detail-page.module.scss";
import classNames from "classnames";
import { Map, Marker, ZoomControl } from "pigeon-maps";

const CollegeDetailPage = ({
  questionResponses,
}: {
  questionResponses: UserResponse[];
}) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const raw = router.query.data;
  const data = JSON.parse(raw.toString());
  const { Panel } = Collapse;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const userResponse = questionResponses.find(
    ({ questionId }) => questionId == "627e8fe7e97c3c14537dc7f5"
  )?.response;

  const userTier = userResponse.includes("Level 1")
    ? 1
    : userResponse.includes("Level 2")
    ? 2
    : 3;

  // *********************Data Parsing Functions*******************
  function parsePercent(data) {
    if (data) {
      return Math.round(data * 100) + "%";
    } else return "No Data";
  }

  function parseAmount(data) {
    if (data) {
      return "$ " + data.toLocaleString("en-US");
    } else return "No Data";
  }

  function parseYesNo(data, word) {
    if (data) {
      if (data == word) {
        return <CheckCircleIcon style={{ color: "#2651ED" }} />;
      } else {
        return <CancelIcon style={{ color: "#ef3f2b" }} />;
      }
    } else {
      return "No Data";
    }
  }

  function parseNumber(data) {
    if (data) {
      return data.toLocaleString("en-US");
    }
    return "No data";
  }

  function parse(data) {
    return data ? data : "No data";
  }

  // ********************Chart/Map Data*******************************
  const ethnicityData = [
    data["student_ethnicity_ratio"]["asian"] +
      data["student_ethnicity_ratio"]["native_hawaiian_or_pacific_islander"],
    data["student_ethnicity_ratio"]["black_african_american"],
    data["student_ethnicity_ratio"]["hispanic_or_latino"],
    data["student_ethnicity_ratio"]["american_indian_or_alaska_native"],
    data["student_ethnicity_ratio"]["unknown"] +
      data["student_ethnicity_ratio"]["non_resident_aliens"] +
      data["student_ethnicity_ratio"]["two_or_more_races"],
    data["student_ethnicity_ratio"]["white"]
      ? data["student_ethnicity_ratio"]["white"]
      : 1 -
        (data["student_ethnicity_ratio"]["asian"] +
          data["student_ethnicity_ratio"][
            "native_hawaiian_or_pacific_islander"
          ] +
          data["student_ethnicity_ratio"]["black_african_american"] +
          data["student_ethnicity_ratio"]["hispanic_or_latino"] +
          data["student_ethnicity_ratio"]["american_indian_or_alaska_native"] +
          data["student_ethnicity_ratio"]["unknown"] +
          data["student_ethnicity_ratio"]["non_resident_aliens"] +
          data["student_ethnicity_ratio"]["two_or_more_races"]),
  ];

  const ethnicityChartData = {
    labels: [
      "Asian and Pacific Islander",
      "African American",
      "Hispanic",
      "Native American",
      "Other",
      "White",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: ethnicityData,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderColor: "white",
        borderWidth: 1,
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label;
              let value = context.formattedValue;

              if (!label) label = "Unknown";

              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });

              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return label + ": " + percentage;
            },
          },
        },
      },
    ],
  };

  const genderData = [data["grand_total_men"], data["grand_total_women"]];

  const genderChartData = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "Number",
        data: genderData,
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderColor: "white",
        borderWidth: 1,
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.label;
              let index = context.dataIndex;
              let value = context.dataset.data[index];

              if (!label) label = "Unknown";

              let sum = 0;
              let dataArr = context.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += Number(data);
              });

              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return label + ": " + percentage;
            },
          },
        },
      },
    ],
  };

  //***************Page Content *************/
  return (
    <Wrapper>
      <div
        className="position-absolute"
        style={{ left: "8%", top: "10%" }}
        onClick={() => router.push(`/college/`)}>
        <IconButton
          style={{ backgroundColor: "white" }}
          aria-label="delete"
          size="large">
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div
        className="w-100 d-flex flex-column align-items-center justify-content-end"
        style={{ backgroundColor: "#FBFCFF", height: "25vh" }}>
        <div className="h-100 d-flex flex-column justify-content-between">
          <div className="mt-5">
            <h1
              className="cl-dark-text mb-3"
              style={{
                fontSize: "1.9rem",
                fontWeight: 700,
                marginBottom: 5,
              }}>
              {data.title}
            </h1>
            <div className="w-50 d-flex flex-row align-items-center">
              <div className={styles.collegeFitContainer}>
                {userTier >= data["college_fit_metric"].safety
                  ? "Safety School"
                  : userTier < data["college_fit_metric"].target
                  ? "Reach School"
                  : "Fit School"}
              </div>
              <h6
                className="text-secondary ms-3"
                style={{ fontSize: "1.2em", marginBottom: 0 }}>
                {data["college_type"] == "Public"
                  ? "Public School | "
                  : data["college_type"] == "Private for-profit" ||
                    "Private non-profit"
                  ? "Private School | "
                  : ""}
                <span style={{ marginLeft: 5 }}>{data.location}</span>
              </h6>
            </div>
          </div>
          <Tabs value={value} onChange={handleChange}>
            <Tab className="me-5" label="Overview" />
            <Tab className="mx-5" label="Admission" />
            <Tab className="mx-5" label="Academics" />
            <Tab className="mx-5" label="Financials" />
            <Tab className="ms-5" label="Student" />
            {/* <Tab label="Insights" /> */}
          </Tabs>
        </div>
      </div>
      <CollegeInfoWrapper>
        {value == 0 ? (
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div
                style={{
                  boxShadow: "0px 0px 22px 9px rgba(0, 0, 0, 0.03)",
                  borderRadius: "12px",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                  overflow: "hidden",
                  border: "1px solid #e0dfe8",
                }}>
                <img
                  style={{ width: "100%" }}
                  src={
                    data["img_link"] ? data["img_link"] : data["img_wiki_link"]
                  }
                />
              </div>
              <InfoContainer>
                <div>
                  <h2>Phone Number</h2>
                  <h3>{data["contact_phone_num"]}</h3>
                </div>
                <div>
                  <h2>Address</h2>
                  <h3>{data["standard_address"]}</h3>
                </div>
                <div>
                  <h2>Homepage</h2>
                  <h3>
                    <a
                      href={`https://${data["institution_url"]}`}
                      target="_blank"
                      rel="noreferrer"
                      className={classNames("cl-blue", styles.linkWrapping)}>
                      {data["institution_url"]}
                    </a>
                  </h3>
                </div>
                <div>
                  <h2>Institutional Category</h2>
                  <h3>{data["instituional_category"]}</h3>
                </div>
                <div>
                  <h2>Institution Size</h2>
                  <h3>{data["inst_size"]}</h3>
                </div>
                <div>
                  <h2>Religious Affiliation</h2>
                  <h3>
                    {data["religious_affiliation"]
                      ? data["religious_affiliation"]
                      : "No Data"}
                  </h3>
                </div>
              </InfoContainer>
              {data["coordinates"]["latitude"] &&
              data["coordinates"]["longitude"] ? (
                <div className="rounded">
                  <Map
                    height={300}
                    defaultCenter={[
                      data["coordinates"]["latitude"],
                      data["coordinates"]["longitude"],
                    ]}
                    attribution={false}
                    defaultZoom={10}>
                    <ZoomControl />
                    <Marker
                      width={40}
                      color={"#415EE6"}
                      anchor={[
                        data["coordinates"]["latitude"],
                        data["coordinates"]["longitude"],
                      ]}
                    />
                  </Map>
                </div>
              ) : (
                <></>
              )}
              {data["mission_statement"] ? (
                <InfoContainer>
                  <h3>Mission Statement</h3>
                  <h2 className={styles.linkWrapping}>
                    {data["mission_statement"]}
                  </h2>
                </InfoContainer>
              ) : (
                <></>
              )}
            </Col>
            <Col span={16}>
              <OverviewCard
                isOverview={true}
                elNum={4}
                title="Admissions"
                sub1="Acceptance rate"
                sub1data={parsePercent(
                  data["acceptance_rate"]["acceptance_rate_total"]
                )}
                sub2="Total number of applicants/year"
                sub2data={data["applicants_per_year"]}
                sub3="Application Fee"
                sub3data={parseAmount(data["application_fee"])}
                sub4="Matriculation rate"
                sub4data={parsePercent(data["matriculation_rate"])}
              />
              <OverviewCard
                isOverview={true}
                elNum={4}
                title="Academics"
                sub1="4 year graduation rate"
                sub1data={parsePercent(data["4_year_graduation_rate"])}
                sub2="Calendar system"
                sub2data={data["calendar_system"]}
                sub3="Average GPA"
                sub3data={data["applicants_per_year"]}
                sub4="Most popular Area of Study"
                sub4data={(() => {
                  let d = data["study_disciplines"];
                  if (!d) {
                    return "No Data";
                  }
                  let mostPopularArea = Object.keys(d).reduce(function (a, b) {
                    return d[a] > d[b] ? a : b;
                  });
                  return mostPopularArea ? mostPopularArea : "No Data";
                })()}
              />
              <OverviewCard
                isOverview={true}
                elNum={4}
                title="Finance"
                sub1="Average resident cost of living"
                sub1data={parseAmount(
                  data["estimate_cost_in_state_living_off_campus"]
                )}
                sub2="In state tuition"
                sub2data={parseAmount(data["estimate_tuition_in_state"])}
                sub3="Average non-resident total cost"
                sub3data={parseAmount(
                  data["estimate_cost_out_state_living_off_campus"]
                )}
                sub4="Out of state tuition"
                sub4data={parseAmount(data["out-state_tuition"])}
              />
              <OverviewCard
                isOverview={true}
                elNum={4}
                title="Students"
                sub1="Student faculty ratio"
                sub1data={data["student_faculty_ratio"] + " : 1"}
                sub2="4 year graduation rate"
                sub2data={parsePercent(data["4_year_graduation_rate"])}
                sub3="Retention rate"
                sub3data={parsePercent(data["retention_rate_4_years"])}
                sub4="Total enrollment"
                sub4data={(
                  data["enrollment"]["total_undergrad"] +
                  data["enrollment"]["total_grad"]
                ).toLocaleString("en-US")}
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
                  <h3 className="cl-dark-text">
                    {parseAmount(data["application_fee"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool GPA</p>
                  <h3 className="cl-dark-text">
                    {parse(data["admission_factors"]["high_school_gpa"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool rank</p>
                  <h3 className="cl-dark-text">
                    {parse(data["admission_factors"]["high_school_rank"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Highschool record</p>
                  <h3 className="cl-dark-text">
                    {parse(data["admission_factors"]["high_school_record"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">
                    College-Prep Program Completion
                  </p>
                  <h3 className="cl-dark-text">
                    {parse(
                      data["admission_factors"]["completion_college_prep"]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Letters of recommendation</p>
                  <h3 className="cl-dark-text">
                    {parse(
                      data["admission_factors"]["letters_of_recommendation"]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">
                    Formal Demonstration of Competencies
                  </p>
                  <h3 className="cl-dark-text">
                    {parse(
                      data["admission_factors"][
                        "formal_demonstration_of_competencies"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p>SAT/ACT</p>
                  <h3>
                    {parse(
                      data["admission_factors"]["standardized_test_scores"]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p>SAT Submit Rate</p>
                  <h3>{parsePercent(data["submit_sat_percent"])}</h3>
                </div>
                <Divider />
                <div className="inline">
                  <p>ACT Submit Rate</p>
                  <h3>{parsePercent(data["submit_act_percent"])}</h3>
                </div>

                {/* TODO No TOFEL DATA Found */}
                {/* <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        TOEFL policy (International appllicants)
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {data["applicants_per_year"]}
                                    </h3>
                                </div> */}
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
                  sub2={
                    data["sat/act_score"]["sat_critical_reading_25"] &&
                    data["sat/act_score"]["sat_math_25"]
                      ? data["sat/act_score"]["sat_critical_reading_25"] +
                        data["sat/act_score"]["sat_math_25"]
                      : "No Data"
                  }
                  sub3={
                    data["sat/act_score"]["sat_critical_reading_75"] &&
                    data["sat/act_score"]["sat_math_75"]
                      ? data["sat/act_score"]["sat_critical_reading_75"] +
                        data["sat/act_score"]["sat_math_75"]
                      : "No Data"
                  }
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Reading"
                  sub2={parse(data["sat/act_score"]["sat_critical_reading_25"])}
                  sub3={parse(data["sat/act_score"]["sat_critical_reading_75"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Math"
                  sub2={parse(data["sat/act_score"]["sat_math_25"])}
                  sub3={parse(data["sat/act_score"]["sat_math_75"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={3}
                  sub1="Writing"
                  sub2={parse(data["sat/act_score"]["sat_writing_25"])}
                  sub3={parse(data["sat/act_score"]["sat_writing_75"])}
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
                  sub2={parse(data["sat/act_score"]["act_cumulative_25"])}
                  sub3={parse(data["sat/act_score"]["act_cumulative_75"])}
                  type="content"
                />
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Admission Rate</h1>
                <div>
                  <h2>Overall acceptance rate</h2>
                  <h3>
                    {parsePercent(
                      data["acceptance_rate"]["acceptance_rate_total"]
                    )}
                  </h3>
                </div>
                <div>
                  <h2>Female acceptance rate</h2>
                  <h3>
                    {parsePercent(
                      data["acceptance_rate"]["acceptance_rate_women"]
                    )}
                  </h3>
                </div>
                <div>
                  <h2>Male acceptance rate</h2>
                  <h3>
                    {parsePercent(
                      data["acceptance_rate"]["acceptance_rate_men"]
                    )}
                  </h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Commit Rate</h1>
                <div>
                  <h2>Female commit rate</h2>
                  <h3>
                    {parsePercent(data["acceptance_rate"]["commit_rate_women"])}
                  </h3>
                </div>
                <div>
                  <h2>Male commit rate</h2>
                  <h3>
                    {parsePercent(data["acceptance_rate"]["commit_rate_men"])}
                  </h3>
                </div>
              </InfoContainer>
              {/* TODO No enrollment rate data
                            <InfoContainer>
                                <h1>Enrollment Rate</h1>
                                <div>
                                    <h2>Female enrollment rate</h2>
                                    <h3>{data["applicants_per_year"]}</h3>
                                </div>
                                <div>
                                    <h2>Male enrollment rate</h2>
                                    <h3>{data["applicants_per_year"]}</h3>
                                </div>
                            </InfoContainer> */}
            </Col>
          </Row>
        ) : value == 2 ? (
          <Row gutter={[16, 16]} justify="space-evenly">
            <Col span={15}>
              <InfoContainer>
                <h1>Education</h1>
                <div>
                  <p className="cl-dark-text">Undergradate Majors Offered</p>
                  {Object.keys(data["bachelor_degree_disciplines"]).length !==
                  0 ? (
                    <Collapse ghost>
                      <Panel header="See All" key="1">
                        {(() => {
                          let majors = data["bachelor_degree_disciplines"];
                          console.log(majors);
                          let majorList = [];
                          Object.entries(majors).map(([k, v]) => {
                            if (v) {
                              majorList.push(<p>{k}</p>);
                            }
                          });
                          if (majorList.length === 0) return "No Data";
                          return majorList;
                        })()}
                      </Panel>
                    </Collapse>
                  ) : (
                    "No Data"
                  )}
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Most popular Area of Study</p>
                  <h3 className="cl-dark-text">
                    {(() => {
                      let d = data["study_disciplines"];
                      if (!d) {
                        return "No Data";
                      }
                      let mostPopularArea = Object.keys(d).reduce(function (
                        a,
                        b
                      ) {
                        return d[a] > d[b] ? a : b;
                      });
                      return mostPopularArea ? mostPopularArea : "No Data";
                    })()}
                  </h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Faculty Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">Total Instructional Staff</p>
                  <h3 className="cl-dark-text">
                    {parseNumber(data["instructional_staff"]["total"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Total Research Staff</p>
                  <h3 className="cl-dark-text">
                    {parseNumber(data["research_staff_count"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Total Male Staff</p>
                  <h3 className="cl-dark-text">
                    {parseNumber(data["instructional_staff"]["men"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Total Female Staff</p>
                  <h3 className="cl-dark-text">
                    {parseNumber(data["instructional_staff"]["women"])}
                  </h3>
                </div>
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Academic Statistics</h1>
                <div className="inline">
                  <p className="cl-dark-text">4-year graduation rate</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(data["4_year_graduation_rate"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">6-year graduation rate</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(data["6_year_graduation_rate"])}
                  </h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Academic Offerings</h1>
                {/* TODO No Data Found
                                 <div className="inline">
                                    <p className="cl-dark-text">Study abroad</p>
                                    <h3 className="cl-dark-text">
                                        
                                    </h3>
                                </div>
                                <Divider /> */}
                <div className="inline">
                  <p className="cl-dark-text">ROTC</p>
                  <h3 className="cl-dark-text">
                    {data["offer_rotc"] == "Yes" ? (
                      <CheckCircleIcon style={{ color: "#2651ED" }} />
                    ) : (
                      <CancelIcon style={{ color: "#ef3f2b" }} />
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Land grant institution</p>
                  <h3 className="cl-dark-text">
                    {data["land_grant_institution?"] ===
                    "Land Grant Institution" ? (
                      <CheckCircleIcon style={{ color: "#2651ED" }} />
                    ) : (
                      <CancelIcon style={{ color: "#ef3f2b" }} />
                    )}
                  </h3>
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
                    <h3>{parseAmount(data["in-state_tuition"])}</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Out-Of-State Tuition</h2>
                    <h3>{parseAmount(data["out-state_tuition"])}</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Average Room and Board Cost</h2>
                    <h3>{parseAmount(data["avg_cost_room_and_board"])}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h2>Instruction Expenses</h2>
                    <h3>{parseAmount(data["instruction_expense_per_fte"])}</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Student Service Expenses</h2>
                    <h3>
                      {parseAmount(data["student_service_expense_per_fte"])}
                    </h3>
                  </Col>
                  <Col span={8}>
                    <h2>Other Expenses</h2>
                    <h3>{parseAmount(data["other_expense_per_fte"])}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h2>On-Campus Living Cost (In-State Student)</h2>
                    <h3>
                      {parseAmount(
                        data["estimate_cost_in_state_living_on_campus"]
                      )}
                    </h3>
                  </Col>
                  <Col span={8}>
                    <h2>On-Campus Living Cost (Out-of-State Student)</h2>
                    <h3>
                      {parseAmount(
                        data["estimate_cost_out_state_living_on_campus"]
                      )}
                    </h3>
                  </Col>
                  <Col span={8}>
                    <h2>Off-Campus Living Cost (In-State Student)</h2>
                    <h3>
                      {parseAmount(
                        data["estimate_cost_in_state_living_off_campus"]
                      )}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <h2>Off-Campus Living Cost (Out-of-State Student)</h2>
                    <h3>
                      {parseAmount(
                        data["estimate_cost_out_state_living_off_campus"]
                      )}
                    </h3>
                  </Col>
                  <Col span={8}>
                    <h2>Estimated In-State Tuition</h2>
                    <h3>{parseAmount(data["estimate_tuition_in_state"])}</h3>
                  </Col>
                  <Col span={8}>
                    <h2>Estimated Out-Of-State Tuition</h2>
                    <h3>{parseAmount(data["estimate_tuition_out_state"])}</h3>
                  </Col>
                </Row>
              </InfoContainer>
            </Col>
            <Col span={15}>
              <InfoContainer>
                <h1>Financial Aid Statistics</h1>
                <h2>All Undergraduate Students Awarded</h2>
                <div className="inline">
                  <p className="cl-dark-text">Any Financial Aid</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(data["percent_undergrad_grant_aid"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Pell Grant</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(data["percent_undergrad_pell_grant"])}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Federal Grant Loan</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(data["percent_undergrad_federal_loan"])}
                  </h3>
                </div>
                <br />
                <h2>First Time Undergraduate Students Awarded</h2>
                <div className="inline">
                  <p className="cl-dark-text">Any Financial Aid</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(
                      data["percent_full_time_first_time_finance"]["any_aid"]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Pell Grant</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(
                      data["percent_full_time_first_time_finance"][
                        "pell_grants"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Federal Student Loan</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(
                      data["percent_full_time_first_time_finance"][
                        "federal_loan"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Federal Grant Aid</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(
                      data["percent_full_time_first_time_finance"][
                        "other_federal_grant_aid"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">Other</p>
                  <h3 className="cl-dark-text">
                    {parsePercent(
                      data["percent_full_time_first_time_finance"]["other_loan"]
                    )}
                  </h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                {/* TODO Net Price Not Found */}
                <h1>Average Grant/Scholarship and Net Price</h1>
                <DataRow
                  colNum={4}
                  sub1="Income Level"
                  sub2="Median Debt"
                  sub3="Average Grant"
                  sub4="Net Price"
                />
                <DataRow
                  colNum={4}
                  sub1="$0–30,000"
                  sub2={parseAmount(data["median_debt"]["0_30"])}
                  sub3={parseAmount(
                    data["avg_grant_scholarship_19_20"]["0_30"]
                  )}
                  sub4={parseAmount(data["family_income_public"]["0_30"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="$30,000–48,000"
                  sub2={parseAmount(data["median_debt"]["30_75"])}
                  sub3={parseAmount(
                    data["avg_grant_scholarship_19_20"]["30_48"]
                  )}
                  sub4={parseAmount(data["family_income_public"]["30_48"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="$48,001–75,000"
                  sub2={parseAmount(data["median_debt"]["30_75"])}
                  sub3={parseAmount(
                    data["avg_grant_scholarship_19_20"]["48_75"]
                  )}
                  sub4={parseAmount(data["family_income_public"]["48_75"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="$75,001–110,000"
                  sub2={parseAmount(data["median_debt"]["75+"])}
                  sub3={parseAmount(
                    data["avg_grant_scholarship_19_20"]["75_110"]
                  )}
                  sub4={parseAmount(data["family_income_public"]["75_110"])}
                  type="content"
                />
                <Divider />
                <DataRow
                  colNum={4}
                  sub1="+$110,000"
                  sub2={parseAmount(data["median_debt"]["75+"])}
                  sub3={parseAmount(
                    data["avg_grant_scholarship_19_20"]["gt110"]
                  )}
                  sub4={parseAmount(data["family_income_public"]["110+"])}
                  type="content"
                />
              </InfoContainer>
            </Col>
            <Col span={9}>
              <InfoContainer style={"display: flex, gap: 1rem"}>
                <h1>Grant</h1>
                <div>
                  <h2>State Grants Awarded amount</h2>
                  <h3>{parseAmount(data["grant"]["state_grant"])}</h3>
                </div>
                <div>
                  <h2>Net grant aid awarded amount</h2>
                  <h3>{parseAmount(data["grant"]["net_grant_aided"])}</h3>
                </div>
                <div>
                  <h2>Total Grants awarded amount</h2>
                  <h3>{parseAmount(data["grant"]["total_grant"])}</h3>
                </div>
                <div>
                  <h2>Local grants awarded amount</h2>
                  <h3>{parseAmount(data["grant"]["local_grant"])}</h3>
                </div>
                <div>
                  <h2>Pell grant administered amount</h2>
                  <h3>{parseAmount(data["grant"]["pell_administered"])}</h3>
                </div>
                <div>
                  <h2>Other federal grant amount</h2>
                  <h3>{parseAmount(data["grant"]["other_federal"])}</h3>
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Average Salary</h1>
                <h2>6 years after graduation</h2>
                <div className="inline">
                  <p className="cl-dark-text">25th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["6_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.25"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">75th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["6_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.75"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">90th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["6_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.90"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <br />
                <h2>10 years after graduation</h2>
                <div className="inline">
                  <p className="cl-dark-text">25th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["10_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.25"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">75th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["10_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.75"
                      ]
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">90th percentile</p>
                  <h3 className="cl-dark-text">
                    {parseAmount(
                      data["10_yrs_after_entry.working_not_enrolled"][
                        "earnings_percentile.90"
                      ]
                    )}
                  </h3>
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
                elNum={13}
                title="Student Body Statistics"
                sub1="Total Undergraduate Enrollment"
                sub1data={parseNumber(data["enrollment"]["total_undergrad"])}
                sub2="Total Graduate Enrollment"
                sub2data={parseNumber(data["enrollment"]["total_grad"])}
                sub3="Enrolled First-Year Students"
                sub3data={parseNumber(
                  data["enrollment"]["first_year_students"]
                )}
                sub4="Undergradate Students In-State"
                sub4data={parsePercent(data["percent_undergrad_in_state"])}
                sub5="Retention Rate"
                sub5data={parsePercent(data["retention_rate_4_years"])}
                sub6="Undergradate Students Out-State"
                sub6data={parsePercent(data["percent_undergrad_out_state"])}
                sub7="4-Year Graduation Rate"
                sub7data={parsePercent(data["4_year_graduation_rate"])}
                sub8="Percent First-Gen Students"
                sub8data={parsePercent(data["percent_first_gen"])}
                sub9="6-Year Graduation Rate"
                sub9data={parsePercent(data["6_year_graduation_rate"])}
                sub10="Student Faculty Ratio"
                sub10data={data["student_faculty_ratio"] + " : 1"}
                // sub11="Enrolled Men"
                // sub11data={data["enrollment"]["enrolled_men"]}
                // sub12="Enrolled Women"
                // sub12data={data["enrollment"]["enrolled_women"]}
                sub11="Admission Policy"
                sub11data={
                  data["admission policy"]
                    ? data["admission policy"]["coeducational"]
                      ? "Co-Ed"
                      : data["admission policy"]["men_only"]
                      ? "Men Only"
                      : data["admission policy"]["women_only"]
                      ? "Women Only"
                      : "Co-Ed"
                    : "No Data"
                }
                sub12="Admission Yield"
                sub12data={parsePercent(data["enrollment"]["admission_yield"])}
                sub13="Live Off Campus Students"
                sub13data={parse(data["live_off_campus_student_count"])}
              />
            </Col>
            <Col span={9}>
              <InfoContainer>
                <h1>Student Composition</h1>
                <Divider />
                <div className="chart">
                  <Doughnut
                    data={ethnicityChartData}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
                <br />
                <div className="chart">
                  <Doughnut
                    data={genderChartData}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              </InfoContainer>
              <InfoContainer>
                <h1>Atheletics</h1>
                <div className="inline">
                  <p className="cl-dark-text">NCAA Member</p>
                  <h3 className="cl-dark-text">
                    {parseYesNo(data["ncaa"]["member_ncaa"], "Yes")}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Football</p>
                  <h3 className="cl-dark-text">
                    {parseYesNo(data["ncaa"]["ncaa_football"], "Yes")}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Basketball</p>
                  <h3 className="cl-dark-text">
                    {parseYesNo(data["ncaa"]["ncaa_basketball"], "Yes")}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Track</p>
                  <h3 className="cl-dark-text">
                    {parseYesNo(
                      data["ncaa"]["ncaa_cross_country_track"],
                      "Yes"
                    )}
                  </h3>
                </div>
                <Divider />
                <div className="inline">
                  <p className="cl-dark-text">NCAA for Baseball</p>
                  <h3 className="cl-dark-text">
                    {parseYesNo(data["ncaa"]["ncaa_baseball"], "Yes")}
                  </h3>
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

export default connect((state) => {
  return {
    questionResponses: state.questionResponses,
  };
})(CollegeDetailPage);

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
`;