import { ObjectId } from "mongodb";
import { isAssetError } from "next/dist/client/route-loader";
import { getResourcesInfo } from "../../pages/api/get-resources";
import { putResourceArticle } from "../../pages/api/put-resource-article";
import { putResourceResource } from "../../pages/api/put-resource-resource";
import { putResourceVideo } from "../../pages/api/put-resource-video";


jest.setTimeout(10000);

const titleArticle = "Test Article";
const titleVideo = "Test Video";
const titleResource = "Test Resource";
const titleArticle2 = "Test Article 2";
const titleVideo2 = "Test Video 2";
const titleResource2 = "Test Resource 2";

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


const testArticle2: CardArticle = {
    description: "Test Description 2",
    source: "Test Source 2",
    name: titleArticle2,
    category: ""
};

const testVideo2: CardVideo = {
    source: "Test Source 2",
    name: titleVideo2,
    category: ""
};

const testResource2: CardResource = {
    source: "Test Source 2",
    name: titleResource2,
    category: ""
};


test("update resources", (done) => {
    const callback = async () => {
        // checks if there is anything in the database at the beginning of test("
        console.log("update start...");
        let newObjectId = new ObjectId();

        const fetchedResourceCheck = await getResourcesInfo();
        console.log(fetchedResourceCheck);
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
            ...articles.map((article) => putResourceArticle(newObjectId, article)),
            ...videos.map((video) => putResourceVideo(newObjectId, video)),
            ...resources.map((resource) => putResourceResource(newObjectId, resource)),
        ]);

        const articles2: CardArticle[] = [testArticle2];
        const videos2: CardVideo[] = [testVideo2];
        const resources2: CardResource[] = [testResource2];

        await Promise.all([
            ...articles2.map((article) => putResourceArticle(newObjectId, article)),
            ...videos2.map((video) => putResourceVideo(newObjectId, video)),
            ...resources2.map((resource) => putResourceResource(newObjectId, resource)),
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

        console.log("Update deleting");
        for (let i = 0; i < articleId.length; i++)
            await putResourceArticle(articleId[i], undefined);
        for (let i = 0; i < videoId.length; i++)
            await putResourceVideo(videoId[i], undefined);
        for (let i = 0; i < resourceId.length; i++)
            await putResourceResource(resourceId[i], undefined);


        const fetchedResourceChecks = await getResourcesInfo();
        console.log(fetchedResourceChecks);
        expect(fetchedResourceChecks.articles.length).toBe(0);
        expect(fetchedResourceChecks.videoList.length).toBe(0);
        expect(fetchedResourceChecks.resources.length).toBe(0);
        done();
    };
    callback();
});

