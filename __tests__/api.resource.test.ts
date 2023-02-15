import { getResourcesInfo } from "../src/pages/api/resources/get-resources";
import { putResource } from "../src/pages/api/resources/put-resource";
import { ObjectId } from "mongodb";
import { rateResource } from "../src/pages/api/resources/rate-resource";
import { putResourceTags } from "../src/pages/api/MSC/cache-new-tags";
import { getResourceTags } from "../src/pages/api/MSC/cache-new-tags";

const titleArticle = "Test Article";
const testArticle1: CardArticle = {
  source: "Test Source",
  name: titleArticle,
  description: "Test Description",
  tag: "article",
};

const titleVideo = "Test Video";
const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
  description: "Test Description",
  tag: "video",
};

const titleResource = "Test Resource";
const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
  description: "Test Description",
  tag: "resource",
};

const titleArticle2 = "Test Article 2";
const testArticle2: CardArticle = {
  source: "Test Source 2",
  name: titleArticle2,
  description: "Test Description 2",
  tag: "article",
};

const titleVideo2 = "Test Video 2";
const testVideo2: CardVideo = {
  source: "Test Source 2",
  name: titleVideo2,
  description: "Test Description 2",
  tag: "video",
};

const titleResource2 = "Test Resource 2";
const testResource2: CardResource = {
  source: "Test Source 2",
  name: titleResource2,
  description: "Test Description 2",
  tag: "resource",
};

async function deleteResources(articleIds, videoIds, resourceIds) {
  // clears resource database
  for (let i = 0; i < articleIds.length; i++)
    await putResource(articleIds[i], undefined, undefined);
  for (let i = 0; i < videoIds.length; i++)
    await putResource(videoIds[i], undefined, undefined);
  for (let i = 0; i < resourceIds.length; i++)
    await putResource(resourceIds[i], undefined, undefined);

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

    const articleIds = [];
    const videoIds = [];
    const resourceIds = [];

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
    articleIds.push(fetchedResources.articles[0]._id);

    expect(fetchedResources.videoList[0]).toMatchObject(testVideo1);
    videoIds.push(fetchedResources.videoList[0]._id);

    expect(fetchedResources.resources[0]).toMatchObject(testResource1);
    resourceIds.push(fetchedResources.resources[0]._id);

    // clears the resource database and checks if database is empty
    await deleteResources(articleIds, videoIds, resourceIds);
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
    await putResource(
      fetchedResources.articles[0]._id,
      testArticle2,
      "article"
    );
    await putResource(fetchedResources.videoList[0]._id, testVideo2, "video");
    await putResource(
      fetchedResources.resources[0]._id,
      testResource2,
      "resource"
    );

    testArticle2._id = fetchedResources.articles[0]._id;
    testVideo2._id = fetchedResources.videoList[0]._id;
    testResource2._id = fetchedResources.resources[0]._id;

    const actualResource = await getResourcesInfo();
    const actualArticles = actualResource.articles;
    const actualVideos = actualResource.videoList;
    const actualResources = actualResource.resources;

    const articleIds = [];
    const videoIds = [];
    const resourceIds = [];

    let hasArticle = false;
    if (actualArticles[0]._id.equals(testArticle2._id)) {
      expect(actualArticles[0]).toEqual(testArticle2);
      hasArticle = true;
    }
    articleIds.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(testVideo2._id)) {
      expect(actualVideos[0]).toEqual(testVideo2);
      hasVideo = true;
    }
    videoIds.push(actualVideos[0]._id);

    let hasResource = false;
    if (actualResources[0]._id.equals(testResource2._id)) {
      expect(actualResources[0]).toEqual(testResource2);
      hasResource = true;
    }
    resourceIds.push(actualResources[0]._id);

    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

    // clears the resource database and checks if database is empty
    await deleteResources(articleIds, videoIds, resourceIds);
    done();
  };
  callback();
});

