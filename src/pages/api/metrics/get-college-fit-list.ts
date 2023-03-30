import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { calculateCollegeFit } from "src/utils/student-metrics/metricsCalculations";


/*
    request form:
    {
        preferences: {
            <variable (e.g. school size)> : {
                <low_val (lower bound)> : , (low_val === high_val for categorical value)
                <high_val (upper bound)> : ,
                <preferenceLevel (e.g. 1, 3, 5)>: ,
            }
        }
        ECTier: ,
        courseworkTier: ,
        GPATier: ,
        studFirstGen: ,
        studSATScore: ,
        studACTScore: ,
        studentType: ,
    }
*/

/* fit variable need (0 fit if no data)
School size: UGDS
Avg total cost of attendance: COTSOFF for default, if prefer in-state college then use CINSOFF
public/private: CONTROL
urban/rural: LOCALE
in-state/out-state: STABBR
avg class size: academics/Regular class size, need calculation
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

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { preferences, ECTier, courseworkTier, GPATier, studFirstGen, studSATScore, studACTScore, studentType } = req.body;
    try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const result = await getAllColleges(client, preferences, ECTier, courseworkTier, GPATier, studFirstGen, studSATScore, studACTScore, studentType);
        resolve.status(200).send(result);
    } catch (e) {
        resolve.status(500).send(e);
    }
};

const getAllColleges = (
    client: MongoClient,
    preferences: any,
    ECTier: number,
    courseworkTier: number,
    GPATier: number,
    studFirstGen: number,
    studSATScore: number,
    studACTScore: number,
    studentType: number,
): Promise<Object> => {
    return new Promise(async(res, err) => {
        try {
            const collegesRes = await client
                .db("colleges")
                .collection("colleges-data")
                .find({admission: {$exists: true}})
                .project(projection)
                .toArray();
            let safety = [];
            let target = [];
            let reach = [];
            collegesRes.forEach((college) => {
                let preferenceFit = calculatePreferenceFit(college, preferences);
                let collegeFit = 0;
                if (college["ADM_RATE"] != null && college["SAT_AVG"] && college["ACTCMMID"] && "admission" in college && "GPA" in college["admission"] && "selection_of_students" in college["admission"]) {
                    let importances = selectionOfStudentsData(college["admission"]["selection_of_students"]);
                    let collegeADMAvgGPA = ADMGPACalculation(college["admission"]["GPA"]);
                    if (collegeADMAvgGPA != null) {
                        collegeFit = calculateCollegeFit(college["ADM_RATE"], ECTier, courseworkTier, GPATier, collegeADMAvgGPA, studFirstGen, studSATScore, studACTScore, college["SAT_AVG"], college["ACTCMMID"], studentType, importances);
                    }
                }
                let collegeRankInfo = [college["UNITID"], college["INSTNM"], preferenceFit];
                if (collegeFit === 1) {
                    safety.push(collegeRankInfo);
                } else if (collegeFit === 2) {
                    target.push(collegeRankInfo);
                } else if (collegeFit === 3) {
                    reach.push(collegeRankInfo);
                }
            });
            let [safetyCount, targetCount, reachCount] = studentTypeData[studentType];
            // prevent missing college in one fit category
            if (safety.length < safetyCount) {
                let safetyDiff = safetyCount - safety.length;
                safetyCount -= safetyDiff;
                targetCount += safetyDiff;
            }
            if (target.length < targetCount) {
                let targetDiff = targetCount - target.length;
                targetCount -= targetDiff;
                reachCount += targetDiff;
            }
            if (reach.length < reachCount) {
                let reachDiff = reachCount - reach.length;
                reachCount -= reachDiff;
                targetCount += reachDiff;
            }
            const output = {
                safety: getRankByPreferenceFit(safety, safetyCount),
                target: getRankByPreferenceFit(target, targetCount),
                reach: getRankByPreferenceFit(reach, reachCount)
            }
            res(output);
        } catch (e) {
            err(res);
        }
    })
}

/*
    Preferences:
    schoolSize
    costOfAttendance
    schoolPreference (1 for public, 2 for private)
    localePreference (urban/rural) (1 for urban, 2 for suburban, 3 for rural)
    statePreference (<state name> for in-state, "not <state name>" for out-state)
    classSize
    finAidNeed (0-30, 30-60, >60; close range is 5)
    finAidMerit (0-10, 10-20, >20; close range is 2)
*/
const calculatePreferenceFit = (
    college: any,
    preferences: any
) => {
    let fitVal = 0;
    // in-state + public + low-cost of attendance
    let statePreferenceParam = 1;
    let schoolPreferenceParam = 1;
    if ("statePreference" in preferences && "schoolPreference" in preferences && "costOfAttendance" in preferences) {
        if (preferences["statePreference"]["low_val"].split(" ").length === 1 && preferences["schoolPreference"]["low_val"] === 1 && preferences["costOfAttendance"]["low_val"] === 0) {
            statePreferenceParam = 2;
            schoolPreferenceParam = 2;
        }
    }
    // preference for schoolSize
    if ("schoolSize" in preferences) {
        let schoolSizeInfo = preferences["schoolSize"];
        if (college["UGDS"] != null) {
            if (college["UGDS"] >= schoolSizeInfo["low_val"] - 1000) {
                if ("high_val" in schoolSizeInfo && college["UGDS"] <= schoolSizeInfo["high_val"] + 1000) {
                    fitVal += schoolSizeInfo["preferenceLevel"];
                } else if (!("high_val" in schoolSizeInfo)) {
                    fitVal += schoolSizeInfo["preferenceLevel"];
                }
            }
            if (college["UGDS"] >= schoolSizeInfo["low_val"]) {
                if ("high_val" in schoolSizeInfo && college["UGDS"] <= schoolSizeInfo["high_val"]) {
                    fitVal += schoolSizeInfo["preferenceLevel"];
                } else if (!("high_val" in schoolSizeInfo)) {
                    fitVal += schoolSizeInfo["preferenceLevel"];
                }
            }
        }
    }
    // preference for costOfAttendance
    if ("costOfAttendance" in preferences) {
        let costOfAttendanceInfo = preferences["costOfAttendance"];
        if (college["CINSOFF"] != null) {
            let collegeCostofAttendance = college["CINSOFF"];
            if (preferences["schoolPreference"] && preferences["schoolPreference"]["low_val"] === 1) {
                collegeCostofAttendance = college["COTSOFF"] ? college["COTSOFF"] : collegeCostofAttendance;
            }
            if (collegeCostofAttendance >= costOfAttendanceInfo["low_val"] - 5000) {
                if ("high_val" in costOfAttendanceInfo && collegeCostofAttendance <= costOfAttendanceInfo["high_val"] + 5000) {
                    fitVal += costOfAttendanceInfo["preferenceLevel"];
                } else if (!("high_val" in costOfAttendanceInfo)) {
                    fitVal += costOfAttendanceInfo["preferenceLevel"];
                }
            }
            if (collegeCostofAttendance >= costOfAttendanceInfo["low_val"]) {
                if ("high_val" in costOfAttendanceInfo && collegeCostofAttendance <= costOfAttendanceInfo["high_val"]) {
                    fitVal += costOfAttendanceInfo["preferenceLevel"];
                } else if (!("high_val" in costOfAttendanceInfo)) {
                    fitVal += costOfAttendanceInfo["preferenceLevel"];
                }
            }
        }
    }
    // preference for schoolPreference
    if ("schoolPreference" in preferences) {
        let schoolPreferenceInfo = preferences["schoolPreference"];
        if (college["CONTROL"] != null) {
            if (college["CONTROL"] === schoolPreferenceInfo["low_val"] || (college["CONTROL"] === 3 && schoolPreferenceInfo["low_val"] === 2)) {
                fitVal += schoolPreferenceInfo["preferenceLevel"] * 2 * schoolPreferenceParam;
            }
        }
    }
    // preference for localePreference
    if ("localePreference" in preferences) {
        let localePreferenceInfo = preferences["localePreference"];
        if (college["LOCALE"] != null) {
            let collegeLocaleVal = Math.floor(college["LOCALE"] / 10);
            if (localePreferenceInfo["low_val"] < 3) {
                if (localePreferenceInfo["low_val"] === collegeLocaleVal) {
                    fitVal += localePreferenceInfo["preferenceLevel"] * 2;
                }
            } else if ((localePreferenceInfo["low_val"] === 2 && collegeLocaleVal === 3) || (localePreferenceInfo["low_val"] === 3 && collegeLocaleVal === 4)) {
                fitVal += localePreferenceInfo["preferenceLevel"] * 2;
            }
        }
    }
    // preference for statePreference
    if ("statePreference" in preferences) {
        let statePreferenceInfo = preferences["statePreference"];
        if (college["STABBR"] != null) {
            let state = statePreferenceInfo["low_val"].split(" ");
            if (state.length === 1) {
                if (state[0] === college["STABBR"]) {
                    fitVal += statePreferenceInfo["preferenceLevel"] * 2 * statePreferenceParam;
                }
            } else {
                if (state[1] != college["STABBR"]) {
                    fitVal += statePreferenceInfo["preferenceLevel"] * 2 * statePreferenceParam;
                }
            }
        }
    }
    // preference for classSize
    if ("classSize" in preferences) {
        let classSizeInfo = preferences["classSize"];
        if (college["academics"] != null && college["academics"]["Regular Class Size"] != null) {
            let collegeAvgClassSize = avgClassSizeCalculation(college["academics"]["Regular Class Size"]);
            if (collegeAvgClassSize != null) {
                if (collegeAvgClassSize >= classSizeInfo["low_val"] - 5) {
                    if ("high_val" in classSizeInfo && collegeAvgClassSize <= classSizeInfo["high_val"] + 5) {
                        fitVal += classSizeInfo["preferenceLevel"];
                    } else if (!("high_val" in classSizeInfo)) {
                        fitVal += classSizeInfo["preferenceLevel"];
                    }
                }
                if (collegeAvgClassSize >= classSizeInfo["low_val"]) {
                    if ("high_val" in classSizeInfo && collegeAvgClassSize <= classSizeInfo["high_val"]) {
                        fitVal += classSizeInfo["preferenceLevel"];
                    } else if (!("high_val" in classSizeInfo)) {
                        fitVal += classSizeInfo["preferenceLevel"];
                    }
                }
            }
        }
    }
    // preference for finAidNeed
    if ("finAidNeed" in preferences) {
        let finAidNeedInfo = preferences["finAidNeed"];
        if (college["financials"] != null && college["financials"]["freshman_19_20_profile"] != null && college["COTSOFF"]) {
            let finAidProfile = college["financials"]["freshman_19_20_profile"];
            if (finAidProfile["Average Award"] != null && finAidProfile["Average Award"]["overall"] != null) {
                let collegeAidCostCover = finAidParse(finAidProfile["Average Award"]["overall"]) / college["COTSOFF"] * 100;
                if (collegeAidCostCover >= finAidNeedInfo["low_val"] - 5) {
                    if ("high_val" in finAidNeedInfo && collegeAidCostCover <= finAidNeedInfo["high_val"] + 5) {
                        fitVal += finAidNeedInfo["preferenceLevel"];
                    } else if (!("high_val" in finAidNeedInfo)) {
                        fitVal += finAidNeedInfo["preferenceLevel"];
                    }
                }
                if (collegeAidCostCover >= finAidNeedInfo["low_val"]) {
                    if ("high_val" in finAidNeedInfo && collegeAidCostCover <= finAidNeedInfo["high_val"]) {
                        fitVal += finAidNeedInfo["preferenceLevel"];
                    } else if (!("high_val" in finAidNeedInfo)) {
                        fitVal += finAidNeedInfo["preferenceLevel"];
                    }
                }
            }
        }
    }
    // preference for finAidMerit
    if ("finAidMerit" in preferences) {
        let finAidMeritInfo = preferences["finAidMerit"];
        if (college["financials"] != null && college["financials"]["freshman_19_20_profile"] != null && college["COTSOFF"]) {
            let finAidProfile = college["financials"]["freshman_19_20_profile"];
            if (finAidProfile["Merit-Based Gift"] != null) {
                let collegeAidCostCover = finAidParse(finAidProfile["Merit-Based Gift"]) / college["COTSOFF"] * 100;
                if (collegeAidCostCover >= finAidMeritInfo["low_val"] - 2) {
                    if ("high_val" in finAidMeritInfo && collegeAidCostCover <= finAidMeritInfo["high_val"] + 2) {
                        fitVal += finAidMeritInfo["preferenceLevel"];
                    } else if (!("high_val" in finAidMeritInfo)) {
                        fitVal += finAidMeritInfo["preferenceLevel"];
                    }
                }
                if (collegeAidCostCover >= finAidMeritInfo["low_val"]) {
                    if ("high_val" in finAidMeritInfo && collegeAidCostCover <= finAidMeritInfo["high_val"]) {
                        fitVal += finAidMeritInfo["preferenceLevel"];
                    } else if (!("high_val" in finAidMeritInfo)) {
                        fitVal += finAidMeritInfo["preferenceLevel"];
                    }
                }
            }
        }
    }

    return fitVal;
}

