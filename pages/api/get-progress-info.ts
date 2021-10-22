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
    userProgress: { responses: [{ questionId: "JohnCena", response: "11" }] },
    questionData: {
      questionList: [
        {
          title: "9th Grade",
          chunks: [
            {
              title: "9th Grade - 1st Quarter Check-in",
              questions: [
                {
                  question: "How Old Are YOU?",
                  type: "TextInput",
                  id: "JohnCena",
                },
              ],
            },
          ],
        },
        {
          title: "Extracurriculars",
          chunks: [
            {
              title: "Academic Achievement",
              questions: [{ question: "", type: "", id: "JohnCena" }],
            },
          ],
        },
      ],
    },
  });
  return dummyData;
}
