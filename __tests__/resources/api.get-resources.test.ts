import { getResourcesInfo } from "../../pages/api/get-resources";
import { putResourceArticle } from "../../pages/api/put-resource-article";
import { putResourceResource } from "../../pages/api/put-resource-resource";
import { putResourceVideo } from "../../pages/api/put-resource-video";


jest.setTimeout(10000);

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  name: "Test Title",
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: "Test Title",
};

const testResource1: CardResource = {
  source: "Test Source",
  name: "Test Title",
};

test("should add resources and get those added resources exactly", (done) => {
  const callback = async () => {
    // checks if there is anything in the database at the beginning of test
    console.log("Get started...");
    const fetchedResourceCheck = await getResourcesInfo();
    console.log(fetchedResourceCheck);
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
    await Promise.all([
      ...articles.map((article) => putResourceArticle(undefined, article)),
      ...videos.map((video) => putResourceVideo(undefined, video)),
      ...resources.map((resource) => putResourceResource(undefined, resource)),
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

    console.log("Get deleting....");
    // deletes element in the database
    for (let i = 0; i < articleId.length; i++)
      await putResourceArticle(articleId[i], undefined);
    for (let i = 0; i < videoId.length; i++)
      await putResourceVideo(videoId[i], undefined);
    for (let i = 0; i < resourceId.length; i++)
      await putResourceResource(resourceId[i], undefined);


    const fetchedResourcesCheck = await getResourcesInfo();
    console.log(fetchedResourcesCheck);
    expect(fetchedResourcesCheck.articles.length).toBe(0);
    expect(fetchedResourcesCheck.videoList.length).toBe(0);
    expect(fetchedResourcesCheck.resources.length).toBe(0);
    done();
  };
  callback();
});
