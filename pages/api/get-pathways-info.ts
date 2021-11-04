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
    userProgress: [
      {
        finished: false,
        title: "Standardized Tests",
        moduleProgress: [
          { finished: true, title: "ACT", contentProgress: [] },
          { finished: false, title: "SAT", contentProgress: [] },
        ],
      },
      {
        finished: true,
        title: "Standardized Tests 2",
        moduleProgress: [{ finished: true, title: "ACT", contentProgress: [] }],
      },
      {
        finished: true,
        title: "Standardized Tests 3",
        moduleProgress: [{ finished: true, title: "ACT", contentProgress: [] }],
      },
    ],
    pathways: [
      {
        title: "Standardized Tests",
        modules: [
          {
            title: "ACT",
            presetContent: [
              {
                priority: 5,
                title: "Preset Video",
                type: "video",
                url: "https://www.youtube.com/embed/T4S_LwhK8xE",
              },
              {
                priority: 4,
                title: "Preset Video 2",
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
              {
                tagConfigs: [["engineering", "public"]],
                priority: 2,
                tags: ["engineering", "public"],
                title: "Engineering, Public AND Private",
                type: "video",
                url: "https://www.youtube.com/embed/g2mLOVHZ2u4",
              },
            ],
            tags: [],
          },
          {
            title: "SAT",
            presetContent: [
              {
                priority: 5,
                title: "Preset Video",
                type: "video",
                url: "https://www.youtube.com/embed/T4S_LwhK8xE",
              },
              {
                priority: 4,
                title: "Preset Video 2",
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
              {
                tagConfigs: [["engineering", "public"]],
                priority: 2,
                tags: ["engineering", "public"],
                title: "Engineering, Public AND Private",
                type: "video",
                url: "https://www.youtube.com/embed/g2mLOVHZ2u4",
              },
            ],
            tags: [],
          },
        ],
        tags: [],
      },
      {
        title: "Standardized Tests 2",
        modules: [
          {
            title: "ACT",
            presetContent: [
              {
                priority: 5,
                title: "Preset Video",
                type: "video",
                url: "https://www.youtube.com/embed/T4S_LwhK8xE",
              },
              {
                priority: 4,
                title: "Preset Video 2",
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
              {
                tagConfigs: [["engineering", "public"]],
                priority: 2,
                tags: ["engineering", "public"],
                title: "Engineering, Public AND Private",
                type: "video",
                url: "https://www.youtube.com/embed/g2mLOVHZ2u4",
              },
            ],
            tags: [],
          },
        ],
        tags: [],
      },
      {
        title: "Standardized Tests 3",
        modules: [
          {
            title: "ACT",
            presetContent: [
              {
                priority: 5,
                title: "Preset Video",
                type: "video",
                url: "https://www.youtube.com/embed/T4S_LwhK8xE",
              },
              {
                priority: 4,
                title: "Preset Video 2",
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
              {
                tagConfigs: [["engineering", "public"]],
                priority: 2,
                tags: ["engineering", "public"],
                title: "Engineering, Public AND Private",
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
