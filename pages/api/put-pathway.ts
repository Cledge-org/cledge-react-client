import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayId, pathway } = JSON.parse(req.body);
  return pathway
    ? resolve.status(200).send(await putCourse(pathwayId, pathway))
    : resolve.status(400).send("No pathway data provided");
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID. Returns ID of upserted
// pathway document
export const putCourse = async (
  pathwayId: string | undefined,
  pathway: Pathway_Db
): Promise<string> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("courses")
            .collection("courses")
            .updateOne(
              { _id: new ObjectId(pathwayId) },
              { $set: pathway },
              { upsert: true }
            );
          res(updateResult.upsertedId.toString());
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
