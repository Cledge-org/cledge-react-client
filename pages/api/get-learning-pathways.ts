import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getLearningPathways());
};

export async function getLearningPathways(): Promise<Course[]> {
  const dummyData: Promise<Course[]> = Promise.resolve([
    {
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
    {
      id: "standardized-tests-2",
      title: "Standardized Tests 2",
      modules: [
        {
          title: "ACT 2",
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
          title: "SAT 2",
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
  ]);
  return dummyData;
}
