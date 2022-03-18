import { ObjectId } from "mongodb";
import { getResourcesInfo } from "../../pages/api/get-resources";
import { putResourceArticle } from "../../pages/api/put-resource-article";
import { putResourceResource } from "../../pages/api/put-resource-resource";
import { putResourceVideo } from "../../pages/api/put-resource-video";


jest.setTimeout(10000);

const titleArticle = "Test Article";
const titleVideo = "Test Video";
const titleResource = "Test Resource";

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  name: titleArticle,
  category: "article"
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
  category: "video",
  description: "Test Description"
};

const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
  category: "resource",
  description: "Test Description"
};


test("verify resources", (done) => {
  const callback = async () => {
    let newObjectId = new ObjectId();
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const articles: CardArticle[] = [testArticle1];
    const videos: CardVideo[] = [testVideo1];
    const resources: CardResource[] = [testResource1];
    let expectedArticle = testArticle1;
    let expectedVideo = testVideo1;
    let expectedResource = testResource1;

    await Promise.all([
      ...articles.map((article) => putResourceArticle(newObjectId, article)),
      ...videos.map((video) => putResourceVideo(newObjectId, video)),
      ...resources.map((resource) => putResourceResource(newObjectId, resource)),
    ]);

    expectedArticle._id = newObjectId;
    expectedVideo._id = newObjectId;
    expectedResource._id = newObjectId;

    let actualResource = await getResourcesInfo();
    let actualArticles = actualResource.articles;
    let actualVideos = actualResource.videoList;
    let actualResources = actualResource.resources;
    let articleCount = 0;
    let videoCount = 0;
    let resourceCount = 0;

    let articleId = [];
    let videoId = [];
    let resourceId = [];

    for (let i = 0; i < actualArticles.length; i++) {
      if (actualArticles[i]._id.equals(newObjectId)) {
        expect(actualArticles[i]).toEqual(expectedArticle);
        articleCount++;
      }
      articleId.push(actualArticles[i]._id);
    }

    for (let i = 0; i < actualVideos.length; i++) {
      if (actualVideos[i]._id.equals(newObjectId)) {
        expect(actualVideos[i]).toEqual(expectedVideo);
        videoCount++;
      }
      videoId.push(actualVideos[i]._id);
    }

    for (let i = 0; i < actualResources.length; i++) {
      if (actualResources[i]._id.equals(newObjectId)) {
        expect(actualResources[i]).toEqual(expectedResource);
        resourceCount++;
      }
      resourceId.push(actualResources[i]._id);
    }

    const expectedCount = 1;

    expect(articleCount).toEqual(expectedCount);
    expect(videoCount).toEqual(expectedCount);
    expect(resourceCount).toEqual(expectedCount);


    for (let i = 0; i < articleId.length; i++)
      await putResourceArticle(articleId[i], undefined);
    for (let i = 0; i < videoId.length; i++)
      await putResourceVideo(videoId[i], undefined);
    for (let i = 0; i < resourceId.length; i++)
      await putResourceResource(resourceId[i], undefined);


    const fetchedResourcesCheck = await getResourcesInfo();
    expect(fetchedResourcesCheck.articles.length).toBe(0);
    expect(fetchedResourcesCheck.videoList.length).toBe(0);
    expect(fetchedResourcesCheck.resources.length).toBe(0);
    done();
  };
  callback();
});



