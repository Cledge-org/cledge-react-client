import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const reqBodyJson = req.body;
    try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const result = await getAllColleges(client);
        resolve.status(200).send(result);
    } catch (e) {
        resolve.status(500).send(e);
    }
};

const getAllColleges = (
    client: MongoClient
): Promise<Object> => {
    return new Promise(async(res, err) => {
        try {
            const collegesRes = await client
                .db("colleges")
                .collection("colleges-data")
                .find()
                .toArray();
            let output = [];
            collegesRes.forEach((eachCollege) => {
                output.push(eachCollege["UNITID"]);
            });
            res(output);
        } catch (e) {
            err(res);
        }
    })
}

/* fit variable need (0 fit if no data)
School size: UGDS
Avg total cost of attendance: COTSOFF for default, if prefer in-state college then use CINSOFF
public/private: CONTROL
urban/rural: LOCALE
in-state/out-state: STABBR
avg class size: Regular class size, need calculation
financial aid need based: financials/undergraduate_19_20_profile, Average Award
financial aid merit based: financials/undergraduate_19_20_profile, Merit-Based Gift
*/

/* student performance fit
accRate: ADM_RATE
collegeGPAAvg: admission/GPA, based on calculation (median of each level * percentage, round up to 2 decimals)
collegeSATAvg: SAT_AVG
collegeACTAvg: ACTCMMID
importances: admission/selection_of_students, [Class Rank, Academic GPA, Extracurricular Activities, First Generation to Attend College, Standardized Tests]
*/

const ADMGPACalculation = (gpa) => {
    let overallgpa = 0.0;
    Object.entries(gpa).forEach(([key, value], index) => {
        const curGPARange = key.split(" ");

    })
}