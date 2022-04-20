import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, academics } = JSON.parse(req.body);
  try {
    const session = getSession({ req });
    const result = await putAcademics(
      userId,
      academics,
      (
        await session
      ).user.uid
    );
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
  insertionId: string
): Promise<void> => {
  if (academics !== undefined && academics._id && userId) {
    // Document should not have _id field when sent to database
    delete academics._id;
  }
  console.error(userId);
  console.error(academics);
  console.error(insertionId);
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!userId && academics && insertionId) {
        console.error("SURPRISE");
        await client
          .db("metrics")
          .collection("academics")
          .insertOne({
            firebaseId: insertionId,
            ...academics,
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
