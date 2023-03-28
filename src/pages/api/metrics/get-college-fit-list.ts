import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    try {

    } catch (e) {
        resolve.status(500).send(e);
    }
};

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