import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "src/pages/api/auth/firebase-auth";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { email, password, initialObj } = JSON.parse(req.body);
  try {
    resolve
      .status(200)
      .send(await AuthFunctions.createUser(email, password, initialObj));
  } catch (e) {
    console.error(e);
    resolve.status(500);
  }
};
