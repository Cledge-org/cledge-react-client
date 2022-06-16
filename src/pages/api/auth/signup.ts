import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "src/pages/api/auth/firebase-auth";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { email, password, initialObj } = JSON.parse(req.body);
  return await AuthFunctions.createUser(email, password, initialObj);
};
