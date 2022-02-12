import { InsertOneResult, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayId, pathway } = JSON.parse(req.body);

  if (pathway) {
    try {
      const result = await putPathway(
        pathwayId ? new ObjectId(pathwayId) : undefined,
        pathway
      );
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No pathway data provided");
  }
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID
export const putPathway = async (
  pathwayId: ObjectId | undefined,
  pathway: Pathway_Db
): Promise<void> => {
  if (pathway._id) {
    // Document should not have _id field when sent to database
    delete pathway._id;
  }
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!pathwayId) {
            await client
              .db("pathways")
              .collection("pathways")
              .insertOne(pathway);
          } else {
            await client
              .db("pathways")
              .collection("pathways")
              .updateOne({ _id: pathwayId }, { $set: pathway });
          }
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
