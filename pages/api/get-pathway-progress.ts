import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import AuthFunctions from "./auth/firebase-auth";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { pathwayId, userId } = JSON.parse(req.body);
  return !userId || !pathwayId
    ? resolve.status(400).send("No userId or courseId provided")
    : resolve.status(200).send(await getPathwayProgress(userId, pathwayId));
};

// Gets gets progress info for a specific learning pathway given pathway
// document id and a user id
export async function getPathwayProgress(
  userId: string,
  pathwayId: ObjectId
): Promise<PathwayProgress> {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const pathwaysDb = client.db("pathways");
        const usersDb = client.db("users");

        const [pathway, userInfo, progressByModule]: [
          Pathway_Db,
          AccountInfo,
          Record<string, ContentProgress[]>
        ] = await Promise.all([
          pathwaysDb
            .collection("pathways")
            .findOne({ _id: pathwayId }) as Promise<Pathway_Db>,
          usersDb
            .collection("users")
            .findOne({ firebaseId: userId }) as Promise<AccountInfo>,
          pathwaysDb
            .collection("progress-by-user")
            .findOne({ firebaseId: userId }) as Promise<
            Record<string, ContentProgress[]>
          >,
        ]);
        res(
          (await getSpecificPathwayProgress(
            userInfo.tags,
            pathway,
            pathwaysDb,
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
  pathwaysDb: Db,
  progressByModule: Record<string, ContentProgress[]>
): Promise<PathwayProgress> {
  return new Promise(async (res, err) => {
    try {
      let moduleProgress = await Promise.all(
        pathway.modules.map((moduleId) =>
          getSpecificModuleProgress(
            userTags,
            progressByModule,
            moduleId,
            pathwaysDb
          )
        )
      );
      moduleProgress = moduleProgress.filter(({ title }) => {
        return title !== "NULL MODULE";
      });
      res({
        finished: moduleProgress.reduce(
          (prev: boolean, cur: ModuleProgress) => prev && cur.finished,
          true
        ),
        moduleProgress,
        title: pathway.title,
        pathwayId: pathway._id,
      });
    } catch (e) {
      err(e);
    }
  });
}

async function getSpecificModuleProgress(
  userTags: string[],
  progressByModule: Record<string, ContentProgress[]>,
  moduleId: ObjectId,
  pathwaysDb: Db
): Promise<ModuleProgress> {
  return new Promise(async (res, err) => {
    try {
      const [module, modulePersonalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        pathwaysDb.collection("modules").findOne({
          _id: moduleId,
        }) as Promise<PathwayModule_Db>,
        pathwaysDb
          .collection("personalized-content")
          .find({ tags: { $in: userTags }, moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (module) {
        let moduleContentProgress: ContentProgress[] =
          progressByModule[module._id];
        if (!moduleContentProgress) {
          moduleContentProgress = [];
        }
        const titles: Set<string> = new Set();
        moduleContentProgress.forEach((progress) => {
          titles.add(progress.title);
        });
        // Iterate through preset and presonalized contents and find contents not in progress, add them as unfinished
        if (module.presetContent) {
          module.presetContent.forEach((content, index) => {
            if (!titles.has(content.title)) {
              moduleContentProgress.push({
                title: content.title,
                finished: false,
                videoTime: 0,
              });
            }
          });
        }
        if (modulePersonalizedContent) {
          modulePersonalizedContent.forEach((content) => {
            if (!titles.has(content.title)) {
              moduleContentProgress.push({
                title: content.title,
                finished: false,
                videoTime: 0,
              });
            }
          });
        }
        res({
          moduleId: moduleId.toString(),
          finished: moduleContentProgress.reduce(
            (prev, cur) => prev && cur.finished,
            true
          ),
          contentProgress: moduleContentProgress,
          title: module.title,
        });
      } else {
        res({
          moduleId: moduleId.toString(),
          finished: false,
          contentProgress: [],
          title: "NULL MODULE",
        });
      }
    } catch (e) {
      err(e);
    }
  });
}
