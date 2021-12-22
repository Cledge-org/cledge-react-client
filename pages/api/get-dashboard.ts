import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve.status(200).send(getDashboardInfo("TEST_USER_ID"));
};

export async function getDashboardInfo(userId: string): Promise<Dashboard> {
  const dummyData: Promise<Dashboard> = Promise.resolve({
    userName: "Johnny",
    checkIns: ["Onboarding Questions"],
    userTags: ["engineering", "public"],
    userProgress: [
      {
        finished: false,
        id: "standardized-tests",
        title: "Standardized Tests",
        moduleProgress: [
          { finished: true, title: "ACT", contentProgress: [] },
          { finished: false, title: "SAT", contentProgress: [] },
        ],
      },
      {
        finished: true,
        id: "standardized-tests-2",
        title: "Standardized Tests 2",
        moduleProgress: [{ finished: true, title: "ACT", contentProgress: [] }],
      },
      {
        finished: true,
        id: "standardized-tests-3",
        title: "Standardized Tests 3",
        moduleProgress: [{ finished: true, title: "ACT", contentProgress: [] }],
      },
    ],
  });
  return dummyData;
}
