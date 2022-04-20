import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, resourceId, vote } = req.body;
  if (resourceId) {
    try {
      const result = await rateResource(resourceId, vote);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No resource ID provided");
  }
};

// Rates resource of given resourceId. Vote is a boolean that represents an
// upvote (true) or downvote (false), which will increment the corresponding
// resource's respective upvote or downvote counters of the resource document
export const rateResource = async (
  resourceId: ObjectId,
  vote: boolean
): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      if (vote) {
        await client
          .db("resources")
          .collection("all_resources")
          .updateOne({ _id: resourceId }, { $inc: { upvotes: 1 } });
      } else {
        await client
          .db("resources")
          .collection("all_resources")
          .updateOne({ _id: resourceId }, { $inc: { downvotes: 1 } });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
