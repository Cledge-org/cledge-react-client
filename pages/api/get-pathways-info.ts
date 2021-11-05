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
    .send(getPathwayInfo("TEST_USER_ID", "standardized-tests"));
};

export async function getPathwayInfo(
  userId: string,
  pathwayId: string
): Promise<Pathway> {
  const dummyData: Promise<Pathway> = Promise.resolve({
    userCourseProgress: {
      finished: false,
      id: "standardized-tests",
      title: "Standardized Tests",
      moduleProgress: [
        { finished: true, title: "ACT", contentProgress: [] },
        { finished: false, title: "SAT", contentProgress: [] },
      ],
    },
    userTags: ["engineering", "public"],
    pathway: {
      id: "standardized-tests",
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
  });
  return dummyData;
}
