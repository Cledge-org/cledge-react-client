export const calculateECActivityTier = (
  hoursPerWeek: number,
  weeksPerYear: number,
  yearsSpent: number,
  recognition: string
) => {
  let tier = yearsSpent - 1;
  let hoursPerYear = hoursPerWeek * weeksPerYear;
  if (hoursPerYear < 50) {
    tier++;
  } else if (hoursPerYear < 100) {
    tier += 2;
  } else if (hoursPerYear < 200) {
    tier += 3;
  } else if (hoursPerYear < 500) {
    tier += 4;
  } else if (hoursPerYear >= 500) {
    tier += 5;
  }
  let lowerCaseRecognition = recognition.toLowerCase();
  if (lowerCaseRecognition === "school") {
    tier++;
  } else if (lowerCaseRecognition === "state/regional") {
    tier += 2;
  } else if (lowerCaseRecognition === "national") {
    tier += 3;
  } else if (lowerCaseRecognition === "international") {
    tier += 4;
  }
  return tier;
};
export const calculateECTotalPoints = (tiers: number[]) => {
  let overallPoints = 0;
  tiers.forEach((tier) => {
    let multiplier = 1;
    if (tier >= 4 && tier <= 6) {
      multiplier = 1.5;
    } else if (tier >= 7 && tier <= 8) {
      multiplier = 2;
    } else if (tier >= 9) {
      multiplier = 3;
    }
    overallPoints += tier * 5 * multiplier;
  });
  return overallPoints;
};
export const calculateECActivityPoints = (tier) => {
  let multiplier = 1;
  if (tier >= 4 && tier <= 6) {
    multiplier = 1.5;
  } else if (tier >= 7 && tier <= 8) {
    multiplier = 2;
  } else if (tier >= 9) {
    multiplier = 3;
  }
  return tier * 5 * multiplier;
};
export const calculateACActivityTier = (
  applicantLevel: number,
  gpa: number,
  classTypes: string[]
) => {
  let tier = 0;
  let gpaTier = 0;
  if (applicantLevel === 2) {
    // gpaTier = Math.floor( 6.3 / (1 + Math.exp(-0.3376 * (gpa - 1))) - 2.15);
    gpaTier = Math.floor(
      -2.96209 * Math.log(0.713480623 * (6.3 / (gpa + 2.15) - 1))
    );
  } else if (applicantLevel === 1) {
    gpaTier = Math.floor(-5.65291 * Math.log(0.83786 * (8 / (gpa + 3) - 1)));
  } else {
    gpaTier = Math.floor((11 / 3) * gpa - 8 / 3);
  }
  let classTier = 0;
  classTypes.forEach((classType) => {
    classTier += classType === "Regular" ? 1 : classType === "Honors" ? 2.5 : 4;
  });
  classTier = Math.floor(classTier / classTypes.length);
  tier = Math.round((classTier + gpaTier) / 2);
  return tier;
};
