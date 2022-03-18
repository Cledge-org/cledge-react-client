import { getAllPathwayProgress } from "../../pages/api/get-all-pathway-progress";
import { getAllPathways } from "../../pages/api/get-all-pathways";
import { getPathwayProgress } from "../../pages/api/get-pathway-progress";
import { getPathway } from "../../pages/api/get-pathway";
import { putPathwayModulePersonalizedContent } from "../../pages/api/put-pathway-module-personalized-content";
import { putPathwayModule } from "../../pages/api/put-pathway-module";
import { putPathwayProgress } from "../../pages/api/put-pathway-progress";
import { putPathway } from "../../pages/api/put-pathway";
import { ObjectId } from "mongodb";
import { createUser } from "../../pages/api/create-user";

const pathwayModule1ObjectId = new ObjectId();
const testPersonalizedContentTag = ["Test Tag 1", "Test Tag 2", "Test Tag 3"];
const testPersonalizedContent: PersonalizedContent = {
  _id: new ObjectId(),
  moduleId: pathwayModule1ObjectId,
  priority: 0,
  tags: testPersonalizedContentTag,
  name: "Test Name",
  type: "Test Type",
  url: "Test Url",
};

const testPresetContent: PresetContent = {
  priority: 0,
  name: "Test Name",
  type: "Test Type",
  url: "Test Url",
};
const pathway1ObjectId = new ObjectId();
const testPathwayModuleName = "Test Name";
const testPathwayModuleTag = ["Test Pathway Module Tag"];
const testPathwayModule: PathwayModule = {
  _id: pathwayModule1ObjectId,
  name: testPathwayModuleName,
  presetContent: [testPresetContent],
  personalizedContent: [testPersonalizedContent],
  tags: testPathwayModuleTag,
};


const testPathwayModule_Db: PathwayModule_Db = {
  _id: new ObjectId(),
  name: testPathwayModuleName,
  presetContent: [testPresetContent],
  tags: testPathwayModuleTag,
};

const testPathwayName = "Test Name";
const testPathwayTag = ["Test Pathway Tag"];
const testPathwayModules = [testPathwayModule];
const testPathway: Pathway = {
  _id: pathway1ObjectId,
  name: testPathwayName,
  modules: testPathwayModules,
  tags: testPathwayTag,
  part: "",
  order: 0
};

const testPathway_Db: Pathway_Db = {
  _id: new ObjectId(),
  name: testPathwayName,
  tags: testPathwayTag,
  modules: [pathwayModule1ObjectId],
  part: "",
  order: 0
};

const testContentProgress: ContentProgress = {
  finished: false,
  name: testPathwayName,
  videoTime: 0,
};

const testContentProgresses = [testContentProgress];
const testModuleProgress: ModuleProgress = {
  moduleId: new ObjectId(),
  finished: false,
  name: testPathwayModuleName,
  contentProgress: testContentProgresses,
};

const testModuleProgresses = [testModuleProgress];
const testPathwayProgress: PathwayProgress = {
  pathwayId: pathway1ObjectId,
  finished: false,
  name: testPathwayName,
  moduleProgress: testModuleProgresses, 
};

const testUserPathwayTag = ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"];
const testUserPathway: UserPathway = {
  pathway: "Test Course 1", // need to update
  userTags: testUserPathwayTag,
  userCourseProgress: testPathwayProgress,
};

const testUserCheckIns = ["Test CheckIn 1", "Test CheckIn 2", "Test CheckIn 3"];
const testDashboard: Dashboard = {
  userName: "Test UserName",
  userTags: testUserPathwayTag,
  userProgress: [testPathwayProgress],
  checkIns: testUserCheckIns,
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
    tags: testPersonalizedContentTag,
    checkIns: testUserCheckIns,
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

    await Promise.all([
      ...pathwayDb.map((pathway_put) => 
      putPathway(pathway1ObjectId, pathway_put)),
    ]);

    await Promise.all([
      ...contentProgress.map((content_progress) => 
      putPathwayProgress(testUserFirebaseId, {[pathwayModule1ObjectId.toString()]: [content_progress]})),
    ]);
  
    await Promise.all([
      ...pathwayModuleDb.map((pathway_module) => 
      putPathwayModule(pathwayModule1ObjectId, pathway_module)),
    ]);

    await Promise.all([
      ...personalizedContent.map((responses) => 
      putPathwayModulePersonalizedContent(undefined, responses)),
    ]);

    // Test get functionality - should be identical to what we put
    const [
      fetchedAllPathway, 
      fetchedAllPathwayProgress,
      fetchedPathway,
      fetchedPathwayProgress,
    ] = await Promise.all([
      getAllPathways(),
      getAllPathwayProgress(testUserFirebaseId),
      getPathway(testUserFirebaseId, pathway1ObjectId),
      getPathwayProgress(testUserFirebaseId, pathway1ObjectId),
    ]);


    let allPathwayId = [];

    expect(fetchedAllPathway.length).toBe(pathwayDb.length);
    expect(fetchedAllPathwayProgress.length).toBe(testDashboard.userProgress.length);
    expect(fetchedPathway.modules.length).toBe(testPathway_Db.modules.length);  
    expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses.length);
   
    for (let i = 0; i < fetchedAllPathway.length; i++) {
      expect(fetchedAllPathway[i]).toMatchObject(pathway[i]);
      allPathwayId.push(fetchedAllPathway[i]._id);
    }

    for (let i = 0; i < fetchedAllPathwayProgress.length; i++) {
      expect(fetchedAllPathwayProgress[i]).toMatchObject(pathwayProgress[i]);
    }
    for (let i = 0; i < fetchedPathway.tags.length; i++) {
      expect(fetchedPathway.modules[i]).toMatchObject(pathwayModule[i]);
    }
    for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
      expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(testModuleProgresses[i]);
    }
    
    for (let i = 0; i < allPathwayId.length; i++)
        await putPathway(allPathwayId[i], undefined);

    // Verifying pathways are empty       
    const fetchedAllPathwayCheck =  await getAllPathways();
    expect(fetchedAllPathwayCheck.length).toBe(0);

    done();
  };
  callback();
});
