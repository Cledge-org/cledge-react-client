const { calculateGPATier, calculateTimeTier, calculateAwardTier, calculateLeadershipTier } = module.exports;


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
module.exports.calculateECTier = (
    hoursPerWeek,
    weeksPerYear,
    yearsSpent,
    awardScale,
    awardQuality,
    leadershipTier,
    impactTier,
) => {
    let timeTier = module.exports.calculateTimeTier(hoursPerWeek, weeksPerYear, yearsSpent);
    let awardTier = module.exports.calculateAwardTier(awardScale, awardQuality);
    let leadingTier = module.exports.calculateLeadershipTier(leadershipTier, impactTier);
    let tier = (timeTier * 3 + awardTier * 1 + leadingTier * 1) / 5;
    return Math.round(tier);
};

//Calculates the tier for the time aspect of an extracurricular.
module.exports.calculateTimeTier = (
    hoursPerWeek,
    weeksPerYear,
    yearsSpent,
) => {
    if (hoursPerWeek < 0 || weeksPerYear < 0 || yearsSpent < 1) {
        return -1;
    }
    let tier = yearsSpent;
    if (hoursPerWeek <= 3) {
        tier += 1;
    }
    else if (hoursPerWeek > 25) {
        tier += 6;
    }
    else {
        tier += (hoursPerWeek / 5) - ((hoursPerWeek / 5) % 1) + 2;
    }
    if (weeksPerYear > 40) {
        tier += 4;
    }
    else {
        tier += (weeksPerYear - 10) / 15 + (((weeksPerYear - 10) / 15) % 1) + 2;
    }
    if (tier > 12) {
        return 12;
    }
    return tier;
};

//Calculates the tier for the award aspect of an extracurricular.
module.exports.calculateAwardTier = (
    awardScale,
    awardQuality,
) => {
    if (awardScale < 0 || awardScale > 4 || awardQuality < 0 || awardQuality > 4) {
        return -1;
    }
    let tier = 2 * awardQuality + awardScale + 1;
    if (tier > 12) {
        return 12;
    }
    return tier;
};

//Calculates the tier for the leadership aspect of an extracurricular.
module.exports.calculateLeadershipTier = (
    leadershipTier,
    impactTier,
) => {
    if (leadershipTier < 0 || leadershipTier > 4 || impactTier < 0 || impactTier > 4) {
        return -1;
    }
    let tier = 2 * leadershipTier + impactTier + 1;
    if (tier > 12) {
        return 12;
    }
    return tier;
};

/**
 * Calculates the student's overall extracurricular tier, given their extracurricular list
 * @param tiers The individual extracurricular tiers of the student's activities
 * @returns The student's overall extracurricular tier (int from 1-12)
 */
module.exports.calculateOverallECTier = (tiers) => {
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

/**
* Calculates the student's GPA tier
* @param applicantLevel What type of applicant the user is, from 0-2 (2 = competitive, 0 = leisurely)
* @param gpa The student's GPA on a 4-point scale
* @returns The student's overall GPA tier
*/
module.exports.calculateGPATier = (applicantLevel, gpa) => {
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

module.exports.overallAcademicTier = (
    gradeLevel,
    applicantLevel,
    gpa,
    courseworkTier,
) => {
    let gpaTier = module.exports.calculateGPATier(applicantLevel, gpa);
    let academicTier = ((gpaTier * 1.5) + courseworkTier) / 2;
    return Math.round(academicTier);
};


module.exports.calculateCourseworkTier = (
    gradeLevel,
    courses9,
    courses10,
    courses11,
    courses12,
    intensity9,
    intensity10,
    intensity11,
    intensity12,
    majorRelated9,
    majorRelated10,
    majorRelated11,
    majorRelated12
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
  
  
  module.exports.courseworkTierGrade = (
    gradeLevel,
    courses,
    intensity,
    isMajorRelated
  ) => {
    var courseAvg;
    courseAvg = [7, 7, 6, 6];
    var advanced;
    advanced = [0, 1, 2, 3];
    var majorRelated;
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
  module.exports.booleanToInt = (array) => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == true) {
        count++;
      }
    }
  
    return count;
  };

  const { booleanToInt } = module.exports;
