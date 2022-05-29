import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)

  try {
    const modules = await getModules();
    resolve.status(200).send(modules);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const getModules = (): Promise<{
  modules: PathwayModule[] | null;
  personalizedContent: PersonalizedContent[];
}> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const [modules, personalizedContent]: [
        PathwayModule[],
        PersonalizedContent[]
      ] = await Promise.all([
        pathwaysDb.collection("modules").find().toArray() as Promise<
          PathwayModule[]
        >,
        pathwaysDb
          .collection("personalized-content")
          .find()
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (!modules) {
        res(null);
      } else {
        res({
          modules,
          personalizedContent,
        });
      }
    } catch (e) {
      err(e);
    }
  });
};