test("should verify resources and verify if those resources are deleted", (done) => {
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

    const articleIds = [];
    const videoIds = [];
    const resourceIds = [];

    let hasArticle = false;
    if (actualArticles[0]._id.equals(testArticle1._id)) {
      expect(actualArticles[0]).toEqual(testArticle1);
      hasArticle = true;
    }
    articleIds.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(testVideo1._id)) {
      expect(actualVideos[0]).toEqual(testVideo1);
      hasVideo = true;
    }
    videoIds.push(actualVideos[0]._id);

    let hasResource = false;
    if (actualResources[0]._id.equals(testResource1._id)) {
      expect(actualResources[0]).toEqual(testResource1);
      hasResource = true;
    }
    resourceIds.push(actualResources[0]._id);

    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

    // clears the resource database and checks if database is empty
    await deleteResources(articleIds, videoIds, resourceIds);
    done();
  };
  callback();
});

test("should verify many resources and verify if those many resources are deleted", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const manySize = 10;
    const articleIds = [];
    const videoIds = [];
    const resourceIds = [];

    for (let i = 0; i < manySize; i++) {
      const titleArticle = "Test Article" + i;
      const article: CardArticle = {
        source: "Test Source " + i,
        name: titleArticle,
        description: "Test Description " + i,
        tag: "article",
      };

      const titleVideo = "Test Video " + i;
      const video: CardVideo = {
        source: "Test Source" + i,
        name: titleVideo,
        description: "Test Description" + i,
        tag: "video",
      };

      const titleResource = "Test Resource " + i;
      const resource: CardResource = {
        source: "Test Source " + i,
        name: titleResource,
        description: "Test Description " + i,
        tag: "resource",
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
        description: "Test Description " + i,
        tag: "article",
      };
      articleIds.push(fetchedResources.articles[i]._id);
      expect(fetchedResources.articles[i]).toMatchObject(article);
    }

    for (let i = 0; i < fetchedResources.videoList.length; i++) {
      const titleVideo = "Test Video " + i;
      const video: CardVideo = {
        source: "Test Source" + i,
        name: titleVideo,
        description: "Test Description" + i,
        tag: "video",
      };
      videoIds.push(fetchedResources.videoList[i]._id);
      expect(fetchedResources.videoList[i]).toMatchObject(video);
    }

    for (let i = 0; i < fetchedResources.resources.length; i++) {
      const titleResource = "Test Resource " + i;
      const resource: CardResource = {
        source: "Test Source " + i,
        name: titleResource,
        description: "Test Description " + i,
        tag: "resource",
      };
      resourceIds.push(fetchedResources.resources[i]._id);
      expect(fetchedResources.resources[i]).toMatchObject(resource);
    }

    // clears the resource database and checks if database is empty
    await deleteResources(articleIds, videoIds, resourceIds);

    done();
  };
  callback();
});

test("should add resources and upvotes and downvotes to each", (done) => {
  const callback = async () => {
    // Checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const articleId = new ObjectId();
    const videoId = new ObjectId();
    const resourceId = new ObjectId();
    const ids = [articleId, videoId, resourceId];

    // test put functionality - manually create unique objectids for each test resource
    await putResource(articleId, testArticle1, "article");
    await putResource(videoId, testVideo1, "video");
    await putResource(resourceId, testResource1, "resource");

    const userOne = "userOne";
    const userTwo = "userTwo";

    for (let i = 0; i < ids.length; i++) {
      // user one upvote. user two initial upvote turns into downvote, can only
      // downvote once
      await rateResource(ids[i], userOne, true);
      await rateResource(ids[i], userTwo, true);
      await rateResource(ids[i], userTwo, false);
      await rateResource(ids[i], userTwo, false);
    }

    const updatedTestArticle1 = Object.assign({}, testArticle1);
    updatedTestArticle1.upvotes = 1;
    updatedTestArticle1.downvotes = 1;
    const updatedTestVideo1 = Object.assign({}, testVideo1);
    updatedTestVideo1.upvotes = 1;
    updatedTestVideo1.downvotes = 1;
    const updatedTestResource1 = Object.assign({}, testResource1);
    updatedTestResource1.upvotes = 1;
    updatedTestResource1.downvotes = 1;

    // test get functionality - should be identical to what we put with vote modifications
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(1);
    expect(fetchedResources.videoList.length).toBe(1);
    expect(fetchedResources.resources.length).toBe(1);
    expect(fetchedResources.articles[0]).toMatchObject(updatedTestArticle1);
    expect(fetchedResources.videoList[0]).toMatchObject(updatedTestVideo1);
    expect(fetchedResources.resources[0]).toMatchObject(updatedTestResource1);

    // clears the resource database and checks if database is empty
    await deleteResources([articleId], [videoId], [resourceId]);

    done();
  };
  callback();
});

