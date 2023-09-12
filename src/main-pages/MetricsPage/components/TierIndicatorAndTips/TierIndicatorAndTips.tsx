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
  isPremium
}: {
  tier: number;
  isOverall?: boolean;
  tip: string;
  tipTitle: string;
  updatePage: string;
  updateChunk: string;
  noTip?: boolean;
  isPremium?: boolean
}) => {
  return (
    <>
      <TierRange tier={tier} isOverall={isOverall}/>
      {!noTip && (
        <div
          style={{ minHeight: "30vh", width: isOverall ? "100%" : "50%" }}
          className="d-flex flex-column align-items-center ms-5"
        >
            <TipsCard
              updateChunk={updateChunk}
              updatePage={updatePage}
              isOverall={isOverall}
              title={tipTitle}
              tips={[tip]}
              isPremium={isPremium}
            />
        </div>
      )}
    </>
  );
};
export default TierIndicatorAndTips;
