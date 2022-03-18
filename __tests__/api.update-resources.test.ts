import { ObjectId } from "mongodb";
import { isAssetError } from "next/dist/client/route-loader";
import { getResourcesInfo } from "../pages/api/get-resources";
import { putResourceArticle } from "../pages/api/put-resource-article";
import { putResourceResource } from "../pages/api/put-resource-resource";
import { putResourceVideo } from "../pages/api/put-resource-video";
import { putResource } from "../pages/api/put-resource";

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
    category: "article",
    description: "Test Description"
};

const testVideo1: CardVideo = {
    source: "Test Source",
    name: titleVideo,
    category: "video",
    description: "Test Description"
};

const testResource1: CardResource = {
    source: "Test Source",
    name: titleResource,
    category: "resource",
    description: "Test Description"
};

const testArticle2: CardArticle = {
    source: "Test Source 2",
    name: titleArticle2,
    category: "article",
    description: "Test Description 2"

};

const testVideo2: CardVideo = {
    source: "Test Source 2",
    name: titleVideo2,
    category: "video",
    description: "Test Description 2"
};

const testResource2: CardResource = {
    source: "Test Source 2",
    name: titleResource2,
    category: "resource",
    description: "Test Description 2"
};

let newObjectId = new ObjectId();

test("update resources", (done) => {
    const callback = async () => {
        // checks if there is anything in the database at the beginning of test("
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

        await Promise.all([
            ...articles.map((article) => putResource(newObjectId, article, "article")),
            ...videos.map((video) => putResource(newObjectId, video, "video")),
            ...resources.map((resource) => putResource(newObjectId, resource, "resource")),
        ]);

        const articles2: CardArticle[] = [testArticle2];
        const videos2: CardVideo[] = [testVideo2];
        const resources2: CardResource[] = [testResource2];

        await Promise.all([
            ...articles2.map((article) => putResource(newObjectId, article, "article")),
            ...videos2.map((video) => putResource(newObjectId, video, undefined)),
            ...resources2.map((resource) => putResource(newObjectId, resource, undefined)),
        ]);

        updateArticle._id = newObjectId;
        updateVideo._id = newObjectId;
        updateResource._id = newObjectId;

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

        delete updateArticle.category;
        delete updateVideo.category;
        delete updateResource.category;

        for (let i = 0; i < actualArticles.length; i++) {
            if (actualArticles[i]._id.equals(newObjectId)) {
                expect(actualArticles[i]).toEqual(updateArticle);
                articleCount++;
            }
            articleId.push(actualArticles[i]._id);
        }

        for (let i = 0; i < actualVideos.length; i++) {
            if (actualVideos[i]._id.equals(newObjectId)) {
                expect(actualVideos[i]).toEqual(updateVideo);
                videoCount++;
            }
            videoId.push(actualVideos[i]._id);
        }

        for (let i = 0; i < actualResources.length; i++) {
            if (actualResources[i]._id.equals(newObjectId)) {
                expect(actualResources[i]).toEqual(updateResource);
                resourceCount++;
            }
            resourceId.push(actualResources[i]._id);
        }

        const expectedCount = 1;
        expect(articleCount).toEqual(expectedCount);
        expect(videoCount).toEqual(expectedCount);
        expect(resourceCount).toEqual(expectedCount);

        for (let i = 0; i < articleId.length; i++)
            await putResource(articleId[i], undefined, undefined);
        for (let i = 0; i < videoId.length; i++)
            await putResource(videoId[i], undefined, undefined);
        for (let i = 0; i < resourceId.length; i++)
            await putResource(resourceId[i], undefined, undefined);


        const fetchedResourceChecks = await getResourcesInfo();
        expect(fetchedResourceChecks.articles.length).toBe(0);
        expect(fetchedResourceChecks.videoList.length).toBe(0);
        expect(fetchedResourceChecks.resources.length).toBe(0);
        done();
    };
    callback();
});

