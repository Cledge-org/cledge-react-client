import { ObjectId } from "mongodb";
import { getResourcesInfo } from "../pages/api/get-resources";
import { putResourceArticle } from "../pages/api/put-resource-article";
import { putResourceResource } from "../pages/api/put-resource-resource";
import { putResourceVideo } from "../pages/api/put-resource-video";

const titleArticle = "Test Article";
const titleVideo = "Test Video";
const titleResource = "Test Resource";

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  name: titleArticle,
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
};

const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
};

const newObjectId = new ObjectId();

test("verify resources", (done) => {
  const callback = async () => {
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

    for (let i = 0; i < actualArticles.length; i++) {
      if (actualArticles[i]._id.equals(newObjectId)) {
        expect(actualArticles[i]).toEqual(expectedArticle);
        articleCount++;
      }
    }

    for (let i = 0; i < actualVideos.length; i++) {
      if (actualVideos[i]._id.equals(newObjectId)) {
        expect(actualVideos[i]).toEqual(expectedVideo);
        videoCount++;
      }
    }

    for (let i = 0; i < actualResources.length; i++) {
      if (actualResources[i]._id.equals(newObjectId)) {
        expect(actualResources[i]).toEqual(expectedResource);
        resourceCount++;
      }
    }

    const expectedCount = 1;

    expect(articleCount).toEqual(expectedCount);
    expect(videoCount).toEqual(expectedCount);
    expect(resourceCount).toEqual(expectedCount);

    await putResourceArticle(newObjectId, undefined);
    await putResourceVideo(newObjectId, undefined);
    await putResourceResource(newObjectId, undefined);
    done();
  };
  callback();
});



