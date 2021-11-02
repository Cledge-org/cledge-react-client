import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve.status(200).send(getTasksInfo("TEST_USER_ID"));
};

export async function getTasksInfo(userId: string): Promise<TasksInfo> {
  const dummyData: Promise<TasksInfo> = Promise.resolve({
    // name: "John Smith",
    // address: "12345th Street Seattle, WA",
    // grade: 10,
    // birthday: new Date("2004-12-12T00:00:00"),
    // email: "test@email.com",
  });
  return dummyData;
}
