import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";
import { AcademicsProps } from "src/main-pages/CheckInPage/Components/AcademicsSignUp";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, academics, applicantType, insertionId, responses } = JSON.parse(
    req.body
  );
  try {
    if (academics) {
      academics.gpaTip = getGPATip(academics.gpaTier);
      academics.classTip = getClassTip(
        academics.overallClassTier,
        academics.gpaTier
      );
      academics.testTip = getTestTip(
        academics.satScore,
        academics.actScore,
        applicantType
      );
    }
    const result = await putAcademics(userId, academics, responses, insertionId);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Creates, deletes, or updates academics - if no academicsID provided, will
// create academics list. If academicsID provided but no academics list, will
// delete the document with the given academicsID. If academicsID and academics list
// are provided, will update the academics list that corresponds to the given academicsID.
export const putAcademics = (
  userId: string,
  academics: Academics | undefined,
  responses: AcademicsProps | undefined,
  insertionId: string
): Promise<void> => {
  if (academics !== undefined && academics._id && userId) {
    // Document should not have _id field when sent to database
    delete academics._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (academics && insertionId) {
        await client
          .db("metrics")
          .collection("academics")
          .insertOne({
            firebaseId: insertionId,
            ...academics,
            responses
          });
      } else if (userId && !academics) {
        await client.db("metrics").collection("academics").deleteOne({
          firebaseId: userId,
        });
      } else if (userId && academics) {
        await client.db("metrics").collection("academics").updateOne(
          {
            firebaseId: userId,
          },
          { $set: academics }
        );
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};

// Gets a user's GPA tip based on their GPA tier.
function getGPATip(gpaTier: number): string {
  try {
    const bar1 = 7;
    const bar2 = 10;
    let gpaTip = "";
    if (gpaTier < bar1) {
      gpaTip = "Low GPA";
    } else if (gpaTier < bar2) {
      gpaTip = "Medium GPA";
    } else {
      gpaTip = "You're doing great! High GPA";
    }
    return gpaTip;
  } catch (e) {
    console.log(e);
  }
}

function getClassTip(overallClassTier: number, gpaTier: number): string {
  try {
    const gpaBar = 10;
    const classBar = 8;
    let classTip = "";
    if (gpaTier < gpaBar) {
      classTip = "We recommend you focus on GPA first";
    } else if (overallClassTier < classBar) {
      classTip =
        "If you have the time, we recommend looking to increase course load.";
    } else {
      classTip =
        "Your GPA and coursework are excellent! If you have additional time, we recommend focusing on extracurriculars.";
    }
    return classTip;
  } catch (e) {
    console.log(e);
  }
}

function getTestTip(
  satScore: number,
  actScore: number,
  applicantType: number
): string {
  try {
    let SATBar = 1520;
    let ACTBar = 34;
    let testTip = "";
    if (applicantType == 0) {
      SATBar = 1200;
      ACTBar = 25;
    } else if (applicantType == 1) {
      SATBar = 1350;
      ACTBar = 30;
    }

    if (satScore < SATBar && actScore < ACTBar) {
      testTip = "Your standardized test scores could be improved.";
    } else {
      testTip =
        "Your standardized test scores are great! We recommend focusing on other areas now.";
    }
    return testTip;
  } catch (e) {
    console.log(e);
  }
}
