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
    if (tier <= 5) {
      return 6;
    }
    tier++;
  } else if (lowerCaseRecognition === "state/regional") {
    if (tier <= 6) {
      return 8; //Baseline tier for state/regional awards
    }
    tier += 2;
  } else if (lowerCaseRecognition === "national") {
    if (tier <= 7) {
      return 10;
    }
    tier += 3;
  } else if (lowerCaseRecognition === "international") {
    if (tier <= 8) {
      return 11;
    }
    tier += 4;
  }
  return tier;
};

export const calculateECTier = (
  hoursPerWeek: number,
  weeksPerYear: number,
  yearsSpent: number,
  awardScale: number,
  awardQuality: number,
  leadershipTier: number,
  impactTier: number,
) => {
  let timeTier = calculateTimeTier(hoursPerWeek, weeksPerYear, yearsSpent);
  let awardTier = calculateAwardTier(awardScale, awardQuality);
  let leadingTier = calculateLeadershipTier(leadershipTier, impactTier);
  let tier = (timeTier * 3 + awardTier * 1 + leadingTier * 1)/5;
  return tier;
};

export const calculateTimeTier = (
hoursPerWeek: number,
weeksPerYear: number,
yearsSpent: number,
) => {
  if(hoursPerWeek < 0 || weeksPerYear < 0 || yearsSpent < 1)
  {
      return -1;
  }
  let tier = yearsSpent;
  if(hoursPerWeek <= 3)
  {
      tier += 1;
  }
  else if(hoursPerWeek > 25)
  {
      tier += 6;
  }
  else
  {
      tier += (hoursPerWeek / 5) - ((hoursPerWeek / 5)%1) + 2;
  }
  if(weeksPerYear > 40)
  {
      tier += 4;
  }
  else
  {
      tier += (weeksPerYear - 10)/15 + (((weeksPerYear - 10)/15)%1) + 2;
  }
  if(tier > 12)
  {
      return 12;
  }
  return tier;
};

export const calculateAwardTier = (
awardScale: number,
awardQuality: number,
) => {
  if(awardScale < 0 || awardScale > 4 || awardQuality < 0 || awardQuality > 4)
  {
      return -1;
  }
  let tier = 2 * awardQuality + awardScale + 1;
  if(tier > 12)
  {
      return 12;
  }
  return tier;
}; 

export const calculateLeadershipTier = (
leadershipTier: number,
impactTier: number,
) => {
  if(leadershipTier < 0 || leadershipTier > 4 || impactTier < 0 || impactTier > 4)
  {
      return -1;
  }
  let tier = 2 * leadershipTier + impactTier + 1;
  if(tier > 12)
  {
      return 12;
  }
  return tier;
};

export const calculateOverallECTier = (tiers: number[]) => {
  let totalPoints = 0;
  let totalMultiplier = 0;
  //Weighted average of tiers
  tiers.forEach((tier) => {
    if (tier <= 3) {
      totalPoints += tier;
      totalMultiplier += 1;
    } else if (tier <= 6) {
      totalPoints += tier * 2;
      totalMultiplier += 2;
    } else if (tier <= 9) {
      totalPoints += tier * 3;
      totalMultiplier += 3;
    } else {
      totalPoints += tier * 4;
      totalMultiplier += 4;
    }
  });
  let overallAverage = Math.trunc(totalPoints / totalMultiplier);
  //Adjustment for number of ECs: <3 or >10 -> -/+2, 3-4 or 8-9 -> -/+ 1, 5-7 = no change
  if (tiers.length < 3) {
    overallAverage -= 2;
  } else if (tiers.length > 10) {
    overallAverage += 2;
  } else if (tiers.length < 5) {
    overallAverage -= 1;
  } else if (tiers.length > 7) {
    overallAverage += 1;
  }
  //Returns adjusted average for overall tier.
  return overallAverage;
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
  let classTier = calculateClassTiers(classTypes);
  let gpaTier = calculateGPATier(applicantLevel, gpa);
  tier = Math.round((classTier + gpaTier) / 2);
  return tier;
};
export const calculateClassTiers = (classTypes: string[]) => {
  let classTier = 0;
  classTypes.forEach((classType) => {
    classTier += classType === "Regular" ? 1 : classType === "Honors" ? 2.5 : 4;
  });
  classTier = Math.floor(classTier / classTypes.length);
  return classTier;
};
export const getAllClassesFormatted = (classTypes: any[]) => {
  return classTypes.map(({ courseName, courseLevel }, index) => {
    return {
      classID: index,
      name: courseName,
      tier: courseLevel === "Regular" ? 1 : courseLevel === "Honors" ? 2.5 : 4,
    };
  });
};
export const calculateGPATier = (applicantLevel: number, gpa: number) => {
  let gpaTier = 0;
  if (applicantLevel === 2) {
    gpaTier = Math.floor((0.2275 * Math.pow(gpa, 3)) - (0.85 * Math.pow(gpa, 2)) + (3 * gpa) - 1.6);
  } else if (applicantLevel === 1) {
    gpaTier = Math.floor((0.2 * Math.pow(gpa, 3)) - (0.9 * Math.pow(gpa, 2)) + (3.78 * gpa) - 1.6);
  } else {
    gpaTier = Math.floor((11 / 3) * gpa - 8 / 3);
  }
  return gpaTier;
};
