import { Db, MongoClient, ObjectId } from "mongodb";

// Currently, we store tags for different database resources. However, when you input a tag on the front-end, 
// you currently just have a text box to work with. We should cache tags on the backend into a database, so when
// an admin wants to select  a tag, the tag will be suggested to them from the cache (that's the front-end side, 
// your task will just be to provide an API for storing and retrieving tags)

// There are two main ways to do this. The first is a simple API that has a PUT route to put a list of tags and a
// GET method to get that single list of tags (or lists for different resource types). The second is a bit more
// complicated, but what I think Faraz wanted, which is that we automatically cache new tags in all our PUT methods 
// and have a GET method that searches for tags by string (ex: the API gets a request for all tags that start with 
// "Col", then you would return a list of all tags like "College" and "Collage"). This is for the scenario where someone 
// on the front-end is typing in a tag, each word will result in an API call to get relevant tags that will show up 
// like how you type searches into Google

export const config = {
    api: {
      externalResolver: true,
    },
};

export const getResourcesInfo = (tagname: string, overrideClient?: MongoClient): Promise<ResourcesInfo> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const resource_db = client.db("resources");
      const [videoList, articles, resources] = await Promise.all([
        resource_db.collection("all_resources").find({"tag": tagname}).toArray() as Promise<
          CardVideo[]
        >,
        resource_db.collection("all_resources").find({"tag": tagname}).toArray() as Promise<
          CardArticle[]
        >,
        resource_db.collection("all_resources").find({"tag": tagname}).toArray() as Promise<
          CardResource[]
        >,
      ]);
    
      res({ videoList, articles, resources });
      client.close();
    } catch (e) {
      err(res);
    }
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
  