test("should add resources and get appropriate tag", (done) => {
  const callback = async () => {
    // Checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    const articleId = new ObjectId();
    const videoId = new ObjectId();
    const resourceId = new ObjectId();

    // test put functionality - manually create unique objectids for each test resource
    await Promise.all([
      putResource(articleId, testArticle1, "article"),
      putResource(videoId, testVideo1, "video"),
      putResource(resourceId, testResource1, "resource"),
    ]);
    // test put functionality
    await putResourceTags();

    // tests get functionality for article
    let [
      selectedTags1,
      selectedTags2,
      selectedTags3,
      selectedTags4,
      selectedTags5,
    ] = await Promise.all([
      getResourceTags("art"),
      getResourceTags("article"),
      getResourceTags("cle"),
      getResourceTags("tic"),
      getResourceTags("res"),
    ]);

    let expectedTag = "article";
    expect(selectedTags1.length === 1);
    expect(selectedTags1[0] === expectedTag);
    expect(selectedTags2.length === 1);
    expect(selectedTags2[0] === expectedTag);
    expect(selectedTags3.length === 1);
    expect(selectedTags3[0] === expectedTag);
    expect(selectedTags4.length === 1);
    expect(selectedTags4[0] === expectedTag);
    expect(selectedTags5.length === 1);
    expect(selectedTags5[0] !== expectedTag);

    // tests get functionality for video
    [
      selectedTags1,
      selectedTags2,
      selectedTags3,
      selectedTags4,
      selectedTags5,
    ] = await Promise.all([
      getResourceTags("vid"),
      getResourceTags("video"),
      getResourceTags("eo"),
      getResourceTags("d"),
      getResourceTags("article"),
    ]);

    expectedTag = "video";
    expect(selectedTags1.length === 1);
    expect(selectedTags1[0] === expectedTag);
    expect(selectedTags2.length === 1);
    expect(selectedTags2[0] === expectedTag);
    expect(selectedTags3.length === 1);
    expect(selectedTags3[0] === expectedTag);
    expect(selectedTags4.length === 1);
    expect(selectedTags4[0] === expectedTag);
    expect(selectedTags5.length === 1);
    expect(selectedTags5[0] !== expectedTag);

    // tests get functionality for resource
    [
      selectedTags1,
      selectedTags2,
      selectedTags3,
      selectedTags4,
      selectedTags5,
    ] = await Promise.all([
      getResourceTags("res"),
      getResourceTags("resource"),
      getResourceTags("sou"),
      getResourceTags("rce"),
      getResourceTags("video"),
    ]);

    expectedTag = "resource";
    expect(selectedTags1.length).toBe(1);
    expect(selectedTags1[0]).toBe(expectedTag);
    expect(selectedTags2.length).toBe(1);
    expect(selectedTags2[0]).toBe(expectedTag);
    expect(selectedTags3.length).toBe(1);
    expect(selectedTags3[0]).toBe(expectedTag);
    expect(selectedTags4.length).toBe(1);
    expect(selectedTags4[0]).toBe(expectedTag);
    expect(selectedTags5.length).toBe(1);
    if (selectedTags5[0] === expectedTag) expect(false).toBe(true);

    // clears the resource database and checks if database is empty
    await deleteResources([articleId], [videoId], [resourceId]);

    done();
  };
  callback();
});
