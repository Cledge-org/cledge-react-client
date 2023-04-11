import classNames from "classnames";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  dashboardParts,
  pathwaysProgress,
  ecMetrics,
  recentBlogs,
  acMetrics,
}: {
  accountInfo: AccountInfo;
  dashboardParts: PathwayPart[];
  pathwaysProgress: PathwayProgress[];
  ecMetrics: Activities;
  acMetrics: Academics;
  recentBlogs: any;
}) => {
  const [percentage, setPercentage] = useState(0);
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

  useEffect(() => {
    let totalPathways = 0;
    let finishedPathways = 0;
    const allPathways: Pathway[] = dashboardParts
      .map(({ dynamicRoutes }) => {
        return dynamicRoutes.map(({ route }) => route);
      })
      .reduce((prev, curr) => {
        return prev.concat(curr);
      }, []);
    allPathways?.forEach((pathway) => {
      if (
        !pathwaysProgress.find(({ pathwayId }) => {
          return pathwayId === parseId(pathway._id);
        })
      ) {
        totalPathways++;
      }
    });
    pathwaysProgress.forEach(({ finished }) => {
      if (finished) {
        finishedPathways++;
      }
      totalPathways++;
    });
    setPercentage(Math.round((finishedPathways / totalPathways) * 100));
  }, []);

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
            <div className="container h4 pt-5">
              <span className="text-white">Welcome to</span> <span className="cl-blue">Cledge.</span>
            </div>
          </div>
        </div>
        <Container className="mt-5">
          <Row>
            <Col>
              <Card>
                <Row>
                  <Col lg={9}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold">My Learning</div>
                      <Row>
                        <Col lg={7}>
                          <div className="">Complete your weekly tasks and modules</div>
                        </Col>
                        <Col />
                      </Row>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="">Placeholder</div>
                  </Col>
                </Row>
                <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                  <div className="h5 mb-0">Go to my Learning</div>
                </Button>
              </Card>
            </Col>
            <Col>
            <Card>
                <Row>
                  <Col lg={9}>
                    <div className="ms-3">
                      <div className="cl-dark-text h2 fw-bold">Ai Counselor</div>
                      <Row>
                        <Col lg={10}>
                          <div className="">Cledge's most popular tool: an AI counselor that can help answer any questions you might have.</div>
                        </Col>
                        <Col lg={2}>
                          <Link href="/metrics">
                            <a>
                              <img
                                src="/images/header/ai-counselorimg.svg"
                                style={{
                                }}
                                className="ps-4"
                              />
                            </a>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className=""></div>
                  </Col>
                </Row>
                <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                  <div className="h5 mb-0">Try Now!</div>
                </Button>
              </Card>
            </Col>
          </Row>
          <Row>
          <Col>
              <Card>
                <div className="ms-3">
                  <div className="cl-dark-text h2 fw-bold">Live Counseling</div>
                  <div className="">Talk one-on-one with a professional counselor!</div>
                </div>
                <Row>
                  <Col className="pe-0">
                    <Button className="cl-btn-blue rounded-2 ms-3 mb-3 mt-3">
                      <div className="h5 mb-0">Go to my Learning</div>
                    </Button>
                  </Col>
                  <Col className="ps-0">
                    <div className="d-flex justify-content-end">
                      <Button className="cl-btn-blue rounded-2 mb-3 mt-3 me-3">
                        <div className="h5 mb-0">Go to my Learning</div>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
            <Card>
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
                        <Col lg={12}>
                          <div className="">View tips to improve your profile competitiveness.</div>
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
                <Button className="cl-btn-blue rounded-2 mx-3 mb-3 mt-3">
                  <div className="h5 mb-0">Go to Metrics</div>
                </Button>
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