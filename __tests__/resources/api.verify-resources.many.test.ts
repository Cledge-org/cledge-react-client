import { ObjectId } from "mongodb";
import {putResourceVideo} from "../../pages/api/put-resource-video";
import { getResourcesInfo } from "../../pages/api/get-resources";
import { putResourceArticle } from "../../pages/api/put-resource-article";
import { putResourceResource } from "../../pages/api/put-resource-resource";


jest.setTimeout(1000000);

const titleArticle = "Test Article";
const titleVideo = "Test Video";

const titleResource = "Test Resource";

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  name: titleArticle,
  category: ""
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: titleVideo,
  category: ""
};

const testResource1: CardResource = {
  source: "Test Source",
  name: titleResource,
  category: ""
};


test("verify resources",  (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    const fetchedResourceCheck = await getResourcesInfo();
    // expect(fetchedResourceCheck.articles.length).toBe(0);
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
        ...articles.map((article) => putResourceArticle(undefined, article)),
        ...videos.map((video) => putResourceVideo(undefined, video)),
        ...resources.map((resource) => putResourceResource(undefined, resource)),
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

    // put functionality to delete
    for (let i = 0; i < manySize; i++) {
      await putResourceArticle(articleId.pop(), undefined);
      await putResourceVideo(videoId.pop(), undefined);
      await putResourceResource(resourceId.pop(), undefined);
    }

    const fetchedResourceChecks = await getResourcesInfo();
    expect(fetchedResourceChecks.articles.length).toBe(0);
    expect(fetchedResourceChecks.videoList.length).toBe(0);
    expect(fetchedResourceChecks.resources.length).toBe(0);
    done();
  };
  callback();
});