const getRankByPreferenceFit = (fit: any[], rank: number) => {
    return fit.sort((first, second) => second[2] - first[2]).slice(0, rank);
}

const avgClassSizeCalculation = (classSize: { [id: string] : string; }) => {
    let avgClassSize = 0;
    Object.entries(classSize).forEach(([key, value], index) => {
        let keyInfo = key.split(" ");
        let studentNum = 0;
        let percent = 0;
        if (value != null && value != "" && value != "Not Reported") {
            percent = parseInt(value.slice(0, -1));
        } else {
            return null;
        }
        if (keyInfo.length === 3) {
            studentNum = parseInt(keyInfo[1]);
        } else if (keyInfo.length === 2) {
            studentNum = (parseInt(keyInfo[0].split("-")[0]) + parseInt(keyInfo[0].split("-")[1])) / 2;
        }
        avgClassSize += studentNum * percent / 100;
    });
    return avgClassSize;
}

const finAidParse = (finAidStr: string) => {
    let finAidStrSplit = finAidStr.split("$");
    return parseInt(finAidStrSplit[finAidStrSplit.length - 1].replace(/,/g, ''));
}

const ADMGPACalculation = (gpa: { [id: string] : string; }) => {
    let overallgpa = 0;
    Object.entries(gpa).forEach(([key, value], index) => {
        const curGPARange = key.split(" ");
        let curGPARangeAvg = 0;
        let percent = 0;
        if (value != null && value != "" && value != "Not Reported") {
            percent = parseInt(value.slice(0, -1));
        } else {
            return null;
        }
        if (curGPARange[1] === "-") {
            curGPARangeAvg = (parseFloat(curGPARange[0]) + parseFloat(curGPARange[2])) / 2;
        } else {
            curGPARangeAvg = parseFloat(curGPARange[0]);
        }
        overallgpa += percent * curGPARangeAvg;
    })
    return overallgpa;
}

const selectionOfStudentsData = (selections) => {
    let importances = [];
    importancesAttributes.forEach((value) => {
        if (value in selections) {
            if (selections[value] != null) {
                importances.push(selectionOfStudentMapping[selections[value]]);
            }
        } else {
            importances.push(0);
        }
    })
    return importances;
}

const projection = {
    _id: 0,
    UNITID: 1,
    INSTNM: 1,
    UGDS: 1,
    COTSOFF: 1,
    CINSOFF: 1,
    CONTROL: 1,
    LOCALE: 1,
    STABBR: 1,
    ADM_RATE: 1,
    SAT_AVG: 1,
    ACTCMMID: 1,
    academics: 1,
    admission: 1,
    financials: 1
};

const studentTypeData = {
    1: [6, 5, 4],
    2: [4, 6, 5],
    3: [2, 5, 8]
}

const selectionOfStudentMapping = {
    "Not Considered": 0,
    "Considered": 1,
    "Important": 2,
    "Very Important": 3,
    "Not Reported": 0
}

const importancesAttributes = ["Class Rank", "Academic GPA", "Extracurricular Activities", "First Generation to Attend College", "Standardized Tests"];