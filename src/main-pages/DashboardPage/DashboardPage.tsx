import classNames from "classnames";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { connect } from "react-redux";
import { UserMetaData } from "src/@types/types";

const DashboardPage = ({
  accountInfo,
  userData,
}: {
  accountInfo: AccountInfo;
  userData: UserMetaData;
}) => {
  let avgTier = useMemo(
    () => (userData.ecOverall || 0 + userData.acOverall || 0) / 2,
    [userData.ecOverall, userData.acOverall]
  );
  console.log(userData);
  return (
     <div className="d-flex flex-column">
        <div className="border h-25" style={{ background: "linear-gradient(93.76deg, rgba(59, 104, 223, 0.65) -8.28%, rgba(141, 50, 213, 0.65) 103.54%)", }}>
          <div className="py-3">
            <div className="container display-4 pt-4 pb-5 text-white fw-bold" style={{ fontSize: "80px", }}>
              Hi, {accountInfo.name.split(" ")[0]}.
            </div>
            <div className="container h2 pt-5">
              <span className="text-white">Welcome to</span> <span className="cl-blue">Cledge.</span>
            </div>
          </div>
        </div>
        <Container className="mt-5 mb-5">
          <Row className="pb-4">
            <Col className="mt-sm-5 mt-md-0 mt-lg-0" md={6} sm={12}>
              <Card className="h-100 d-flex flex-column justify-content-between">
                <Row>
                  <Col lg={12}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold pt-3  ">
                        <Link href="/my-learning">
                            <a>
                              <img
                                src="/images/header/icon-school.svg"
                                style={{
                                  padding: "10px",
                                  width: "50px",
                                  borderRadius: "10px",
                                  backgroundColor: "#DCE1FB",
                                }}
                                className="me-3"
                              />
                            </a>
                          </Link>
                          My Learning
                        </div>
                      <Row>
                        <Col lg={6} className="pt-3">
                          <div className="h5">
                            Complete your weekly tasks and modules
                          </div>
                        </Col>
                        <Col lg={6} className="pe-5 pb-3 ps-3">
                          <div className="d-flex flex-row-reverse">
                            <div className="" style={{ width: "150px"}}>
                              <CircularProgressbarWithChildren
                                strokeWidth={10}
                                children={
                                  <div
                                    style={{ fontWeight: "bold", fontSize: "1.1em" }}
                                  >{`${userData.pathwayPercentage ? userData.pathwayPercentage : 0}%`}</div>
                                }
                                className="center-child"
                                styles={{
                                  text: {
                                    fontWeight: "bold",
                                  },
                                  trail: {
                                    stroke: "#d6d6d6",
                                  },
                                  path: {
                                    transition: "stroke-dashoffset 0.5s ease 0s",
                                    stroke: "#2651ed",
                                  },
                                }}
                                value={userData.pathwayPercentage}
                              />
                              <br></br>
                            </div>
                          </div>
                        </Col>
                        <Col />
                      </Row>
                    </div>
                  </Col>
                </Row>
                  <Link href="my-learning">
                    <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-2">
                      <div className="h5 mb-0">Go to my Learning</div>
                    </Button>
                  </Link>
              </Card>
            </Col>
            <Col>
            <Card className="h-100 d-flex flex-column justify-content-between">
                <Row>
                  <Col lg={12}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold pt-3">
                        <Link href="/metrics">
                          <a>
                            <img
                              src="/images/header/metrics.svg"
                              style={{
                                padding: "10px",
                                width: "50px",
                                borderRadius: "10px",
                                backgroundColor: "#DCE1FB",
                              }}
                              className="me-3"
                            />
                          </a>
                        </Link>
                        Competitive Metrics
                      </div>
                      <Row>
                        <Col lg={12} className="pt-3">
                          <div className="h5">View tips to improve your profile competitiveness.</div>
                        </Col>
                          <div className="mt-3 pe-4">
                            <div className="d-flex flex-row align-items-center justify-content-between">
                              <div>Less competitive</div>
                              <div>More competitive</div>
                            </div>
                            <div>
                              <div
                                className="mt-1 mb-5"
                                style={{
                                  height: "36px",
                                  background:
                                    "linear-gradient(90deg, rgba(100, 47, 113, 0.1) 0%, rgba(248, 231, 76, 0.1) 100%)",
                                  borderLeft: "2px solid #506BED",
                                  borderRight: "2px solid #506BED",
                                  position: "relative",
                                }}
                              >
                                <div
                                  className="d-flex flex-column position-absolute"
                                  style={{
                                    left: `calc(${
                                      avgTier === 0
                                        ? 0
                                        : avgTier === 12
                                        ? 100
                                        : (avgTier / 12) * 100
                                    }% - ${
                                      avgTier === 0 ? 0 : avgTier === 12 ? 126.05 : 63.025
                                    }px)`,
                                    top: "0",
                                    zIndex: 100,
                                    alignItems:
                                      avgTier === 0
                                        ? "start"
                                        : avgTier === 12
                                        ? "end"
                                        : "center",
                                    width: "fit-content",
                                  }}
                                >
                                  <div
                                    style={{
                                      border: "2px solid #F7BC76",
                                      height: "36px",
                                      width: 0,
                                      borderRadius: "2px",
                                    }}
                                  />
                                  <div
                                    className="mt-1"
                                    style={{
                                      width: 0,
                                      height: 0,
                                      borderLeft: `${
                                        avgTier === 0 ? 3 : 7
                                      }px solid transparent`,
                                      borderRight: `${
                                        avgTier === 12 ? 3 : 7
                                      }px solid transparent`,
                                      borderBottom: "7px solid #F7BC76",
                                      alignSelf:
                                        avgTier === 0
                                          ? "start"
                                          : avgTier === 12
                                          ? "end"
                                          : "center",
                                    }}
                                  />
                                  <div
                                    className="px-3 py-2 cl-dark-text fw-bold"
                                    style={{
                                      width: "fit-content",
                                      backgroundColor: "#F7BC76",
                                      border: "1px solid transparent",
                                      textAlign: "center",
                                    }}
                                  >
                                    You are here
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </Row>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className=""></div>
                  </Col>
                </Row>
                <Link href="/metrics">
                  <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                    <div className="h5">Go to Metrics</div>
                  </Button>
                </Link>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col>
            <Card className="h-100 d-flex flex-column justify-content-between">
                <Row>
                  <Col lg={12}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold pt-3">
                        <Link href="/metrics">
                          <a>
                            <img
                              src="/images/header/icon-school.svg"
                              style={{
                                padding: "10px",
                                width: "50px",
                                borderRadius: "10px",
                                backgroundColor: "#DCE1FB",
                              }}
                              className="me-3"
                            />
                          </a>
                        </Link>
                        College Search Tool
                      </div>
                      <Row>
                        <Col lg={12} className="pt-3">
                          <div className="h5">Explore data on thousands of colleges cataloged by cledge - right at your fingertips.</div>
                        </Col>
                          
                      </Row>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className=""></div>
                  </Col>
                </Row>
                <Link href="/college">
                  <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                    <div className="h5">Go to College Finder</div>
                  </Button>
                </Link>
              </Card>
            </Col>
            <Col>
            <Card className="h-100 d-flex flex-column justify-content-between">
                <Row>
                  <Col lg={12}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold pt-3">
                        <Link href="/metrics">
                          <a>
                            <img
                              src="/images/header/blogs.svg"
                              style={{
                                padding: "10px",
                                width: "50px",
                                borderRadius: "10px",
                                backgroundColor: "#DCE1FB",
                              }}
                              className="me-3"
                            />
                          </a>
                        </Link>
                        College List
                      </div>
                      <Row>
                        <Col lg={12} className="pt-3">
                          <div className="h5">Explore the colleges that we think are a great fit for you based on your profile</div>
                        </Col>
                          
                      </Row>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className=""></div>
                  </Col>
                </Row>
                <Link href="/collegeList">
                  <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                    <div className="h5">Go to your list</div>
                  </Button>
                </Link>
              </Card>
            </Col>
          </Row>
          
        </Container>
      </div>   
  );
};
export default connect((state) => {
  return {
    pathwaysProgress: state.pathwaysProgress,
    accountInfo: state.accountInfo,
  };
})(DashboardPage);