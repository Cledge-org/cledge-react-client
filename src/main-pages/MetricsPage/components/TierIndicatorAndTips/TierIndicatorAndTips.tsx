import React from "react";
import TierRange from "../TierRange/TierRange";
import TipsCard from "../TipsCard/TipsCard";
const TierIndicatorAndTips = ({
  isOverall,
  tier,
}: {
  tier: number;
  isOverall?: boolean;
}) => {
  return (
    <>
      <TierRange tier={tier} isOverall={isOverall} />
      <div
        style={{ minHeight: "30vh", width: isOverall ? "100%" : "50%" }}
        className="d-flex flex-column align-items-center justify-content-start"
      >
        <TipsCard
          isOverall={isOverall}
          title={
            "You are seasoned at this activity, but you can do even better! To increase your tier, try tips below."
          }
          tips={[
            tier >= 1 && tier <= 3
              ? "Need further development in this category"
              : tier >= 4 && tier <= 6
              ? "Good extracurriculars, but you can do more!"
              : tier >= 7 && tier <= 8
              ? "Great extracurriculars!"
              : "Fantastic extracurriculars! You definitely know what you’re doing!",
          ]}
        />
      </div>
    </>
  );
};
export default TierIndicatorAndTips;
