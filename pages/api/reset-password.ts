import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "./auth/firebase-auth";

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { email } = JSON.parse(req.body);
  return email
    ? resolve.status(200).send(await AuthFunctions.resetPassword(email))
    : resolve.status(400).send("email missing");
};
