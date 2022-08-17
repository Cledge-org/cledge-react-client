import React from "react";
import TierRange from "../TierRange/TierRange";
import TipsCard from "../TipsCard/TipsCard";
const TierIndicatorAndTips = ({
  isOverall,
  tier,
  tip,
  tipTitle,
  updateChunk,
  updatePage,
  noTip,
}: {
  tier: number;
  isOverall?: boolean;
  tip: string;
  tipTitle: string;
  updatePage: string;
  updateChunk: string;
  noTip?: boolean;
}) => {
  return (
    <>
      <TierRange tier={tier} isOverall={isOverall} />
      {!noTip && (
        <div
          style={{ minHeight: "30vh", width: isOverall ? "100%" : "50%" }}
          className="d-flex flex-column align-items-center justify-content-start"
        >
          <TipsCard
            updateChunk={updateChunk}
            updatePage={updatePage}
            isOverall={isOverall}
            title={tipTitle}
            tips={[tip]}
          />
        </div>
      )}
    </>
  );
};
export default TierIndicatorAndTips;
