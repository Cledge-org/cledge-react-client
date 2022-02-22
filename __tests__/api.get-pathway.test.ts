import { getAllPathwayProgress } from "../pages/api/get-all-pathway-progress";
import { getAllPathways } from "../pages/api/get-all-pathways";
import { getPathwayAndProgress } from "../pages/api/get-pathway-and-progress";
import { getPathwayProgress } from "../pages/api/get-pathway-progress";
import { getPathway } from "../pages/api/get-pathway";
import { putPathwayModulePersonalizedContent } from "../pages/api/put-pathway-module-personalized-content";
import { putPathwayModule } from "../pages/api/put-pathway-module";
import { putPathwayProgress } from "../pages/api/put-pathway-progress";
import { putPathway } from "../pages/api/put-pathway";
import { ObjectId } from "mongodb";
import { createUser } from "../pages/api/create-user";

const testPersonalizedContent: PersonalizedContent = {
  _id: new ObjectId(),
  moduleId: new ObjectId(),
  priority: 1,
  tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
  name: "Test Name",
  type: "Test Type",
  url: "Test Url",
};

const testPresetContent: PresetContent = {
  priority: 1,
  name: "Test Name",
  type: "Test Type",
  url: "Test Url",
};

const testPathwayModuleName = "Test Pathway Module Name";
const testPathwayModuleTag = "Test Pathway Module Tag"
const testPathwayModule: PathwayModule = {
  _id: new ObjectId(),
  name: testPathwayModuleName,
  presetContent: [testPresetContent],
  personalizedContent: [testPersonalizedContent],
  tags: [testPathwayModuleTag],
};

const testPathwayModule_Db: PathwayModule_Db = {
  _id: new ObjectId(),
  name: testPathwayModuleName,
  presetContent: [testPresetContent],
  tags: [testPathwayModuleTag],
};

const testPathwayName = "Test Pathway Name";
const testPathwayTag = "Test Pathway Tag"
const testPathway: Pathway = {
  _id: new ObjectId(),
  name: testPathwayName,
  modules:  [testPathwayModule],
  tags: [testPathwayTag],
};
  
const pathway1ObjectId = new ObjectId();
const testPathway_Db: Pathway_Db = {
  _id: new ObjectId(),
  tags: [testPathwayTag],
  modules: [pathway1ObjectId],
  name: testPathwayName,
};

const testContentProgress: ContentProgress = {
  finished: true,
  name: "Test Name",
  videoTime: 1,
};

const testModuleProgress: ModuleProgress = {
  moduleId: "Test Module Id",
  finished: true,
  name: "Test Name",
  contentProgress: [testContentProgress],
};


const testPathwayProgress: PathwayProgress = {
  pathwayId: "Test Pathway Id",
  finished: true,
  name: "Test Name",
  moduleProgress: [testModuleProgress], 
};

const testUserPathway: UserPathway = {
  pathway: "Test Course 1", // need to update
  userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
  userCourseProgress: testPathwayProgress,
};

const testDashboard: Dashboard = {
  userName: "Test UserName",
  userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
  userProgress: [testPathwayProgress],
  checkIns: ["Test CheckIn 1", "Test CheckIn 2", "Test CheckIn 3"],
};

const testUserFirebaseId = "Test User Id";

beforeAll(() => {
  // TODO: add personalized content with tags of those of the test user
  createUser({
    firebaseId: testUserFirebaseId,
    name: "Test User",
    address: "Test address",
    grade: 11,
    birthday: new Date(),
    email: "Test email",
    tags: [],
    checkIns: [],
  });
});

test("should add pathway and get those added pathways exactly", (done) => {
  const callback = async () => {
    // Test put functionality
    const pathway: Pathway[] = [testPathway];
    const pathwayProgress: PathwayProgress[] = [testPathwayProgress];
    const pathwayModule: PathwayModule[] = [testPathwayModule];
    const personalizedContent: PersonalizedContent[] = [testPersonalizedContent];
    const pathwayDb: Pathway_Db[] = [testPathway_Db];
    const pathwayModuleDb: PathwayModule_Db[] = [testPathwayModule_Db];
    const contentProgress: ContentProgress[] = [testContentProgress];
    const userPathway: UserPathway[] = [testUserPathway];
    const dashboard: Dashboard[] = [testDashboard];
    const moduleProgress: ModuleProgress[] = [testModuleProgress];

    await Promise.all([
      ...pathwayDb.map((pathway_put) => 
      putPathway(pathway1ObjectId, pathway_put)),
    ]);
    await Promise.all([
      ...pathwayProgress.map((pathway_progress) => 
      putPathwayProgress(testUserFirebaseId, {"Test Module Id": contentProgress})),
    ]);
    await Promise.all([
      ...pathwayModuleDb.map((pathway_module) => 
      putPathwayModule(undefined, pathway_module)),
    ]);
    await Promise.all([
      ...personalizedContent.map((responses) => 
      putPathwayModulePersonalizedContent(undefined, testPersonalizedContent)),
    ]);

    // Test get functionality - should be identical to what we put
    const [
      fetchedAllPathway, 
      fetchedAllPathwayProgress,
      fetchedPathway,
      fetchedPathwayProgress,
      fetchedPathwayAndProgress,
    ] = await Promise.all([
      getAllPathways(),
      getAllPathwayProgress(testUserFirebaseId),
      getPathway(testUserFirebaseId, pathway1ObjectId),
      getPathwayProgress(testUserFirebaseId, new ObjectId()),
      getPathwayAndProgress(testUserFirebaseId, "Test Pathway Id"),
    ]);

    expect(fetchedAllPathway.length).toBe(pathwayDb.length);
    expect(fetchedAllPathwayProgress.length).toBe(userPathway.length);
    expect(fetchedPathway.modules.length).toBe(pathwayModuleDb.length);
    expect(fetchedPathwayProgress.moduleProgress.length).toBe(moduleProgress.length);
    expect(fetchedPathwayAndProgress.pathwaysProgress.length).toBe(dashboard.length);
   
    for (let i = 0; i < fetchedAllPathway.length; i++) {
      expect(fetchedAllPathway[i]).toMatchObject(pathway[i]);
    }
    for (let i = 0; i < fetchedAllPathwayProgress.length; i++) {
      expect(fetchedAllPathwayProgress[i]).toMatchObject(pathwayProgress[i]);
    }
    for (let i = 0; i < fetchedPathway.modules.length; i++) {
      expect(fetchedPathway.modules[i]).toMatchObject(pathwayModule[i]);
    }
    for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
      expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(moduleProgress[i]);
    }
    for (let i = 0; i < fetchedPathwayAndProgress.pathwaysProgress.length; i++) {
        expect(fetchedPathwayAndProgress.pathwaysProgress[i]).toMatchObject(pathwayProgress[i]);
    }
    done();
  };
  callback();
});
