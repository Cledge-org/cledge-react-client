import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allUserInfo = await getAllUserInfo();
    resolve.status(200).send(allUserInfo);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const getAllUserInfo = async (
  overrideClient?: MongoClient
): Promise<AccountInfo[]> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ??
        (await MongoClient.connect(getEnvVariable("MONGO_URL")));
      const users = (await client
        .db("users")
        .collection("users")
        .find()
        .toArray()) as AccountInfo[];
      res(users);
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
};
