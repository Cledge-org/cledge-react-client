import { NextApiRequest, NextApiResponse } from "next";
import { getDashboardParts } from "src/ClientSideFunctions/PartsAndPathways";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const userID: string = req.query.userID.toString();
  await getDashboardParts(userID)
    .then((res) => {
      resolve.status(200).json(res);
    })
    .catch((e) => resolve.status(500).json({ message: e }));
};
