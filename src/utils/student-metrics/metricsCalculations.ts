//To Remove
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

/**
 * Calculates the tier for a single extracurricular
 * All params are the student inputted data for the extracurricular on the site
 * @param hoursPerWeek 
 * @param weeksPerYear 
 * @param yearsSpent 
 * @param awardScale 
 * @param awardQuality 
 * @param leadershipTier 
 * @param impactTier 
 * @returns The tier for the extracurricular (int from 1-12)
 */
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
  return Math.round(tier);
};

//Calculates the tier for the time aspect of an extracurricular.
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

//Calculates the tier for the award aspect of an extracurricular.
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

//Calculates the tier for the leadership aspect of an extracurricular.
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

/**
 * Calculates the student's overall extracurricular tier, given their extracurricular list
 * @param tiers The individual extracurricular tiers of the student's activities
 * @returns The student's overall extracurricular tier (int from 1-12)
 */
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
  let overallAverage = Math.round(totalPoints / totalMultiplier);
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

//ToRemove
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

//ToRemove
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

//ToRemove
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

//ToRemove
export const calculateClassTiers = (classTypes: string[]) => {
  let classTier = 0;
  classTypes.forEach((classType) => {
    classTier += classType === "Regular" ? 1 : classType === "Honors" ? 2.5 : 4;
  });
  classTier = Math.floor(classTier / classTypes.length);
  return classTier;
};

//ToRemove
export const getAllClassesFormatted = (classTypes: any[]) => {
  return classTypes.map(({ courseName, courseLevel }, index) => {
    return {
      classID: index,
      name: courseName,
      tier: courseLevel === "Regular" ? 1 : courseLevel === "Honors" ? 2.5 : 4,
    };
  });
};

/**
 * Calculates the student's GPA tier
 * @param applicantLevel What type of applicant the user is, from 0-2 (2 = competitive, 0 = leisurely)
 * @param gpa The student's GPA on a 4-point scale
 * @returns The student's overall GPA tier
 */
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

/**
 * Calculates the fit of the college for a specific student
 * @param accRate Acceptance Rate (%)
 * @param ECTier Student Extracurricular Tier
 * @param courseworkTier Student Coursework Tier
 * @param GPATier Student GPA Tier
 * @param collegeGPAAvg Average GPA of an accepted applicant
 * @param studFirstGen Whether or not the student is first gen (0 = no, 1 = yes)
 * @param studSATScore Student SAT Score (can be super)
 * @param studACTScore Student ACT Score
 * @param collegeSATAvg Average Admitted Applicant SAT Score
 * @param collegeACTAvg Average Admitted Applicant ACT Score
 * @param studentType What type of applicant the user is, from 1-3 (3 = competitive, 1 = leisurely)
 * @param importances The College's importances on each application aspect (detailed below)
 * @returns What the fit of the college is (3 = reach, 2 = target, 1 = safety)
 */
export const calculateCollegeFit = (
  accRate: number,
  ECTier: number,
  courseworkTier: number,
  GPATier: number,
  collegeGPAAvg: number,
  studFirstGen: number,
  //0 for not, 1 for is
  studSATScore: number,
  studACTScore: number,
  collegeSATAvg: number,
  collegeACTAvg: number,
  studentType: number,
  //Leisurely = 3, Avg = 2, Competitive = 1
  importances: number[],
  //Pass importances in as: Coursework, GPA, EC, FirstGen, TestScore
  //0-3

) => {
  //Reach = 3, Target = 2, Safety = 1
  if(accRate <= 15)
  {
    return 3;
  }
  let collegeTier = 0.000754*accRate*accRate-.164*accRate+12.3;
  if(accRate >= 90)
  {
    collegeTier = 2;
  }
  let dSAT = studSATScore - collegeSATAvg;
  if(dSAT > 0)
  {
    dSAT = dSAT/50;
  }
  else
  {
    dSAT = dSAT/30;
  }
  let dACT = studACTScore - collegeACTAvg;
  if(dACT > 0)
  {
    dACT = dACT/2;
  }
  let collegeGPATier = calculateGPATier(studentType, collegeGPAAvg);
  let weightedAvg = importances[0]*(courseworkTier - collegeTier) + importances[1]*(GPATier - collegeGPATier)
                    + importances[2]*(ECTier - collegeTier) + importances[3]*2*studFirstGen + 
                    importances[4]*Math.max(dSAT, dACT);
  if(weightedAvg >= 2)
  {
    return 1;
  }
  if(studentType === 1)
  {
    if(weightedAvg < -1)
    {
      return 3;
    }
    else
    {
      return 2;
    }
  }
  else
  {
    if(weightedAvg < -2)
    {
      return 3;
    }
    else
    {
      return 2;
    }
  }
};


