import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../secrets";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, pathwayId } = req.body;
  return userId && pathwayId
    ? resolve.status(200).send(await getPathwayProgress(userId, pathwayId))
    : resolve.status(400).send("Both user and pathway IDs required");
};

// Gets gets progress info for a specific learning pathway given pathway
// document id and a user id
export async function getPathwayProgress(
  userId: string,
  pathwayId: ObjectId
): Promise<PathwayProgress> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const courseDb = client.db("pathways");
        const usersDb = client.db("users");

        const [pathway, userInfo, progressByModule]: [
          Pathway_Db,
          AccountInfo,
          Record<string, ContentProgress[]>
        ] = await Promise.all([
          courseDb
            .collection("pathways")
            .findOne({ _id: pathwayId }) as Promise<Pathway_Db>,
          usersDb
            .collection("users")
            .findOne({ firebaseId: userId }) as Promise<AccountInfo>,
          courseDb
            .collection("progress-by-user")
            .findOne({ firebaseId: userId }) as Promise<
            Record<string, ContentProgress[]>
          >,
        ]);
        res(
          (await getSpecificPathwayProgress(
            userInfo.tags,
            pathway,
            courseDb,
            progressByModule
          )) as PathwayProgress
        );
      }
    );
  });
}

// Gets progress for a specific learning pathway progress give a user's tags,
// pathway information (database type), database, and user progress by module
export async function getSpecificPathwayProgress(
  userTags: string[],
  pathway: Pathway_Db,
  courseDb: Db,
  progressByModule: Record<string, ContentProgress[]>
): Promise<PathwayProgress> {
  return new Promise(async (res, err) => {
    const moduleProgress = await Promise.all(
      pathway.modules.map((moduleId) =>
        getSpecificModuleProgress(
          userTags,
          progressByModule,
          moduleId,
          courseDb
        )
      )
    );
    res({
      finished: moduleProgress.reduce(
        (prev: boolean, cur: ModuleProgress) => prev && cur.finished,
        true
      ),
      moduleProgress,
      title: pathway.title,
      pathwayId: pathway._id,
    });
  });
}

async function getSpecificModuleProgress(
  userTags: string[],
  progressByModule: Record<string, ContentProgress[]>,
  moduleId: ObjectId,
  courseDb: Db
): Promise<ModuleProgress> {
  return new Promise(async (res, err) => {
    try {
      const [module, modulePersonalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        courseDb.collection("modules").findOne({
          _id: moduleId,
        }) as Promise<PathwayModule_Db>,
        courseDb
          .collection("personalized-content")
          .find({ tags: { $in: userTags }, moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      const moduleProgress: ContentProgress[] = progressByModule[module.title];
      const titles: Set<string> = new Set();
      moduleProgress.forEach((progress) => {
        titles.add(progress.title);
      });
      // Iterate through preset and presonalized contents and find contents not in progress, add them as unfinished
      module.presetContent.forEach((content) => {
        if (!titles.has(content.title)) {
          moduleProgress.push({ title: content.title, finished: false });
        }
      });
      modulePersonalizedContent.forEach((content) => {
        if (!titles.has(content.title)) {
          moduleProgress.push({ title: content.title, finished: false });
        }
      });
      res({
        finished: moduleProgress.reduce(
          (prev, cur) => prev && cur.finished,
          true
        ),
        contentProgress: moduleProgress,
        title: module.title,
      });
    } catch (e) {
      err(e);
    }
  });
}
