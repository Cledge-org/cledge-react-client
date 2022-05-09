import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, resourceId, vote } = JSON.parse(req.body);
  if (resourceId) {
    try {
      const result = await rateResource(resourceId, userId, vote);
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
  userId: string,
  vote: boolean
): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      const resourceVoters: ResourceVoters = await client
        .db("resources")
        .collection("voters-by-resource")
        .findOne({ resource_id: resourceId });

      let wasDownvote = false;
      let wasUpvote = false;

      if (resourceVoters) {
        wasDownvote =
          resourceVoters.downvotes && resourceVoters.downvotes.includes(userId);
        wasUpvote =
          resourceVoters.upvotes && resourceVoters.upvotes.includes(userId);
      }

      if (vote) {
        if (!wasUpvote) {
          await client
            .db("resources")
            .collection("voters-by-resource")
            .updateOne(
              { resource_id: resourceId },
              {
                $addToSet: { upvotes: userId },
                $pullAll: { downvotes: [userId] },
              },
              { upsert: true }
            );
          const update = { $inc: { upvotes: 1, downvotes: 0 } };
          if (wasDownvote) {
            // If user was previously a downvote, decrement downvotes to replace
            // with upvote
            update.$inc.downvotes = -1;
          }
          await client
            .db("resources")
            .collection("all_resources")
            .updateOne({ _id: resourceId }, update);
        }
      } else {
        if (!wasDownvote) {
          await client
            .db("resources")
            .collection("voters-by-resource")
            .updateOne(
              { resource_id: resourceId },
              {
                $addToSet: { downvotes: userId },
                $pullAll: { upvotes: [userId] },
              },
              { upsert: true }
            );
          const update = { $inc: { upvotes: 0, downvotes: 1 } };
          if (wasUpvote) {
            // If user was previously a upvote, decrement upvotes to replace
            // with downvote
            update.$inc.upvotes = -1;
          }
          await client
            .db("resources")
            .collection("all_resources")
            .updateOne({ _id: resourceId }, update);
        }
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
