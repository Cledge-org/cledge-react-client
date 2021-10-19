import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve.status(200).send(getAccountInfo("TEST_USER_ID"));
};

export async function getAccountInfo(userId: string): Promise<AccountInfo> {
  const dummyData: Promise<AccountInfo> = Promise.resolve({
    name: "John Smith",
    address: "12345th Street Seattle, WA",
    grade: 10,
    birthday: JSON.stringify(new Date("12/12/2004")),
    email: "test@email.com",
  });
  return dummyData;
}
