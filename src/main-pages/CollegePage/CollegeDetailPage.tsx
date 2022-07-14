import React from "react";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import styled from "styled-components";
import CollegeDetailHero from "./components/CollegeDetailHero/CollegeDetailHero";
import CollegeCard from "./components/CollegeCard/CollegeCard";
import InfoContainer from "./components/InfoContainer/InfoContainer";
import { Row, Col, Divider } from "antd";
import Script from "next/script";
import { width } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OverviewCard from "src/main-pages/CollegePage/components/OverviewCard";
import DataRow from "./components/DataRow/DataRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
    position: sticky;
    width: 50px;
    height: 50px;
    margin: 0;
    top: 100px;
    left: 50px;
    z-index: 100;
    background: white;
  `;

    function getPercentage(data) {
        if (data) {
            return Math.round(data * 100) + "%";
        } else return "No Data";
    }

    function getAmount(data) {
        if (data) {
            return "$ " + data.toLocaleString("en-US");
        } else return "No Data";
    }

    function getYesNo(data, word) {
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

    function getNumber(data) {
        if (data) {
            return data.toLocaleString("en-US");
        }
        return "No data";
    }

    return (
        <Wrapper>
            <BackButton onClick={() => router.push(`/college/`)}>
                <IconButton aria-label="delete" size="large">
                    <ArrowBackIosNewIcon fontSize="inherit" />
                </IconButton>
            </BackButton>
            <CollegeCard
                title={data.title}
                location={data.location}
                img={
                    data["img_link"] ? data["img_link"] : data["img_wiki_link"]
                }
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
                                            className="cl-blue">
                                            {data["institution_url"]}
                                        </a>
                                    </h3>
                                </div>
                                <div>
                                    <h2>Institutional Category</h2>
                                    <h3>{data["instituional_category"]}</h3>
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
                                        data["acceptance_rate"][
                                            "acceptance_rate_total"
                                        ] * 100
                                    ) + "%"
                                }
                                sub2="Total number of applicants/year"
                                sub2data={data["applicants_per_year"]}
                                sub3="Application Fee"
                                sub3data={"$" + data["application_fee"]}
                                sub4="Matriculation rate"
                                sub4data={
                                    data["matriculation_rate"]
                                        ? Math.round(
                                              data["matriculation_rate"] * 100
                                          ) + "%"
                                        : null
                                }
                            />
                            <OverviewCard
                                isOverview={true}
                                elNum={4}
                                title="Academics"
                                sub1="4 year graduation rate"
                                sub1data={
                                    Math.round(
                                        data["4_year_graduation_rate"] * 100
                                    ) + "%"
                                }
                                sub2="Calendar system"
                                sub2data={data["calendar_system"]}
                                sub3="Average GPA"
                                sub3data={data["applicants_per_year"]}
                                sub4="Most popular Area of Study"
                                sub4data={data["applicants_per_year"]}
                            />
                            <OverviewCard
                                isOverview={true}
                                elNum={4}
                                title="Finance"
                                sub1="Average resident cost of living"
                                sub1data={getAmount(
                                    data[
                                        "estimate_cost_in_state_living_off_campus"
                                    ]
                                )}
                                sub2="In state tuition"
                                sub2data={getAmount(
                                    data["estimate_tuition_in_state"]
                                )}
                                sub3="Average non-resident total cost"
                                sub3data={getAmount(
                                    data[
                                        "estimate_cost_out_state_living_off_campus"
                                    ]
                                )}
                                sub4="Out of state tuition"
                                sub4data={getAmount(data["out-state_tuition"])}
                            />
                            <OverviewCard
                                isOverview={true}
                                elNum={4}
                                title="Students"
                                sub1="Student faculty ratio"
                                sub1data={
                                    data["student_faculty_ratio"] + " : 1"
                                }
                                sub2="4 year graduation rate"
                                sub2data={
                                    data["4_year_graduation_rate"] * 100 + "%"
                                }
                                sub3="Retention rate"
                                sub3data={
                                    Math.round(
                                        data["retention_rate_4_years"] * 100
                                    ) + "%"
                                }
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
                                    <p className="cl-dark-text">
                                        Application fee
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {"$" + data["application_fee"]}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Highschool GPA
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {
                                            data["admission_factors"][
                                                "high_school_gpa"
                                            ]
                                        }
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Highschool rank
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {
                                            data["admission_factors"][
                                                "high_school_rank"
                                            ]
                                        }
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Highschool record
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {
                                            data["admission_factors"][
                                                "high_school_record"
                                            ]
                                        }
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p>SAT/ACT</p>
                                    <h3>
                                        {
                                            data["admission_factors"][
                                                "standardized_test_scores"
                                            ]
                                        }
                                    </h3>
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
                                        data["sat/act_score"][
                                            "sat_critical_reading_25"
                                        ] +
                                        data["sat/act_score"]["sat_math_25"] +
                                        data["sat/act_score"]["sat_writing_25"]
                                    }
                                    sub3={
                                        data["sat/act_score"][
                                            "sat_critical_reading_75"
                                        ] +
                                        data["sat/act_score"]["sat_math_75"] +
                                        data["sat/act_score"]["sat_writing_75"]
                                    }
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={3}
                                    sub1="Reading"
                                    sub2={
                                        data["sat/act_score"][
                                            "sat_critical_reading_25"
                                        ]
                                    }
                                    sub3={
                                        data["sat/act_score"][
                                            "sat_critical_reading_75"
                                        ]
                                    }
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={3}
                                    sub1="Math"
                                    sub2={data["sat/act_score"]["sat_math_25"]}
                                    sub3={data["sat/act_score"]["sat_math_75"]}
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={3}
                                    sub1="Writing"
                                    sub2={
                                        data["sat/act_score"]["sat_writing_25"]
                                    }
                                    sub3={
                                        data["sat/act_score"]["sat_writing_75"]
                                    }
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
                                    sub2={
                                        data["sat/act_score"][
                                            "act_cumulative_25"
                                        ]
                                    }
                                    sub3={
                                        data["sat/act_score"][
                                            "act_cumulative_75"
                                        ]
                                    }
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
                                        {Math.round(
                                            data["acceptance_rate"][
                                                "acceptance_rate_total"
                                            ] * 100
                                        ) + "%"}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Female acceptance rate</h2>
                                    <h3>
                                        {Math.round(
                                            data["acceptance_rate"][
                                                "acceptance_rate_women"
                                            ] * 100
                                        ) + "%"}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Male acceptance rate</h2>
                                    <h3>
                                        {Math.round(
                                            data["acceptance_rate"][
                                                "acceptance_rate_men"
                                            ] * 100
                                        ) + "%"}
                                    </h3>
                                </div>
                            </InfoContainer>
                            <InfoContainer>
                                <h1>Commit Rate</h1>
                                <div>
                                    <h2>Female commit rate</h2>
                                    <h3>
                                        {Math.round(
                                            data["acceptance_rate"][
                                                "acceptance_rate_women"
                                            ] * 100
                                        ) + "%"}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Male commit rate</h2>
                                    <h3>
                                        {Math.round(
                                            data["acceptance_rate"][
                                                "acceptance_rate_men"
                                            ] * 100
                                        ) + "%"}
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
                        <Col span={12}>
                            <InfoContainer>
                                <h1>Academic Statistics</h1>
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        4-year graduation rate
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {data["4_year_graduation_rate"] * 100 +
                                            "%"}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        6-year graduation rate
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {data["6_year_graduation_rate"] * 100 +
                                            "%"}
                                    </h3>
                                </div>
                            </InfoContainer>
                        </Col>
                        <Col span={12}>
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
                                            <CheckCircleIcon
                                                style={{ color: "#2651ED" }}
                                            />
                                        ) : (
                                            <CancelIcon
                                                style={{ color: "#ef3f2b" }}
                                            />
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Land grant institution
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {data["land_grant_institution?"] ===
                                        "Land Grant Institution" ? (
                                            <CheckCircleIcon
                                                style={{ color: "#2651ED" }}
                                            />
                                        ) : (
                                            <CancelIcon
                                                style={{ color: "#ef3f2b" }}
                                            />
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
                                        <h3>
                                            {getAmount(
                                                data["in-state_tuition"]
                                            )}
                                        </h3>
                                    </Col>
                                    <Col span={8}>
                                        <h2>Out-Of-State Tuition</h2>
                                        <h3>
                                            {getAmount(
                                                data["out-state_tuition"]
                                            )}
                                        </h3>
                                    </Col>
                                    <Col span={8}>
                                        <h2>Average Room and Board Cost</h2>
                                        <h3>
                                            {data["avg_cost_room_and_board"]
                                                ? "$ " +
                                                  data[
                                                      "avg_cost_room_and_board"
                                                  ].toLocaleString("en-US")
                                                : "No Data"}
                                        </h3>
                                    </Col>
                                </Row>
                                {/* TODO No Data
                                 <Row>
                                    <Col span={8}>
                                        <h2>Total In-State Tuition</h2>
                                        <h3>
                                            {"$ " +
                                                data[
                                                    "in-state_tuition"
                                                ].toLocaleString("en-US")}
                                        </h3>
                                    </Col>
                                    <Col span={8}>
                                        <h2>Total Out-Of-State Tuition</h2>
                                        <h3>
                                            {"$ " +
                                                data[
                                                    "in-state_tuition"
                                                ].toLocaleString("en-US")}
                                        </h3>
                                    </Col>
                                    <Col span={8}>
                                        <h2></h2>
                                        <h3></h3>
                                    </Col>
                                </Row> */}
                            </InfoContainer>
                        </Col>
                        <Col span={15}>
                            <InfoContainer>
                                <h1>Financial Aid Statistics</h1>
                                <div className="inline">
                                    <p className="cl-dark-text">Pell Grant</p>
                                    <h3 className="cl-dark-text">
                                        {getPercentage(
                                            data[
                                                "percent_full_time_first_time_finance"
                                            ]["pell_grants"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Federal Student Loan
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getPercentage(
                                            data[
                                                "percent_full_time_first_time_finance"
                                            ]["federal_loan"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Federal Grant Aid
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getPercentage(
                                            data[
                                                "percent_full_time_first_time_finance"
                                            ]["other_federal_grant_aid"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Any Financial Aid
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getPercentage(
                                            data[
                                                "percent_full_time_first_time_finance"
                                            ]["any_aid"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">Other</p>
                                    <h3 className="cl-dark-text">
                                        {getPercentage(
                                            data[
                                                "percent_full_time_first_time_finance"
                                            ]["other_loan"]
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
                                    sub2={getAmount(
                                        data["median_debt"]["0_30"]
                                    )}
                                    sub3={getAmount(
                                        data["avg_grant_scholarship_19_20"][
                                            "0_30"
                                        ]
                                    )}
                                    sub4={getAmount(
                                        data["family_income_public"]["0_30"]
                                    )}
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={4}
                                    sub1="$30,000–48,000"
                                    sub2={getAmount(
                                        data["median_debt"]["30_75"]
                                    )}
                                    sub3={getAmount(
                                        data["avg_grant_scholarship_19_20"][
                                            "30_48"
                                        ]
                                    )}
                                    sub4={getAmount(
                                        data["family_income_public"]["30_48"]
                                    )}
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={4}
                                    sub1="$48,001–75,000"
                                    sub2={getAmount(
                                        data["median_debt"]["30_75"]
                                    )}
                                    sub3={getAmount(
                                        data["avg_grant_scholarship_19_20"][
                                            "48_75"
                                        ]
                                    )}
                                    sub4={getAmount(
                                        data["family_income_public"]["48_75"]
                                    )}
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={4}
                                    sub1="$75,001–110,000"
                                    sub2={getAmount(data["median_debt"]["75+"])}
                                    sub3={getAmount(
                                        data["avg_grant_scholarship_19_20"][
                                            "75_110"
                                        ]
                                    )}
                                    sub4={getAmount(
                                        data["family_income_public"]["75_110"]
                                    )}
                                    type="content"
                                />
                                <Divider />
                                <DataRow
                                    colNum={4}
                                    sub1="+$110,000"
                                    sub2={getAmount(data["median_debt"]["75+"])}
                                    sub3={getAmount(
                                        data["avg_grant_scholarship_19_20"][
                                            "gt110"
                                        ]
                                    )}
                                    sub4={getAmount(
                                        data["family_income_public"]["110+"]
                                    )}
                                    type="content"
                                />
                            </InfoContainer>
                        </Col>
                        <Col span={9}>
                            <InfoContainer style={"display: flex, gap: 1rem"}>
                                <h1>Student Body Statistics</h1>
                                <div>
                                    <h2>State Grants Awarded amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["state_grant"]
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Net grant aid awarded amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["net_grant_aided"]
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Total Grants awarded amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["total_grant"]
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Local grants awarded amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["local_grant"]
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Pell grant administered amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["pell_administered"]
                                        )}
                                    </h3>
                                </div>
                                <div>
                                    <h2>Other federal grant amount</h2>
                                    <h3>
                                        {getAmount(
                                            data["grant"]["other_federal"]
                                        )}
                                    </h3>
                                </div>
                            </InfoContainer>
                            <InfoContainer>
                                <h1>Average Salary</h1>
                                <h2>6 years after graduation</h2>
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        25th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "6_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.25"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        75th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "6_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.75"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        90th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "6_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.90"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <br />
                                <h2>10 years after graduation</h2>
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        25th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "10_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.25"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        75th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "10_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.75"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        90th percentile
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getAmount(
                                            data[
                                                "10_yrs_after_entry.working_not_enrolled"
                                            ]["earnings_percentile.90"]
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
                                elNum={10}
                                title="Student Body Statistics"
                                sub1="Total Undergraduate Enrollment"
                                sub1data={getNumber(
                                    data["enrollment"]["total_undergrad"]
                                )}
                                sub2="Enrolled First-Year Students"
                                sub2data={getNumber(
                                    data["enrollment"]["first_year_students"]
                                )}
                                sub3="Undergradate Students In-State"
                                sub3data={getPercentage(
                                    data["percent_undergrad_in_state"]
                                )}
                                sub4="Retention Rate"
                                sub4data={getPercentage(
                                    data["retention_rate_4_years"]
                                )}
                                sub5="Undergradate Students Out-State"
                                sub5data={getPercentage(
                                    data["percent_undergrad_out_state"]
                                )}
                                sub6="4-Year Graduation Rate"
                                sub6data={getPercentage(
                                    data["4_year_graduation_rate"]
                                )}
                                sub7="Percent First-Gen Students"
                                sub7data={getPercentage(
                                    data["percent_first_gen"]
                                )}
                                sub8="6-Year Graduation Rate"
                                sub8data={getPercentage(
                                    data["6_year_graduation_rate"]
                                )}
                                sub9="Student Faculty Ratio"
                                sub9data={
                                    data["student_faculty_ratio"] + " : 1"
                                }
                                sub10="Admission Policy"
                                sub10data={
                                    data["admission policy"]
                                        ? data["admission policy"][
                                              "coeducational"
                                          ]
                                            ? "Co-Ed"
                                            : data["admission policy"][
                                                  "men_only"
                                              ]
                                            ? "Men Only"
                                            : data["admission policy"][
                                                  "women_only"
                                              ]
                                            ? "Women Only"
                                            : "Co-Ed"
                                        : "No Data"
                                }
                            />
                            <InfoContainer>
                                <h1>Faculty Statistics</h1>
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Total Instructional Staff
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getNumber(
                                            data["instructional_staff"]["total"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Total Male Staff
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getNumber(
                                            data["instructional_staff"]["men"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Total Female Staff
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getNumber(
                                            data["instructional_staff"]["women"]
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        Total Research Staff
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getNumber(
                                            data["research_staff_count"]
                                        )}
                                    </h3>
                                </div>
                            </InfoContainer>
                        </Col>
                        <Col span={9}>
                            <InfoContainer>
                                <h1>Atheletics</h1>
                                <div className="inline">
                                    <p className="cl-dark-text">NCAA Member</p>
                                    <h3 className="cl-dark-text">
                                        {getYesNo(
                                            data["ncaa"]["member_ncaa"],
                                            "Yes"
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        NCAA for Football
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getYesNo(
                                            data["ncaa"]["ncaa_football"],
                                            "Yes"
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        NCAA for Basketball
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getYesNo(
                                            data["ncaa"]["ncaa_basketball"],
                                            "Yes"
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        NCAA for Track
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getYesNo(
                                            data["ncaa"][
                                                "ncaa_cross_country_track"
                                            ],
                                            "Yes"
                                        )}
                                    </h3>
                                </div>
                                <Divider />
                                <div className="inline">
                                    <p className="cl-dark-text">
                                        NCAA for Baseball
                                    </p>
                                    <h3 className="cl-dark-text">
                                        {getYesNo(
                                            data["ncaa"]["ncaa_baseball"],
                                            "Yes"
                                        )}
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
