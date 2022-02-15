import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import AuthFunctions from "./auth/firebase-auth";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { contentProgress, userId } = JSON.parse(req.body);

  if (contentProgress) {
    try {
      const result = await putPathwayProgress(userId, contentProgress);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No pathway content progress or userId provided");
  }
};

// Sets pathway content progress for a user by their firebase ID (string). Batch
// update between module ID as a string and ContentProgress[]. If a module is in
// the map, the value in the database will be set to its corresponding value in
// the map provided. If a module is not provided, it will not be updated in the
// database
export const putPathwayProgress = async (
  userId: string,
  contentProgress: Record<string, ContentProgress[]> // Map between module ID and a list of ContentProgress for that module
): Promise<boolean> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      let updateResult = await client
        .db("pathways")
        .collection("progress-by-user")
        .updateOne(
          { firebaseId: userId },
          { $set: contentProgress },
          { upsert: true }
        );
      res(updateResult.acknowledged);
    } catch (e) {
      err(e);
    }
  });
};
