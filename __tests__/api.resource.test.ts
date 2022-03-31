import { getResourcesInfo } from "../pages/api/get-resources";
import { putResource } from "../pages/api/put-resource";
import { ObjectId } from "mongodb";

jest.setTimeout(10000);

const titleArticle = "Test Article";
const titleVideo = "Test Video";
const titleResource = "Test Resource";
const titleArticle2 = "Test Article 2";
const titleVideo2 = "Test Video 2";
const titleResource2 = "Test Resource 2";

const testArticle1: CardArticle = {
  source: "Test Source",
  name: titleArticle,
  description: "Test Description"
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
  description: "Test Description"
};

const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
  description: "Test Description"
};

const testArticle2: CardArticle = {
  source: "Test Source 2",
  name: titleArticle2,
  description: "Test Description 2"

};

const testVideo2: CardVideo = {
  source: "Test Source 2",
  name: titleVideo2,
  description: "Test Description 2"
};

const testResource2: CardResource = {
  source: "Test Source 2",
  name: titleResource2,
  description: "Test Description 2"
};

test("should add resources and get those added resources exactly and verify if those resources are deleted", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    expect(fetchedResourceCheck.articles.length).toBe(0);
    expect(fetchedResourceCheck.videoList.length).toBe(0);
    expect(fetchedResourceCheck.resources.length).toBe(0);

    let articleId = [];
    let videoId = [];
    let resourceId = [];
    // Test put functionality
    const articles: CardArticle[] = [testArticle1];
    const videos: CardVideo[] = [testVideo1];
    const resources: CardResource[] = [testResource1];

    // manually create unique objectids for each test resource
    await Promise.all([
      ...articles.map((article) => putResource(undefined, article, "article")),
      ...videos.map((video) => putResource(undefined, video, "video")),
      ...resources.map((resource) => putResource(undefined, resource, "resource")),
    ]);

    // Test get functionality - should be identical to what we put
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(articles.length);
    expect(fetchedResources.videoList.length).toBe(videos.length);
    expect(fetchedResources.resources.length).toBe(resources.length);


    for (let i = 0; i < fetchedResources.articles.length; i++) {
      expect(fetchedResources.articles[i]).toMatchObject(articles[i]);
      articleId.push(fetchedResources.articles[i]._id);
    }

    for (let i = 0; i < fetchedResources.videoList.length; i++) {
      expect(fetchedResources.videoList[i]).toMatchObject(videos[i]);
      videoId.push(fetchedResources.videoList[i]._id);
    }

    for (let i = 0; i < fetchedResources.resources.length; i++) {
      expect(fetchedResources.resources[i]).toMatchObject(resources[i]);
      resourceId.push(fetchedResources.resources[i]._id);
    }

    // deletes element in the database
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

    const articles: CardArticle[] = [testArticle1];
    const videos: CardVideo[] = [testVideo1];
    const resources: CardResource[] = [testResource1];
    let updateArticle = testArticle2;
    let updateVideo = testVideo2;
    let updateResource = testResource2;

    // manually create unique objectids for each test resource
    await Promise.all([
      ...articles.map((article) => putResource(undefined, article, "article")),
      ...videos.map((video) => putResource(undefined, video, "video")),
      ...resources.map((resource) => putResource(undefined, resource, "resource")),
    ]);

    // get resource after put the new one to get ids
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(articles.length);
    expect(fetchedResources.videoList.length).toBe(videos.length);
    expect(fetchedResources.resources.length).toBe(resources.length);


    const articles2: CardArticle[] = [testArticle2];
    const videos2: CardVideo[] = [testVideo2];
    const resources2: CardResource[] = [testResource2];

    // updates the resources in the database
    await Promise.all([
      ...articles2.map((article) => putResource(fetchedResources.articles[0]._id, article, "article")),
      ...videos2.map((video) => putResource(fetchedResources.videoList[0]._id, video, "video")),
      ...resources2.map((resource) => putResource(fetchedResources.resources[0]._id, resource, "resource")),
    ]);

    updateArticle._id = fetchedResources.articles[0]._id;
    updateVideo._id = fetchedResources.videoList[0]._id;
    updateResource._id = fetchedResources.resources[0]._id;

    let actualResource = await getResourcesInfo();
    let actualArticles = actualResource.articles;
    let actualVideos = actualResource.videoList;
    let actualResources = actualResource.resources;

    let articleId = [];
    let videoId = [];
    let resourceId = [];

    let articleCount = 0;
    let videoCount = 0;
    let resourceCount = 0;

    for (let i = 0; i < actualArticles.length; i++) {
      if (actualArticles[i]._id.equals(updateArticle._id)) {
        expect(actualArticles[i]).toEqual(updateArticle);
        articleCount++;
      }
      articleId.push(actualArticles[i]._id);
    }

    for (let i = 0; i < actualVideos.length; i++) {
      if (actualVideos[i]._id.equals(updateVideo._id)) {
        expect(actualVideos[i]).toEqual(updateVideo);
        videoCount++;
      }
      videoId.push(actualVideos[i]._id);
    }

    for (let i = 0; i < actualResources.length; i++) {
      if (actualResources[i]._id.equals(updateResource._id)) {
        expect(actualResources[i]).toEqual(updateResource);
        resourceCount++;
      }
      resourceId.push(actualResources[i]._id);
    }

    const expectedCount = 1;
    expect(articleCount).toEqual(expectedCount);
    expect(videoCount).toEqual(expectedCount);
    expect(resourceCount).toEqual(expectedCount);

    // clears the resource database
    for (let i = 0; i < articleId.length; i++)
      await putResource(articleId[i], undefined, undefined);
    for (let i = 0; i < videoId.length; i++)
      await putResource(videoId[i], undefined, undefined);
    for (let i = 0; i < resourceId.length; i++)
      await putResource(resourceId[i], undefined, undefined);

    // checks that database is empty
    const fetchedResourceChecks = await getResourcesInfo();
    expect(fetchedResourceChecks.articles.length).toBe(0);
    expect(fetchedResourceChecks.videoList.length).toBe(0);
    expect(fetchedResourceChecks.resources.length).toBe(0);
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

    const articles: CardArticle[] = [testArticle1];
    const videos: CardVideo[] = [testVideo1];
    const resources: CardResource[] = [testResource1];
    let expectedArticle = testArticle1;
    let expectedVideo = testVideo1;
    let expectedResource = testResource1;

    let article1Id = new ObjectId();
    let video1Id = new ObjectId();
    let resource1Id = new ObjectId();

    await Promise.all([
      ...articles.map((article) => putResource(article1Id, article, "article")),
      ...videos.map((video) => putResource(video1Id, video, "video")),
      ...resources.map((resource) => putResource(resource1Id, resource, "resource")),
    ]);

    expectedArticle._id = article1Id;
    expectedVideo._id = video1Id;
    expectedResource._id = resource1Id;

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
      if (actualArticles[i]._id.equals(expectedArticle._id)) {
        expect(actualArticles[i]).toEqual(expectedArticle);
        articleCount++;
      }
      articleId.push(actualArticles[i]._id);
    }

    for (let i = 0; i < actualVideos.length; i++) {
      if (actualVideos[i]._id.equals(expectedVideo._id)) {
        expect(actualVideos[i]).toEqual(expectedVideo);
        videoCount++;
      }
      videoId.push(actualVideos[i]._id);
    }

    for (let i = 0; i < actualResources.length; i++) {
      if (actualResources[i]._id.equals(expectedResource._id)) {
        expect(actualResources[i]).toEqual(expectedResource);
        resourceCount++;
      }
      resourceId.push(actualResources[i]._id);
    }

    const expectedCount = 1;
    expect(articleCount).toEqual(expectedCount);
    expect(videoCount).toEqual(expectedCount);
    expect(resourceCount).toEqual(expectedCount);

    // clears resource database
    for (let i = 0; i < articleId.length; i++)
      await putResource(articleId[i], undefined, undefined);
    for (let i = 0; i < videoId.length; i++)
      await putResource(videoId[i], undefined, undefined);
    for (let i = 0; i < resourceId.length; i++)
      await putResource(resourceId[i], undefined, undefined);

    // checks that the database is empty
    const fetchedResourcesCheck = await getResourcesInfo();
    expect(fetchedResourcesCheck.articles.length).toBe(0);
    expect(fetchedResourcesCheck.videoList.length).toBe(0);
    expect(fetchedResourcesCheck.resources.length).toBe(0);
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

    let articles = [testArticle1];
    let videos = [testVideo1];
    let resources = [testResource1];
    let manySize = 100;
    let articleId = [];
    let videoId = [];
    let resourceId = [];

    for (let i = 0; i < manySize; i++) {
      await Promise.all([
        ...articles.map((article) => putResource(undefined, article, "article")),
        ...videos.map((video) => putResource(undefined, video, "video")),
        ...resources.map((resource) => putResource(undefined, resource, "resource")),
      ]);
    }

    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(manySize);
    expect(fetchedResources.videoList.length).toBe(manySize);
    expect(fetchedResources.resources.length).toBe(manySize);

    for (let i = 0; i < fetchedResources.articles.length; i++) {
      articleId.push(fetchedResources.articles[i]._id);
      expect(fetchedResources.articles[i]).toMatchObject(articles[0]);
    }
    for (let i = 0; i < fetchedResources.videoList.length; i++) {
      videoId.push(fetchedResources.videoList[i]._id);
      expect(fetchedResources.videoList[i]).toMatchObject(videos[0]);
    }
    for (let i = 0; i < fetchedResources.resources.length; i++) {
      resourceId.push(fetchedResources.resources[i]._id);
      expect(fetchedResources.resources[i]).toMatchObject(resources[0]);
    }

    // clears resource datbase
    for (let i = 0; i < manySize; i++) {
      await putResource(articleId.pop(), undefined, undefined);
      await putResource(videoId.pop(), undefined, undefined);
      await putResource(resourceId.pop(), undefined, undefined);
    }

    // checks that database is empty
    const fetchedResourceChecks = await getResourcesInfo();
    expect(fetchedResourceChecks.articles.length).toBe(0);
    expect(fetchedResourceChecks.videoList.length).toBe(0);
    expect(fetchedResourceChecks.resources.length).toBe(0);
    done();
  };
  callback();
});
