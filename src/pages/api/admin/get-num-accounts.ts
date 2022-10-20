import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  try {
    const accountInfo = await getNumAccounts();
    resolve.status(200).send(accountInfo);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Gets the number of accounts
export const getNumAccounts = async (
  overrideClient?: MongoClient
): Promise<number> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      res(await client.db("users").collection("users").count());
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
};
