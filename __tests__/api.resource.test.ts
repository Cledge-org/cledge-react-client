import { getResourcesInfo } from "../pages/api/get-resources";
import { putResource } from "../pages/api/put-resource";
import { ObjectId } from "mongodb";

const titleArticle = "Test Article";
const testArticle1: CardArticle = {
  source: "Test Source",
  name: titleArticle,
  description: "Test Description"
};

const titleVideo = "Test Video";
const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
  description: "Test Description"
};

const titleResource = "Test Resource";
const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
  description: "Test Description"
};

const titleArticle2 = "Test Article 2";
const testArticle2: CardArticle = {
  source: "Test Source 2",
  name: titleArticle2,
  description: "Test Description 2"
};

const titleVideo2 = "Test Video 2";
const testVideo2: CardVideo = {
  source: "Test Source 2",
  name: titleVideo2,
  description: "Test Description 2"
};

const titleResource2 = "Test Resource 2";
const testResource2: CardResource = {
  source: "Test Source 2",
  name: titleResource2,
  description: "Test Description 2"
};

async function deleteResources(articleId, videoId, resourceId) {
  // clears resource database
  for (let i = 0; i < articleId.length; i++)
    await putResource(articleId[i], undefined, undefined);
  for (let i = 0; i < videoId.length; i++)
    await putResource(videoId[i], undefined, undefined);
  for (let i = 0; i < resourceId.length; i++)
    await putResource(resourceId[i], undefined, undefined);

  // checks that database is empty
  const fetchedResourcesCheck = await getResourcesInfo();
  expect(fetchedResourcesCheck.articles.length).toBe(0);
  expect(fetchedResourcesCheck.videoList.length).toBe(0);
  expect(fetchedResourcesCheck.resources.length).toBe(0);
}

test("should add one resource and get that one added resource exactly and verify if that resource is deleted", (done) => {
  const callback = async () => {
    // Checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const articleId = [];
    const videoId = [];
    const resourceId = [];

    // test put functionality - manually create unique objectids for each test resource
    await putResource(undefined, testArticle1, "article");
    await putResource(undefined, testVideo1, "video");
    await putResource(undefined, testResource1, "resource");

    // test get functionality - should be identical to what we put
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(1);
    expect(fetchedResources.videoList.length).toBe(1);
    expect(fetchedResources.resources.length).toBe(1);

    expect(fetchedResources.articles[0]).toMatchObject(testArticle1);
    articleId.push(fetchedResources.articles[0]._id);

    expect(fetchedResources.videoList[0]).toMatchObject(testVideo1);
    videoId.push(fetchedResources.videoList[0]._id);

    expect(fetchedResources.resources[0]).toMatchObject(testResource1);
    resourceId.push(fetchedResources.resources[0]._id);

    // clears the resource database and checks if database is empty
    await deleteResources(articleId, videoId, resourceId);
    done();
  };
  callback();
});

test("update resources and verify if the resources are deleted", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    // test put functionality - manually create unique objectids for each test resource
    await putResource(undefined, testArticle1, "article");
    await putResource(undefined, testVideo1, "video");
    await putResource(undefined, testResource1, "resource");

    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(1);
    expect(fetchedResources.videoList.length).toBe(1);
    expect(fetchedResources.resources.length).toBe(1);

    // test put functionality - updates the resources in the database
    await putResource(fetchedResources.articles[0]._id, testArticle2, "article");
    await putResource(fetchedResources.videoList[0]._id, testVideo2, "video");
    await putResource(fetchedResources.resources[0]._id, testResource2, "resource");

    testArticle2._id = fetchedResources.articles[0]._id;
    testVideo2._id = fetchedResources.videoList[0]._id;
    testResource2._id = fetchedResources.resources[0]._id;

    const actualResource = await getResourcesInfo();
    const actualArticles = actualResource.articles;
    const actualVideos = actualResource.videoList;
    const actualResources = actualResource.resources;

    const articleId = [];
    const videoId = [];
    const resourceId = [];

    let hasArticle = false;
    if (actualArticles[0]._id.equals(testArticle2._id)) {
      expect(actualArticles[0]).toEqual(testArticle2);
      hasArticle = true;
    }
    articleId.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(testVideo2._id)) {
      expect(actualVideos[0]).toEqual(testVideo2);
      hasVideo = true;
    }
    videoId.push(actualVideos[0]._id);

    let hasResource = false;
    if (actualResources[0]._id.equals(testResource2._id)) {
      expect(actualResources[0]).toEqual(testResource2);
      hasResource = true;
    }
    resourceId.push(actualResources[0]._id);

    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

    // clears the resource database and checks if database is empty
    await deleteResources(articleId, videoId, resourceId);
    done();
  };
  callback();
});


