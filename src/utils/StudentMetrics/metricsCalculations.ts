export const calculateActivityTier = (
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
export const calculateTotalPoints = (tiers: number[]) => {
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
export const calculateActivityPoints = (tier) => {
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
