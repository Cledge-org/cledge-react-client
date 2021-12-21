import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve
    .status(200)
    .send(getQuestionnaire("TEST_USER_ID", "Onboarding"));
};

export async function getQuestionnaire(
  userId: string,
  questionnaireChunk: string
): Promise<Question[]> {
  const dummyData: Promise<Question[]> = Promise.resolve([
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
  ]);
  return dummyData;
}
