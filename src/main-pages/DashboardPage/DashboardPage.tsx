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
        <div className="border h-25">
          <div className="py-3">
            <div className="container display-4">
              Hi, {accountInfo.name.split(" ")[0]}. Welcome to the Dashboard!
            </div>
            <div className="container h4">
              Welcome to <span className="cl-blue">Cledge.</span>
            </div>
          </div>
        </div>
        {/* <div className="border bg-secondary h-75">
          <div className="d-flex justify-content-center container h-100 w-100">
            <div className="d-flex justify-content-between h-100 w-100 flex-wrap">
              <div className="h-50 w-50 border">
                <p>yo</p>
              </div>
              <div className="h-50 w-50 border">
                <p>yo</p>
              </div>
              <div className="h-50 w-50 border">
                <p>yo</p>
              </div>
              <div className="h-50 w-50 border">
                <p>yo</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 border">hello</div>
              <div className="col-lg-2 border">hello</div>
            </div>
            <div className="row">
              <div className="col-lg-2 border">hello</div>
              <div className="col-lg-2 border">hello</div>
            </div>
          </div>
        </div> */}
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
                        <Col lg={7}>
                          <div className="">Cledge's most popular tool: an AI counselor that can help answer any questions you might have.</div>
                        </Col>
                        <Col />
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