import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userCode, email } = JSON.parse(req.body);

  if (userCode) {
    try {
      const post = await redeemFuncCode(userCode, email);
      resolve.status(200).send(post);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

export function redeemFuncCode(userCode: string, email): Promise<any> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const resourcesDb = client.db("users");
      const post: any = await Promise.all([
        resourcesDb.collection("access-codes").findOne({
          code: userCode,
        }) as Promise<any>,
      ]);
      res({ post });
      console.log("Find One result: ", post);
      await client
      .db("users")
      .collection("access-codes")
      .updateOne({ "code": userCode }, { "$set": {"redeemed" : 1, "redeemedBy" : email}});

      client.close();
    } catch (e) {
      err(e);
    }
  });
}
