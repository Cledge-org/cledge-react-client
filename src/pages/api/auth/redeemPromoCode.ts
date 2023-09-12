import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

interface promoCodeObject {
  "_id": ObjectId,
  "code": string,
  "maxRedemptions": number,
  "redemptions": number,
  "discountedPrice": number
}

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userCode, userId } = JSON.parse(req.body);

  if (userCode) {
    try {
      const post = await redeemPromoCode(userCode, userId);
      resolve.status(200).send(post);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

export function redeemPromoCode(userCode: string, userId: string): Promise<any> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const resourcesDb = client.db("users");
      const codeObject: promoCodeObject = await
        resourcesDb.collection("promo-codes").findOne({
          code: userCode,
        }) as promoCodeObject
      if (codeObject != null && codeObject.redemptions < codeObject.maxRedemptions) {
        await client
        .db("users")
        .collection("promo-codes")
        .updateOne({ "code": userCode }, { "$set": { "redemptions" : Number.parseInt(codeObject.redemptions + "") + 1 }});
        res(codeObject);
      }
      res(null)
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
