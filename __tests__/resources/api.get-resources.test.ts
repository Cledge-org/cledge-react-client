import { getResourcesInfo } from "../../pages/api/get-resources";
import { putResourceArticle } from "../../pages/api/put-resource-article";
import { putResourceResource } from "../../pages/api/put-resource-resource";
import { putResourceVideo } from "../../pages/api/put-resource-video";
import { putResource } from "../../pages/api/put-resource";


jest.setTimeout(10000);

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  name: "Test Title",
  category: "article"
};

const testVideo1: CardVideo = {
  source: "Test Source",
  name: "Test Title",
  category: "video"
};

const testResource1: CardResource = {
  source: "Test Source",
  name: "Test Title",
  category: "resource"
};

test("should add resources and get those added resources exactly", (done) => {
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
      console.log(fetchedResources.articles[i]);
      console.log(articles[i]);
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


    const fetchedResourcesCheck = await getResourcesInfo();
    expect(fetchedResourcesCheck.articles.length).toBe(0);
    expect(fetchedResourcesCheck.videoList.length).toBe(0);
    expect(fetchedResourcesCheck.resources.length).toBe(0);
    done();
  };
  callback();
});
