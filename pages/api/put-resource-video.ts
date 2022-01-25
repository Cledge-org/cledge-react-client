import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, videoId, video } = JSON.parse(req.body);
  console.error(video);
  return video
    ? resolve
        .status(200)
        .send(
          await putResourceVideo(
            videoId ? new ObjectId(videoId) : undefined,
            video
          )
        )
    : resolve.status(400).send("No video provided");
};

// Admin API. Creates or updates a resource video - if no ID provided, will
// create video, otherwise will attempt to update given ID
export const putResourceVideo = async (
  videoId: ObjectId | undefined,
  video: CardVideo
): Promise<void> => {
  return new Promise((res, err) => {
    if (video._id) {
      // Document should not have _id field when sent to database
      delete video._id;
    }
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!videoId) {
            await client.db("resources").collection("videos").insertOne(video);
          } else {
            await client
              .db("resources")
              .collection("videos")
              .updateOne({ _id: videoId }, { $set: video });
          }
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