test("verify resources and verify if those resources are deleted", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    // test put functionality
    const article1Id = new ObjectId();
    await putResource(article1Id, testArticle1, "article");
    const video1Id = new ObjectId();
    await putResource(video1Id, testVideo1, "video");
    const resource1Id = new ObjectId();
    await putResource(resource1Id, testResource1, "resource");

    testArticle1._id = article1Id;
    testVideo1._id = video1Id;
    testResource1._id = resource1Id;

    const actualResource = await getResourcesInfo();
    const actualArticles = actualResource.articles;
    const actualVideos = actualResource.videoList;
    const actualResources = actualResource.resources;

    const articleId = [];
    const videoId = [];
    const resourceId = [];

    let hasArticle = false;
    if (actualArticles[0]._id.equals(testArticle1._id)) {
      expect(actualArticles[0]).toEqual(testArticle1);
      hasArticle = true;
    }
    articleId.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(testVideo1._id)) {
      expect(actualVideos[0]).toEqual(testVideo1);
      hasVideo = true;
    }
    videoId.push(actualVideos[0]._id);

    let hasResource = false;
    if (actualResources[0]._id.equals(testResource1._id)) {
      expect(actualResources[0]).toEqual(testResource1);
      hasResource = true;
    }
    resourceId.push(actualResources[0]._id);

    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

    // clears the resource database and checks if database is empty
    await deleteResources(articleId, videoId, resourceId);
    done();
  };
  callback();
});


test("verify many resources and verify if those many resources are deleted", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const manySize = 10;
    const articleId = [];
    const videoId = [];
    const resourceId = [];

    for (let i = 0; i < manySize; i++) {
      const titleArticle = "Test Article" + i;
      const article: CardArticle = {
        source: "Test Source " + i,
        name: titleArticle,
        description: "Test Description " + i
      };

      const titleVideo = "Test Video " + i;
      const video: CardVideo = {
        source: "Test Source" + i,
        name: titleVideo,
        description: "Test Description" + i
      };

      const titleResource = "Test Resource " + i;
      const resource: CardResource = {
        source: "Test Source " + i,
        name: titleResource,
        description: "Test Description " + i
      };
      await putResource(undefined, article, "article");
      await putResource(undefined, video, "video");
      await putResource(undefined, resource, "resource");
    }

    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(manySize);
    expect(fetchedResources.videoList.length).toBe(manySize);
    expect(fetchedResources.resources.length).toBe(manySize);

    for (let i = 0; i < fetchedResources.articles.length; i++) {
      const titleArticle = "Test Article" + i;
      const article: CardArticle = {
        source: "Test Source " + i,
        name: titleArticle,
        description: "Test Description " + i
      };
      articleId.push(fetchedResources.articles[i]._id);
      expect(fetchedResources.articles[i]).toMatchObject(article);
    }

    for (let i = 0; i < fetchedResources.videoList.length; i++) {
      const titleVideo = "Test Video " + i;
      const video: CardVideo = {
        source: "Test Source" + i,
        name: titleVideo,
        description: "Test Description" + i
      };
      videoId.push(fetchedResources.videoList[i]._id);
      expect(fetchedResources.videoList[i]).toMatchObject(video);
    }

    for (let i = 0; i < fetchedResources.resources.length; i++) {
      const titleResource = "Test Resource " + i;
      const resource: CardResource = {
        source: "Test Source " + i,
        name: titleResource,
        description: "Test Description " + i
      };
      resourceId.push(fetchedResources.resources[i]._id);
      expect(fetchedResources.resources[i]).toMatchObject(resource);
    }

    // clears the resource database and checks if database is empty
    await deleteResources(articleId, videoId, resourceId);
    done();
  };
  callback();
});
