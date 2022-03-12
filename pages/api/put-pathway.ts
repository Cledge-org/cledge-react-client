import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
  pathway: Pathway_Db | undefined
): Promise<void> => {
  if (pathway._id) {
    // Document should not have _id field when sent to database
    delete pathway._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!pathwayId && pathway) {
        await client.db("pathways").collection("pathways").insertOne(pathway);
      } else if (pathwayId && !pathway) {
        await client
          .db("pathways")
          .collection("pathways")
          .deleteOne({ _id: pathwayId });
      } else if (pathwayId && pathway) {
        await client
          .db("pathways")
          .collection("pathways")
          .updateOne({ _id: pathwayId }, { $set: pathway }, { upsert: true });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
