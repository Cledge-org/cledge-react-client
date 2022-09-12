import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, partId, part } = JSON.parse(req.body);

  if (part || partId) {
    try {
      const result = await putPart(
        partId ? new ObjectId(partId) : undefined,
        part
      );
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No part data provided");
  }
};

// Admin API. Creates or updates a part - if no ID provided, will create
// part, otherwise will attempt to update given ID
export const putPart = async (
  partId: ObjectId | undefined,
  part: PathwayPart_Db | undefined
): Promise<void> => {
  if (part !== undefined && part._id) {
    // Document should not have _id field when sent to database
    delete part._id;
  }
  if (part) {
    part.dynamicRoutes = part.dynamicRoutes.map(({ type, routeId }) => {
      return {
        type,
        routeId: routeId instanceof ObjectId ? routeId : new ObjectId(routeId),
      };
    });
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!partId && part) {
        await client.db("pathways").collection("parts").insertOne(part);
      } else if (partId && !part) {
        await client
          .db("pathways")
          .collection("parts")
          .deleteOne({ _id: partId });
      } else if (partId && part) {
        await client
          .db("pathways")
          .collection("parts")
          .updateOne({ _id: partId }, { $set: part }, { upsert: true });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
