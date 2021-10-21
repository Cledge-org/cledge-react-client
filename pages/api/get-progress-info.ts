import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getProgressInfo("TEST_USER_ID"));
};

export async function getProgressInfo(userId: string): Promise<ProgressInfo> {
  const dummyData: Promise<ProgressInfo> = Promise.resolve({
    userProgress: [],
    questionData: {
      questionList: [{ chunks: [{ title: "", questions: [""] }] }],
    },
  });
  return dummyData;
}
