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

test("should add one resource and get that one added resource exactly and verify if that resource is deleted", (done) => {
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
    const article: CardArticle = testArticle1;
    const video: CardVideo = testVideo1;
    const resource: CardResource = testResource1;

    // manually create unique objectids for each test resource
    await putResource(undefined, article, "article");
    await putResource(undefined, video, "video");
    await putResource(undefined, resource, "resource");

    // Test get functionality - should be identical to what we put
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(1);
    expect(fetchedResources.videoList.length).toBe(1);
    expect(fetchedResources.resources.length).toBe(1);

    expect(fetchedResources.articles[0]).toMatchObject(article);
    articleId.push(fetchedResources.articles[0]._id);
    
    expect(fetchedResources.videoList[0]).toMatchObject(video);
    videoId.push(fetchedResources.videoList[0]._id);
    
    expect(fetchedResources.resources[0]).toMatchObject(resource);
    resourceId.push(fetchedResources.resources[0]._id);

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

    const article: CardArticle = testArticle1;
    const video: CardVideo = testVideo1;
    const resource: CardResource = testResource1;
    let updateArticle = testArticle2;
    let updateVideo = testVideo2;
    let updateResource = testResource2;

    // manually create unique objectids for each test resource
    await putResource(undefined, article, "article");
    await putResource(undefined, video, "video");
    await putResource(undefined, resource, "resource");

    // get resource after put the new one to get ids
    const fetchedResources = await getResourcesInfo();
    expect(fetchedResources.articles.length).toBe(1);
    expect(fetchedResources.videoList.length).toBe(1);
    expect(fetchedResources.resources.length).toBe(1);


    const article2: CardArticle = testArticle2;
    const video2: CardVideo = testVideo2;
    const resource2: CardResource = testResource2;

    // updates the resources in the database
    await putResource(fetchedResources.articles[0]._id, article2, "article");
    await putResource(fetchedResources.videoList[0]._id, video2, "video");
    await putResource(fetchedResources.resources[0]._id, resource2, "resource");

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

    let hasArticle = false;
    if (actualArticles[0]._id.equals(updateArticle._id)) {
      expect(actualArticles[0]).toEqual(updateArticle);
      hasArticle = true;
    }
    articleId.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(updateVideo._id)) {
      expect(actualVideos[0]).toEqual(updateVideo);
      hasVideo = true;
    }
    videoId.push(actualVideos[0]._id);
    
    let hasResource = false;
    if (actualResources[0]._id.equals(updateResource._id)) {
      expect(actualResources[0]).toEqual(updateResource);
      hasResource = true;
    }
    resourceId.push(actualResources[0]._id);
    
    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

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

    const article: CardArticle = testArticle1;
    const video: CardVideo = testVideo1;
    const resource: CardResource = testResource1;
    let expectedArticle = testArticle1;
    let expectedVideo = testVideo1;
    let expectedResource = testResource1;

    let article1Id = new ObjectId();
    await putResource(article1Id, article, "article");
    let video1Id = new ObjectId();
    await putResource(video1Id, video, "video");
    let resource1Id = new ObjectId();
    await putResource(resource1Id, resource, "resource");
    
    expectedArticle._id = article1Id;
    expectedVideo._id = video1Id;
    expectedResource._id = resource1Id;

    let actualResource = await getResourcesInfo();
    let actualArticles = actualResource.articles;
    let actualVideos = actualResource.videoList;
    let actualResources = actualResource.resources;
  
    let articleId = [];
    let videoId = [];
    let resourceId = [];

    let hasArticle = false;
    if (actualArticles[0]._id.equals(expectedArticle._id)) {
      expect(actualArticles[0]).toEqual(expectedArticle);
      hasArticle = true;
    }
    articleId.push(actualArticles[0]._id);

    let hasVideo = false;
    if (actualVideos[0]._id.equals(expectedVideo._id)) {
      expect(actualVideos[0]).toEqual(expectedVideo);
      hasVideo = true;
    }
    videoId.push(actualVideos[0]._id);
    
    let hasResource = false;
    
    if (actualResources[0]._id.equals(expectedResource._id)) {
      expect(actualResources[0]).toEqual(expectedResource);
      hasResource = true;
    }
    resourceId.push(actualResources[0]._id);
    
    expect(hasArticle).toEqual(true);
    expect(hasVideo).toEqual(true);
    expect(hasResource).toEqual(true);

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
    
    let manySize = 100;
    let articleId = [];
    let videoId = [];
    let resourceId = [];

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
