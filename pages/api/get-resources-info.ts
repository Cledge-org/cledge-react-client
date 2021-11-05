import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getResourcesInfo("TEST_USER_ID"));
};

export async function getResourcesInfo(userId: string): Promise<ResourcesInfo> {
  const dummyData: Promise<ResourcesInfo> = Promise.resolve({
    resources: [{ source: "", title: "SAT Vocabulary III" }],
    articles: [{ source: "", title: "", description: "" }],
    videoList: [{ source: "", title: "" }],
  });
  return dummyData;
}
