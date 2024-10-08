import classNames from "classnames";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { connect } from "react-redux";
import QuickAccessLinks from "src/main-pages/DashboardPage/components/QuickAccessLinks/QuickAccessLinks";
import BlogCarouselItem from "src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem";
import NewBlogsCarousel from "src/main-pages/WelcomePage/components/blogsCarousel/NewBlogsCarousel";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import styles from "./dashboard-page.module.scss";
import Footer from "src/common/components/Footer/Footer";
import TierRange from "src/main-pages/MetricsPage/components/TierRange/TierRange";


const DashboardPage = ({
  accountInfo,
  // dashboardParts,
  pathwaysProgress,
  ecMetrics,
  recentBlogs,
  acMetrics,
  percentageObject
}: {
  accountInfo: AccountInfo;
  // dashboardParts: PathwayPart[];
  pathwaysProgress: PathwayProgress[];
  ecMetrics: Activities;
  acMetrics: Academics;
  recentBlogs: any;
  percentageObject: any;
}) => {
  console.log(percentageObject);
  const [percentage, setPercentage] = useState(percentageObject != null && percentageObject != 0 ? percentageObject.percentage.percentage : 0);
  const router = useRouter();
  const avgTier = useMemo(
    () => (ecMetrics?.overallTier || 0 + acMetrics?.overallClassTier || 0) / 2,
    [ecMetrics, acMetrics]
  );
  const { width, height } = useWindowSize();

  const parseId = (objectId) => {
    const objectIdStr = objectId.toString();
    if (!objectIdStr.includes('"')) {
      return objectIdStr;
    }
    return objectIdStr.substring(
      objectIdStr.indexOf('"') + 1,
      objectIdStr.length - 2
    );
  };

  // useEffect(() => {
  //   let totalPathways = 0;
  //   let finishedPathways = 0;
  //   const allPathways: Pathway[] = dashboardParts
  //     .map(({ dynamicRoutes }) => {
  //       return dynamicRoutes.map(({ route }) => route);
  //     })
  //     .reduce((prev, curr) => {
  //       return prev.concat(curr);
  //     }, []);
  //   allPathways?.forEach((pathway) => {
  //     if (
  //       !pathwaysProgress.find(({ pathwayId }) => {
  //         return pathwayId === parseId(pathway._id);
  //       })
  //     ) {
  //       totalPathways++;
  //     }
  //   });
  //   pathwaysProgress.forEach(({ finished }) => {
  //     if (finished) {
  //       finishedPathways++;
  //     }
  //     totalPathways++;
  //   });
  //   setPercentage(Math.round((finishedPathways / totalPathways) * 100));
  // }, []);

  if (accountInfo.checkIns.length > 0) {
    router.push({
      pathname: "/check-ins/[checkIn]",
      query: { checkIn: accountInfo.checkIns },
    });
  }
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
          <Row>
            <Col sm={6}>
            <Card style={{ height : '350px' }}className="d-flex flex-column justify-content-between">
                  <Row>
                    <Col lg={12}>
                      <div className="ms-3">
                        <div className="cl-dark-text h2 fw-bold pt-3">
                          <Link href="/metrics">
                            <a>
                              <img
                                src="/images/college-finder.png" alt="graduation hat"
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
                          College Finder
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
                    <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-2">
                      <div className="h5 mb-0">Go to College Finder</div>
                    </Button>
                  </Link>
                </Card>
              </Col>
              <Col sm={6}>
              <Card style={{ height : '350px' }}className="d-flex flex-column justify-content-between">
                  <Row>
                    <Col lg={12}>
                      <div className="ms-3">
                        <div className="cl-dark-text h2 fw-bold pt-3">
                          <Link href="/metrics">
                            <a>
                              <img
                                src="/images/header/blogs.svg" alt="pencil and paper icon"
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
                  <Link href="/college-list">
                    <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                      <div className="h5 mb-0">Go to My Colleges</div>
                    </Button>
                  </Link>
                </Card>
              </Col>
            </Row>
            <Row className="pt-4">
            <Col className="mt-sm-5 mt-md-0 mt-lg-0" md={6} sm={12}>
            <Card style={{ height : '375px' }}className="d-flex flex-column justify-content-between">                
            <Row>
                  <Col lg={12}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold pt-3  ">
                        <Link href="/my-learning">
                            <a>
                              <img
                                src="/images/header/icon-school.svg" alt="icon of graduation hat"
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
                                  >{`${percentage}%`}</div>
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
                                value={percentage}
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
                      <div className="h5 mb-0">Go to My Learning</div>
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
                              alt="pie graph icon"
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
                    <div className="h5 mb-0">Go to Metrics</div>
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