// TODO: Scott does something magical with gradeLevel here
export const calculateCourseworkTier = (
  gradeLevel: number,
  courses9: number,
  courses10: number,
  courses11: number,
  courses12: number,
  intensity9: boolean[],
  intensity10: boolean[],
  intensity11: boolean[],
  intensity12: boolean[],
  majorRelated9: boolean[],
  majorRelated10: boolean[],
  majorRelated11: boolean[],
  majorRelated12: boolean[]
) => {
  // count number of intensive courses taken
  let intense9 = booleanToInt(intensity9);
  let intense10 = booleanToInt(intensity10);
  let intense11 = booleanToInt(intensity11);
  let intense12 = booleanToInt(intensity12);

  // count number of major related courses taken
  let isMajorRelated9 = booleanToInt(majorRelated9);
  let isMajorRelated10 = booleanToInt(majorRelated10);
  let isMajorRelated11 = booleanToInt(majorRelated11);
  let isMajorRelated12 = booleanToInt(majorRelated12);

  // calculate coursework tier for grade
  let courseworkTier9 = courseworkTierGrade(9, courses9, intense9, isMajorRelated9);
  let courseworkTier10 = courseworkTierGrade(10, courses10, intense10, isMajorRelated10);
  let courseworkTier11 = courseworkTierGrade(11, courses11, intense11, isMajorRelated11);
  let courseworkTier12 = courseworkTierGrade(12, courses12, intense12, isMajorRelated12);
  
  // calculate weighed average of tiers
  let courseworkTier = Math.round((courseworkTier9 + courseworkTier10 * 1.5 + courseworkTier11 * 2 + courseworkTier12 * 1.5) / 6);

  return courseworkTier;
};


export const courseworkTierGrade = (
  gradeLevel: number,
  courses: number,
  intensity: number,
  isMajorRelated: number
) => {
  var courseAvg:number[];
  courseAvg = [7, 7, 6, 6];
  var advanced:number[];
  advanced = [0, 1, 2, 3];
  var majorRelated:number[];
  majorRelated = [1, 1, 2, 2];

  var temp0 = Math.sqrt(Math.abs(courses - courseAvg[gradeLevel - 9]));
  if (courseAvg[gradeLevel - 9] > courses) {
    temp0 = temp0 * -1;
  }

  var temp1 = Math.sqrt(Math.abs(intensity - advanced[gradeLevel - 9]));
  if (advanced[gradeLevel - 9] > intensity) {
    temp1 = temp1 * -1;
  }

  var temp2 = Math.sqrt(Math.abs(isMajorRelated - majorRelated[gradeLevel - 9]));
  if (majorRelated[gradeLevel - 9] > isMajorRelated) {
    temp2 = temp2 * -1;
  }

  var tier = temp0 + temp1 + temp2 + 8;

  return tier;
};

// helper method to count number of trues in boolean array
export const booleanToInt = (array: boolean[]) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] == true) {
      count++;
    }
  }

  return count;
};


export const overallAcademicTier = (
  gradeLevel: number,
  applicantLevel: number, 
  gpa: number,
  courseworkTier: number
) => {
  let gpaTier = calculateGPATier(applicantLevel, gpa);
  let academicTier = ((gpaTier * 1.5) + courseworkTier) / 2;
  return Math.round(academicTier);
};