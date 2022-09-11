import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { connect } from "react-redux";

const DashboardPage = ({
  accountInfo,
  dashboardParts,
  pathwaysProgress,
  ecMetrics,
  acMetrics,
}: {
  accountInfo: AccountInfo;
  dashboardParts: PathwayPart[];
  pathwaysProgress: PathwayProgress[];
  ecMetrics: Activities;
  acMetrics: Academics;
}) => {
  const [percentage, setPercentage] = useState(0);
  const router = useRouter();
  const avgTier = useMemo(() => 11, [ecMetrics, acMetrics]);
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
    <div
      className="d-flex align-items-center justify-content-center w-100 vh-100"
      style={{ backgroundColor: "#F9FAFF" }}
    >
      <div className="d-flex flex-column w-75" style={{ height: "90%" }}>
        <div className="cl-dark-text fw-bold mb-5" style={{ fontSize: "28px" }}>
          Hi, {accountInfo.name}. Welcome to the dashboard
        </div>
        <div
          className="d-flex flex-row align-items-center"
          style={{ height: "75%" }}
        >
          <div
            className="d-flex flex-column justify-content-between h-100"
            style={{ width: "48%" }}
          >
            <div className="cl-dark-text fw-bold" style={{ fontSize: "18px" }}>
              The essential resources for UW CS applications
            </div>
            <div
              className="d-flex flex-column justify-content-between w-100 p-3"
              style={{
                height: "90%",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #E0DFE8",
              }}
            >
              <div className="d-flex flex-row w-100 justify-content-between">
                <div className="cl-dark-text fw-bold">
                  <Link href="/my-learning">
                    <img
                      src="/images/header/my-learning.svg"
                      style={{
                        padding: "10px",
                        width: "50px",
                        borderRadius: "10px",
                        backgroundColor: "#DCE1FB",
                      }}
                    />
                  </Link>
                  <div>My Learning</div>
                </div>
                <div>
                  <div style={{ width: "4vw" }}>
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
                  </div>
                </div>
              </div>
              <div className="cl-dark-text fw-bold">
                <div className="pb-4">5 successful profiles</div>
                {dashboardParts.map(({ name }) => (
                  <Link href="/my-learning">
                    <div
                      className="py-4"
                      style={{ borderTop: "1px solid #E0DFE8" }}
                    >
                      {name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className="h-100 mx-3"
            style={{ width: "2px", backgroundColor: "#E0DFE8" }}
          />
          <div
            className="d-flex flex-column justify-content-between h-100"
            style={{ width: "48%" }}
          >
            <div className="cl-dark-text fw-bold" style={{ fontSize: "18px" }}>
              Cledge's powerful features to assist you
            </div>
            <div
              className="w-100"
              style={{
                height: "42.5%",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #E0DFE8",
                overflow: "hidden",
              }}
            >
              <div
                className="d-flex justify-content-end w-100 py-3 cl-dark-text fw-bold px-3"
                style={{ backgroundColor: "#A5A6F6", position: "relative" }}
              >
                Try it! Cledge's most popular feature
                <Link href="/chatbot">
                  <img
                    src="/images/header/chatbot.svg"
                    style={{
                      position: "absolute",
                      bottom: "-40%",
                      left: "2%",
                      padding: "10px",
                      width: "50px",
                      borderRadius: "10px",
                      backgroundColor: "#DCE1FB",
                    }}
                  />
                </Link>
              </div>
              <div
                className="px-3 pt-5 d-flex flex-column justify-content-end"
                style={{ height: "70%" }}
              >
                <div
                  className="cl-dark-text fw-bold mb-3"
                  style={{ fontSize: "24px" }}
                >
                  Chat with our AI counselor
                </div>
                <div className="cl-mid-gray" style={{ fontSize: "18px" }}>
                  Anything you are not sure about?
                  <br />
                  Our AI counselor is here for you 24/7
                </div>
              </div>
            </div>
            <div
              className="w-100 p-3"
              style={{
                height: "42.5%",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #E0DFE8",
              }}
            >
              <Link href="/metrics">
                <img
                  src="/images/header/metrics.svg"
                  style={{
                    padding: "10px",
                    width: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#DCE1FB",
                  }}
                />
              </Link>
              <div
                className="cl-dark-text fw-bold mt-3"
                style={{ fontSize: "24px" }}
              >
                Competitive Metrics
              </div>
              <div className="cl-mid-gray" style={{ fontSize: "18px" }}>
                View tips to improve the competitiveness of your profile
              </div>
              <div className="w-100 mt-3">
                <div className="w-100 d-flex flex-row align-items-center justify-content-between">
                  <div>Less competitive</div>
                  <div>More competitive</div>
                </div>
                <div>
                  <div
                    className="mt-1"
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
                      style={{
                        marginLeft: `calc(${(avgTier / 12) * 100}% - 1px)`,
                        border: "2px solid #F7BC76",
                        height: "100%",
                        width: 0,
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <div
                    className="d-flex flex-column mt-1"
                    style={{
                      marginLeft: `calc(${
                        avgTier === 0
                          ? 0
                          : avgTier === 12
                          ? 100
                          : (avgTier / 12) * 100
                      }% - ${
                        avgTier === 0 ? 0 : avgTier === 12 ? 126.05 : 63.025
                      }px)`,
                      zIndex: 100,
                      width: "fit-content",
                    }}
                  >
                    <div
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect((state) => {
  return {
    pathwaysProgress: state.pathwaysProgress,
    accountInfo: state.accountInfo,
  };
})(DashboardPage);
