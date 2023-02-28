import classNames from "classnames";
import React from "react";
import styles from "./tier-range.module.scss";
const TierRange = ({
  tier,
  isOverall,
  isOverview,
}: {
  tier: number; 
  isOverall?: boolean;
  isOverview?: boolean;
}) => {
  const tierIndicator = (minTier) => {
    const offSet = Math.abs((tier - minTier) / 2);
    return (
      <>
        <div
          style={{
            backgroundColor: "#f7bc76",
            position: "absolute",
            height: "100%",
            width: "34.8%",
            zIndex: 1,
            left: `${offSet * 100 - offSet * 34 - 1}%`,
          }}
        />
        <div
          className="d-flex flex-column align-items-center justify-content-end"
          style={{
            position: "absolute",
            width: "130%",
            top: "130%",
            left: `${
              tier === 1
                ? 0
                : tier === 12
                ? -30
                : offSet * 100 -
                  65 +
                  (tier - minTier === 0
                    ? 17.5
                    : tier - minTier === 2
                    ? -17.5
                    : 0)
            }%`,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: "7px solid #f7bc76",
              alignSelf: tier === 1 ? "start" : tier === 12 ? "end" : "center",
            }}
            className="mx-2"
          ></div>
          <div
            className="px-3 py-2"
            style={{
              backgroundColor: "#f7bc76",
              width: "8rem",
              border: "1px solid transparent",
              borderRadius: "10px",
              textAlign: "center",
              alignSelf: tier === 1 ? "start" : null,
            }}
          >
            <text style={{ color: "#070452" }}>You are here</text>
          </div>
        </div>
      </>
    );
  };
  const tierRangeComponents = () => {
    let tierRangeComponents = [];
    for (let i = 1; i < 5; i++) {
      const multiplied = i * 3;
      const tiers = [multiplied - 2, multiplied - 1, multiplied];
      tierRangeComponents.push(
        <div
          className={classNames(
            "position-relative d-flex flex-row align-items-center justify-content-evenly ms-2",
            styles.metricsTierRange,
            "py-2"
          )}
          style={{ flex: 1, height: "100%" }}
        >
          {/* {tiers.map((currTier, index) => {
            return (
              <div
                className={`h-100 overflow-hidden center-child ${
                  index === 0 ? "" : index === tiers.length - 1 ? "" : "mx-05"
                }`}
                style={{
                  flex: 1,
                  zIndex: 2,
                  borderTopLeftRadius: index === 0 ? "5px" : 0,
                  borderBottomLeftRadius: index === 0 ? "5px" : 0,
                  borderTopRightRadius: index === tiers.length - 1 ? "5px" : 0,
                  borderBottomRightRadius:
                    index === tiers.length - 1 ? "5px" : 0,
                  color: i % 4 === 0 ? "black" : "white",
                }}
              >
                <div
                  className={`center-child ${
                    i % 4 === 1
                      ? "bg-cl-purple"
                      : i % 4 === 2
                      ? "bg-cl-pink-purple"
                      : i % 4 === 3
                      ? "bg-cl-orange-red"
                      : "bg-cl-light-yellow"
                  } h-100`}
                  style={{
                    width: currTier === tier && isOverview ? "50%" : "100%",
                    height: currTier === tier && isOverview ? "50%" : "100%",
                  }}
                >
                  <strong style={{ fontSize: "1.2em" }}>{currTier}</strong>
                </div>
              </div>
            );
          })} */}
          {tier <= tiers[tiers.length - 1] && tier >= tiers[0]
            ? tierIndicator(tiers[0])
            : null}
        </div>
      );
    }
    return tierRangeComponents;
  };
  return (
    <div
      className="d-flex flex-row align-items-center position-relative px-2 py-1"
      style={{
        borderLeft: "2vh solid #554e86",
        borderRight: "2vh solid #f5e44b",
        borderRadius: "8px",
        height: "8vh",
        background:
          "linear-gradient(90deg, rgba(100, 47, 113, 0.1) 0%, rgba(248, 231, 76, 0.1) 100%)",
        width: isOverall ? "100%" : "49%",
      }}
    >
      {tierRangeComponents()}
    </div>
  );
};
export default TierRange;
