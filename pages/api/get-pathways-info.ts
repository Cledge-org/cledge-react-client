import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, pull data from database
  // const { userToken } = req.body;

  return resolve.status(200).send(getPathwaysInfo("TEST_USER_ID"));
};

export async function getPathwaysInfo(userId: string): Promise<Pathways> {
  const dummyData: Promise<Pathways> = Promise.resolve({
    userName: "Johnny",
    userTags: ["engineering", "public"],
    pathways: [
      {
        title: "Standardized Tests",
        modules: [
          {
            title: "ACT",
            presetContent: [
              {
                priority: 1,
                title: "Preset Video",
                type: "video",
                url: "https://www.youtube.com/embed/T4S_LwhK8xE",
              },
            ],
            personalizedContent: [
              {
                tagConfigs: [["engineering", "public"]],
                priority: 3,
                tags: ["engineering", "public"],
                title: "Engineering, Public OR Private",
                type: "video",
                url: "https://www.youtube.com/embed/g2mLOVHZ2u4",
              },
            ],
            tags: [],
          },
        ],
        tags: [],
      },
    ],
  });
  return dummyData;
}
