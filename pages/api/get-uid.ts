import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "./auth/firebase-auth";

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  return resolve.status(200).send({ uid: AuthFunctions.userId });
};
