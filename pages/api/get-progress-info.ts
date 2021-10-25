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
    userProgress: {
      responses: [
        { questionId: "JohnCena", response: "11" },
        { questionId: "TheChosenOne", response: "SOC" },
        { questionId: "ThePickedOne", response: ["SOC", "Computers"] },
      ],
    },
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
                {
                  question: "Choose the correct answer",
                  type: "MCQ",
                  data: [
                    { op: "Computers", tag: "Computers" },
                    { op: "Things", tag: "Things" },
                    { op: "SOC", tag: "SOC" },
                    { op: "CPU", tag: "CPU" },
                  ],
                  id: "TheChosenOne",
                },
                {
                  question: "Choose the correct answer",
                  type: "CheckBox",
                  data: [
                    { op: "Computers", tag: "Computers" },
                    { op: "Things", tag: "Things" },
                    { op: "SOC", tag: "SOC" },
                    { op: "CPU", tag: "CPU" },
                  ],
                  id: "ThePickedOne",
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
