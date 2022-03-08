import { ObjectId } from "mongodb";
import { getResourcesInfo } from "../pages/api/get-resources";
import { putResourceArticle} from "../pages/api/put-resource-article";
import { putResourceResource } from "../pages/api/put-resource-resource";
import { putResourceVideo } from "../pages/api/put-resource-video";

jest.setTimeout(1000000);

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

test ("verify resources", async () => {
  let articles = [testArticle1];
  let videos = [testVideo1];
  let resources = [testResource1];
  let manySize = 100;
  for (let i = 0; i < manySize; i++) {
    await Promise.all([
      ...articles.map((article) => putResourceArticle(new ObjectId(), article)),
      ...videos.map((video) => putResourceVideo(new ObjectId(), video)),
      ...resources.map((resource) => putResourceResource(new ObjectId(), resource)),
    ]);
  }
  
  const fetchedResources = await getResourcesInfo();
  let articleId = [ ];
  let videoId = [ ];
  let resourceId = [ ];

  expect(fetchedResources.articles.length).toBe(manySize);
  expect(fetchedResources.videoList.length).toBe(manySize);
  expect(fetchedResources.resources.length).toBe(manySize);
  for (let i = 0; i < fetchedResources.articles.length; i++) {
    articleId.push(fetchedResources.articles[i]._id);
    expect(fetchedResources.articles[i]).toMatchObject(articles[0]);
  }
  for (let i = 0; i < fetchedResources.videoList.length; i++) {
    videoId.push(fetchedResources.articles[i]._id);
    expect(fetchedResources.videoList[i]).toMatchObject(videos[0]);
  }
  for (let i = 0; i < fetchedResources.resources.length; i++) {
    resourceId.push(fetchedResources.articles[i]._id);
    expect(fetchedResources.resources[i]).toMatchObject(resources[0]);
  }

  for (let i = 0; i < manySize; i++) {
    await putResourceArticle(articleId[i], undefined);
    await putResourceVideo(videoId[i], undefined);
    await putResourceResource(resourceId[i], undefined);
  }  
});


