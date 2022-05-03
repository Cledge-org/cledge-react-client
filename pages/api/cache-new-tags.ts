import { Db, MongoClient, ObjectId } from "mongodb";
import { getResourcesInfo } from "./resources/get-resources";
import { putResource } from "./resources/put-resource";

const tag_list = []

export const config = {
  api: {
    externalResolver: true,
  },
};

export const getResources = (tagname: string): Promise<ResourcesInfo> => {
  return new Promise(async (res, err) => {
    try {
      const fetchedResourceCheck = await getResourcesInfo();
      let articles = fetchedResourceCheck.articles;
      let videos = fetchedResourceCheck.videoList;
      let resources = fetchedResourceCheck.resources;

      const selectedArticles: CardArticle[] = [];
      const selectedVideos: CardVideo[] = [];
      const selectedResources: CardResource[] = [];

      for (let i = 0; i < articles.length; i++) {
        if (articles[i].tag.startsWith(tagname))
         selectedArticles.push(articles[i]);
      }

      for (let i = 0; i < videos.length; i++) {
        if (videos[i].tag.startsWith(tagname))
          selectedVideos.push(videos[i]);
      }

      for (let i = 0; i < resources.length; i++) {
        if (resources[i].tag.startsWith(tagname))
          selectedResources.push(resources[i]);
      }

      res({ selectedVideos, selectedArticles, selectedResources});
    } catch (e) {
      err(res);
    }
  });
};

export const putResourceInfo = (newTag: string, oldTag: string, deliminator: string) : Promise<void> => {
  return new Promise(async (res, err) => {
    const fetchedResourceCheck = await getResourcesInfo();
    let articles = fetchedResourceCheck.articles;
    let videos = fetchedResourceCheck.videoList;
    let resources = fetchedResourceCheck.resources;
    /*
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].tag == oldTag)
        articles[i].tag = newTag;
    }
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].tag == oldTag)
        videos[i].tag = newTag;
    }
    for (let i = 0; i < resources.length; i++) {
      if (resources[i].tag == oldTag)
        resources[i].tag = newTag;
    }
    */
    await Promise.all([
      articles.map((article) => putResource(article._id, article, newTag))
    ]);

    await Promise.all([
      videos.map((article) => putResource(article._id, article, newTag))
    ]);

    await Promise.all([
      resources.map((article) => putResource(article._id, article, newTag))
    ]);
    // DO WE ONLY WANT 1 TAG PER RESOURCE? OR CAN WE HAVE MULTIPLE TAGS IN A RESOURCE?
    // Currently, just updated every tag with the new tag
  });
};

// Gets all the pathway modules and content for a pathway ID and specific user (firebaseId)
export function getPathway(
  userId: string,
  tagName: string
): Promise<Pathway> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const usersDb = client.db("users");
      const [pathway, accountInfo]: [Pathway_Db, AccountInfo] =
        await Promise.all([
          pathwaysDb.collection("pathways").findOne({
            tag: tagName
          }) as Promise<Pathway_Db>,
          usersDb.collection("users").findOne({
            firebaseId: userId,
          }) as Promise<AccountInfo>,
        ]);
      let modules: PathwayModule[] = await Promise.all(
        pathway.modules.map((moduleId) =>
          getModule(moduleId, pathwaysDb, accountInfo.tags, tagName)
        )
      );
      modules = modules.filter((x) => x !== null);
      res({
        tags: pathway.tags,
        name: pathway.name,
        _id: pathway._id,
        order: pathway.order,
        part: pathway.part,
        modules,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}

export const getModule = (
  moduleId: ObjectId,
  pathwaysDb: Db,
  userTags: string[],
  tagName: string
): Promise<PathwayModule | null> => {
  return new Promise(async (res, err) => {
    try {
      const [module, personalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        pathwaysDb.collection("modules").findOne({
          tag: tagName
        }) as Promise<PathwayModule_Db>,
        pathwaysDb
          .collection("personalized-content")
          .find({ tags: { $in: userTags }, moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (!module) {
        res(null);
      } else {
        res({
          _id: module._id,
          name: module.name,
          presetContent: module.presetContent,
          tags: module.tags,
          personalizedContent,
        });
      }
    } catch (e) {
      err(e);
    }
  });
};
