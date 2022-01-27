import { getResourcesInfo } from "../pages/api/get-resources";
import { putResourceArticle } from "../pages/api/put-resource-article";
import { putResourceResource } from "../pages/api/put-resource-resource";
import { putResourceVideo } from "../pages/api/put-resource-video";

const testArticle1: CardArticle = {
  description: "Test Description",
  source: "Test Source",
  title: "Test Title",
};

const testVideo1: CardVideo = {
  source: "Test Source",
  title: "Test Title",
};

const testResource1: CardResource = {
  source: "Test Source",
  title: "Test Title",
};

test("should add resources and get those added resources exactly", (done) => {
  const callback = async () => {
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
    }
    for (let i = 0; i < fetchedResources.videoList.length; i++) {
      expect(fetchedResources.videoList[i]).toMatchObject(videos[i]);
    }
    for (let i = 0; i < fetchedResources.resources.length; i++) {
      expect(fetchedResources.resources[i]).toMatchObject(resources[i]);
    }
    done();
  };
  callback();
});
