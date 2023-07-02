import { NextApiRequest, NextApiResponse } from 'next';
import dicts from "../..../../../../college-search-tool/assets/cst_result_parse.json";
import { MongoClient } from "mongodb";


// TODO: Grab the selected college from the User somehow and also get college data given name of college

// store the college id and user id from CST details page into database
// when student metrics page is opened, get this information from database 
// and then get college data based on user id and college id that is stored
// overwrite college id every time user selects new college

// write a request to database to get certain fields from database not all of them
// figure out which fields i actually need for this page

// ricky will help implement frontend backend sync thingy
// create new collection under users 

// copied from get-college-list.ts
export const getCollegeList = (userId: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("users");
      const collegelist: CollegeDB = (await users_db
        .collection("college-list")
        .findOne({
          firebaseId: userId,
        })) as CollegeDB;
      if (!collegelist) {
        res(null);
      } else {
        res({
          list: collegelist.college_list,
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}

// need two api calls, keep them separate to make it easier, dont combine into one method for now
export const getSingleCollegeInfo = (collegeId: String): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegedata_db = await client.db("colleges");
      const singleCollegeData = await collegedata_db
        .collection("colleges-data")
        .findOne({ college_id: collegeId });
      let output = formatOutput(singleCollegeData, client, err);
      res(output);
    } catch (e) {
      err(res);
    }
  });
};

// copied over from get-single-college.ts class for visualization
export const getSingleCollegeInfo = (collegeId: String): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegedata_db = await client.db("colleges");
      const singleCollegeData = await collegedata_db
        .collection("colleges-data")
        .findOne({ college_id: collegeId });
      let output = formatOutput(singleCollegeData, client, err);
      res(output);
    } catch (e) {
      err(res);
    }
  });
};

// format output to only grab fields needed
// also copied over from get-single-college.ts class
const formatOutput = async (college: any,  client: MongoClient, err: any) => {
  try {
    const output = {
      college_id: college["college_id"],
      title: college["INSTNM"],
      college_type: dicts.college_type_dict[college["CONTROL"]],
      abbreviation: college["IALIAS"],
      "sat/act_score": {
        sat_critical_reading_25: college["SATVR25"],
        sat_critical_reading_75: college["SATVR75"],
        sat_math_25: college["SATMT25"],
        sat_math_75: college["SATMT75"],
        sat_writing_25: null, // college["SATWR25"]; need to find valid data
        sat_writing_75: null, // college["SATWR75"]
        sat_critical_reading_50: college["SATVRMID"],
        sat_math_50: college["SATMTMID"],
        sat_writing_50: null, // college["SATWRMID"]
        act_cumulative_25: college["ACTCM25"],
        act_cumulative_50: college["ACTCMMID"],
        act_cumulative_75: college["ACTCM75"],
        sat_avg: college["SAT_AVG"],
      },
      acceptance_rate: {
        acceptance_rate_total: college["ADM_RATE"],
        acceptance_rate_men: college["DVADM02"],
        acceptance_rate_women: college["DVADM03"],
        commit_rate_men: college["DVADM08"],
        commit_rate_women: college["DVADM09"],
      },
      submit_sat_percent: college["SATPCT"],
      submit_act_percent: college["ACTPCT"],
      offer_rotc: dicts.binary[college["SLO5"]],
      applicants_per_year: (college["APPLCNM"] && college["APPLCNW"]) ? (college["APPLCNW"] + college["APPLCNM"]) : null,
      matriculation_rate: null,
      admission_factors: {
        high_school_gpa: dicts.adm_factors[college["ADMCON1"]],
        high_school_rank: dicts.adm_factors[college["ADMCON2"]],
        high_school_record: dicts.adm_factors[college["ADMCON3"]],
        completion_college_prep: dicts.adm_factors[college["ADMCON4"]],
        letters_of_recommendation: dicts.adm_factors[college["ADMCON5"]],
        formal_demonstration_of_competencies:
          dicts.adm_factors[college["ADMCON6"]],
        standardized_test_scores: dicts.adm_factors[college["ADMCON7"]],
      },
      college_fit_metric: {
        target: college["TARGET_TIER"],
        safety: college["SAFETY_TIER"],
      }
    };
      output["admission"] = college["admission"];
      output["financials"] = college["financials"];
      output["academics"] = college["academics"];
      output["campus_life"] = college["campus_life"];
      output["students"] = college["students"];
      output["undergraduate majors"] = college["undergraduate majors"];

    return output;
  } catch (e) {
    console.log(e)
    err(e);
    return {};
  }
};

//     "Not Considered": 0,
//     "Considered": 1,
//     "Important": 2,
//     "Very Important": 3,
//     "Not Reported": 0
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
  } else if (consideration == "Very Important") {
    collegeTier++;
  }

  return collegeTier;
}