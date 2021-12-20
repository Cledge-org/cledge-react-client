import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve.status(200).send(getQuestionnaire("TEST_USER_ID"));
};

export async function getQuestionnaire(userId: string): Promise<Question[]> {
  const dummyData: Promise<Question[]> = Promise.resolve([]);
  return dummyData;
}
