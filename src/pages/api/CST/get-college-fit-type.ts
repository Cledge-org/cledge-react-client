import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { calculateCollegeFit } from "src/utils/student-metrics/metricsCalculations";
import { projection, selectionOfStudentsData, ADMGPACalculation } from "../metrics/get-college-fit-list";

/*
    Takes in students data and a list of college id;
    return the fit type (target, safety, reach) given the college ids.
    For response value explanation: 1 for safety, 2 for target, 3 for reach
    Request format:
    {
        "ECTier": 0,
        "courseworkTier": 0,
        "GPATier": 0,
        "studFirstGen": 0,
        "studSATScore": 0,
        "studACTScore": 0,
        "studentType": 1,
        "collegeIds": ["166018","211893","243744"]
    }

    Response format:
    {
        "166018": 2,
        "211893": 2,
        "243744": 3
    }
*/

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { ECTier, courseworkTier, GPATier, studFirstGen, studSATScore, studACTScore, studentType, collegeIds } = req.body;
    try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const result = await getFitTypes(client, ECTier, courseworkTier, GPATier, studFirstGen, studSATScore, studACTScore, studentType, collegeIds);
        resolve.status(200).send(result);
    } catch (e) {
        resolve.status(500).send(e);
    }
};

export const getFitTypes = (
    client: MongoClient,
    ECTier: number,
    courseworkTier: number,
    GPATier: number,
    studFirstGen: number,
    studSATScore: number,
    studACTScore: number,
    studentType: number,
    collegeIds: any,
): Promise<Object> => {
    return new Promise(async (res, err) => {
        try {
            if (studentType === 0) {
                studentType = 1;
            }
            let collegesRes = await client
                .db("colleges")
                .collection("colleges-data")
                .find({admission: {$exists: true},"UNITID": {$in: collegeIds }})
                .project(projection)
                .toArray();
            let output = {};
            collegesRes.forEach((college) => {
                let collegeFit = 0;
                if (ECTier === null && courseworkTier === null && GPATier === null && studFirstGen === null && studSATScore === null && studACTScore === null) {
                    if (college["ADM_RATE"] != null) {
                        if (college["ADM_RATE"] <= 0.33) {
                            collegeFit = 3;
                        } else if (college["ADM_RATE"] < 0.8) {
                            collegeFit = 2;
                        } else {
                            collegeFit = 1;
                        }
                    }
                } else if (college["ADM_RATE"] != null && college["SAT_AVG"] && college["ACTCMMID"] && "admission" in college && "GPA" in college["admission"] && "selection_of_students" in college["admission"]) {
                    let importances = selectionOfStudentsData(college["admission"]["selection_of_students"]);
                    let collegeADMAvgGPA = ADMGPACalculation(college["admission"]["GPA"]);
                    if (collegeADMAvgGPA != null) {
                        collegeFit = calculateCollegeFit(college["ADM_RATE"] * 100, ECTier, courseworkTier, GPATier, collegeADMAvgGPA, studFirstGen, studSATScore, studACTScore, college["SAT_AVG"], college["ACTCMMID"], studentType, importances);
                    }
                }
                collegeFit = collegeFit == 0 ? 2 : collegeFit;
                output[college["UNITID"]] = collegeFit;
            })
            res(output);
        } catch (e) {
            err(res);
        }
    })
}