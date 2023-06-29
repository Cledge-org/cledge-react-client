import { NextApiRequest, NextApiResponse } from 'next';
import { getCollegeInfo } from "src/pages/api/CST/college-search-tool"
import { getSingleCollegeInfo } from "src/pages/api/CST/get-single-college"
import { getAllColleges } from "src/pages/api/metrics/get-college-fit-list"
import { MongoClient } from "mongodb";


// TODO: 


// fetch user input and return selected college
async function fetchCollegeData(req: NextApiRequest, resolve: NextApiResponse) {
    try {
      const { college_id } = req.body;
      const collegeSearchResult = await getSingleCollegeInfo(college_id);
      return collegeSearchResult;
    } catch (error) {
      return null;
    }
}

// need for all categories? figure out which categories
//   const selectionOfStudentMapping = {
//     "Not Considered": 0,
//     "Considered": 1,
//     "Important": 2,
//     "Very Important": 3,
//     "Not Reported": 0
// }
export const calculateCollegeTierAccRate = (
  accRate: number,
  consideration: string
) => {
  let collegeTier = 0;
  if (accRate <= 15) {
    collegeTier = 10; // set it to "reach" 
  } else if (accRate > 90) {
    collegeTier = 2;
  } else {
    collegeTier = Math.round(0.000754 * (accRate ** 2) - (0.164 * accRate) + 12.3)
  }
  if (consideration == "Considered") {
    collegeTier--;
  } else if (consideration == "Very Import") {
    collegeTier++;
  }

  return collegeTier;
}

