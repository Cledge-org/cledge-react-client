import { getAllPathwayProgress } from "../pages/api/get-all-pathway-progress";
import { getAllPathways } from "../pages/api/get-all-pathways";
import { getPathwayProgress } from "../pages/api/get-pathway-progress";
import { getPathway } from "../pages/api/get-pathway";
import { putPathwayModulePersonalizedContent } from "../pages/api/put-pathway-module-personalized-content";
import { putPathwayModule } from "../pages/api/put-pathway-module";
import { putPathwayProgress } from "../pages/api/put-pathway-progress";
import { putPathway } from "../pages/api/put-pathway";
import { MongoClient, ObjectId } from "mongodb";
import { createUser } from "../pages/api/create-user";
import { updateUser } from "../pages/api/update-user";
import { getPathwayTags, putPathwayTags } from "../pages/api/cache-new-tags";

const testPersonalizedContentTag = ["Test Tag 1", "Test Tag 2", "Test Tag 3"];
const pathwayModule1ObjectId = new ObjectId();
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
const pathway1ObjectId = new ObjectId();
const testPathway: Pathway = {
  _id: pathway1ObjectId,
  name: testPathwayName,
  modules: testPathwayModules,
  tags: testPathwayTag,
  part: "",
  order: 0,
};

const testPathway_Db: Pathway_Db = {
  _id: new ObjectId(),
  name: testPathwayName,
  tags: testPathwayTag,
  modules: [pathwayModule1ObjectId],
  part: "",
  order: 0,
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

const testUserPathwayTag = [
  "Test User Tag 1",
  "Test User Tag 2",
  "Test User Tag 3",
];

const testUserCheckIns = ["Test CheckIn 1", "Test CheckIn 2", "Test CheckIn 3"];
const testDashboard: Dashboard = {
  userName: "Test UserName",
  userTags: testUserPathwayTag,
  userProgress: [testPathwayProgress],
  checkIns: testUserCheckIns,
};

// Update Data
const testPersonalizedContentTag2 = [
  "Test 2 Tag 1",
  "Test 2 Tag 2",
  "Test 2 Tag 3",
];

const testPersonalizedContent2: PersonalizedContent = {
  _id: new ObjectId(),
  moduleId: pathwayModule1ObjectId,
  priority: 0,
  tags: testPersonalizedContentTag2,
  name: "Test Name 2",
  type: "Test Type 2",
  url: "Test Url 2",
};

const testPresetContent2: PresetContent = {
  priority: 0,
  name: "Test Name 2",
  type: "Test Type 2",
  url: "Test Url 2",
};

const testPathwayModuleName2 = "Test Name 2";
const testPathwayModuleTag2 = ["Test Pathway Module Tag 2"];
const testPathwayModule2: PathwayModule = {
  _id: pathwayModule1ObjectId,
  name: testPathwayModuleName2,
  presetContent: [testPresetContent2],
  personalizedContent: [testPersonalizedContent2],
  tags: testPathwayModuleTag2,
};

const testPathwayModule_Db2: PathwayModule_Db = {
  _id: new ObjectId(),
  name: testPathwayModuleName2,
  presetContent: [testPresetContent2],
  tags: testPathwayModuleTag2,
};

const testPathwayName2 = "Test Name 2";
const testPathwayTag2 = ["Test Pathway Tag 2"];
const testPathwayModules2 = [testPathwayModule2];
const testPathway2: Pathway = {
  _id: pathway1ObjectId,
  name: testPathwayName2,
  modules: testPathwayModules2,
  tags: testPathwayTag2,
  part: "",
  order: 0,
};

const testPathway_Db2: Pathway_Db = {
  _id: new ObjectId(),
  name: testPathwayName2,
  tags: testPathwayTag2,
  modules: [pathwayModule1ObjectId],
  part: "",
  order: 0,
};

const testContentProgress2: ContentProgress = {
  finished: false,
  name: testPathwayName2,
  videoTime: 0,
};

const testContentProgresses2 = [testContentProgress2];
const testModuleProgress2: ModuleProgress = {
  moduleId: new ObjectId(),
  finished: false,
  name: testPathwayModuleName2,
  contentProgress: testContentProgresses2,
};

const testModuleProgresses2 = [testModuleProgress2];
const testPathwayProgress2: PathwayProgress = {
  pathwayId: pathway1ObjectId,
  finished: false,
  name: testPathwayName2,
  moduleProgress: testModuleProgresses2,
};

const testUserPathwayTag2 = [
  "Test 2 User Tag 1",
  "Test 2 User Tag 2",
  "Test 2 User Tag 3",
];

const testUserCheckIns2 = [
  "Test 2 CheckIn 1",
  "Test 2 CheckIn 2",
  "Test 2 CheckIn 3",
];

const testDashboard2: Dashboard = {
  userName: "Test UserName 2",
  userTags: testUserPathwayTag2,
  userProgress: [testPathwayProgress2],
  checkIns: testUserCheckIns2,
};

beforeEach(async () => {
  // clear relevant databases
  const client = await MongoClient.connect(process.env.MONGO_URL);
  for (const connection of await client.db("pathways").collections()) {
    await connection.deleteMany({});
  }
  await client.close();
});

async function createNewUser(firebaseId) {
  await createUser({
    firebaseId: firebaseId,
    name: "Test User",
    address: "Test address",
    grade: 11,
    birthday: new Date(),
    email: "Test email",
    tags: testPersonalizedContentTag,
    checkIns: testUserCheckIns,
  });
}

test("should add one pathway and get that one added pathway exactly", (done) => {
  const callback = async () => {
    // creates a new user
    const testUserFirebaseId = "Test User Id";
    await createNewUser(testUserFirebaseId);

    // test put functionality  
    await putPathway(pathway1ObjectId, testPathway_Db);
    await putPathwayProgress(testUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [testContentProgress] });
    await putPathwayModule(pathwayModule1ObjectId, testPathwayModule_Db);
    const pathwayContentPersonalized = new ObjectId();
    await putPathwayModulePersonalizedContent(pathwayContentPersonalized, testPersonalizedContent);

    // test get functionality - should be identical to what we put
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

    expect(fetchedAllPathway.length).toBe(1);
    expect(fetchedAllPathwayProgress.length).toBe(testDashboard.userProgress.length);
    expect(fetchedPathway.modules.length).toBe(testPathway_Db.modules.length);
    expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses.length);

    expect(fetchedAllPathway[0]).toMatchObject(testPathway);
    expect(fetchedAllPathwayProgress[0]).toMatchObject(testPathwayProgress);
    expect(fetchedPathway.modules[0]).toMatchObject(testPathwayModule);
    expect(fetchedPathwayProgress.moduleProgress[0]).toMatchObject(testModuleProgresses[0]);
    done();
  };
  callback();
});

test("should update the pathway and get that one updated pathway", (done) => {
  const callback = async () => {
    // creates a new user
    const updateUserFirebaseId: string = "update user";
    await createNewUser(updateUserFirebaseId);

    const pathwayPersonalizedContentObjectId = new ObjectId();

    // test put functionality  
    await putPathway(pathway1ObjectId, testPathway_Db);
    await putPathwayProgress(updateUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [testContentProgress] });
    await putPathwayModule(pathwayModule1ObjectId, testPathwayModule_Db);
    await putPathwayModulePersonalizedContent(pathwayPersonalizedContentObjectId, testPersonalizedContent);

    // updates the data 
    await updateUser(updateUserFirebaseId, {
      firebaseId: updateUserFirebaseId,
      name: "Test User",
      address: "Test address",
      grade: 11,
      birthday: new Date(),
      email: "Test email",
      tags: testPersonalizedContentTag2,
      checkIns: testUserCheckIns2,
    });

    // test put functionality  
    await putPathway(pathway1ObjectId, testPathway_Db2);
    await putPathwayProgress(updateUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [testContentProgress2] });
    await putPathwayModule(pathwayModule1ObjectId, testPathwayModule_Db2)
    await putPathwayModulePersonalizedContent(pathwayPersonalizedContentObjectId, testPersonalizedContent2);

    // test get functionality - should be identical to what we put
    const fetchedAllPathway = await getAllPathways();
    const fetchedAllPathwayProgress = await getAllPathwayProgress(updateUserFirebaseId);
    const fetchedPathway = await getPathway(updateUserFirebaseId, pathway1ObjectId);
    const fetchedPathwayProgress = await getPathwayProgress(updateUserFirebaseId, pathway1ObjectId);

    const allPathwayId = [];

    expect(fetchedAllPathway.length).toBe(1);
    expect(fetchedAllPathwayProgress.length).toBe(testDashboard2.userProgress.length);
    expect(fetchedPathway.modules.length).toBe(testPathway_Db2.modules.length);
    expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses2.length);

    let hasPathway = false;
    expect(fetchedAllPathway[0]).toMatchObject(testPathway2);
    hasPathway = true;
    allPathwayId.push(fetchedAllPathway[0]._id);

    let hasPathwayProgress = false;
    expect(fetchedAllPathwayProgress[0]).toMatchObject(testPathwayProgress2);
    hasPathwayProgress = true;

    let hasModuleProgress = false;
    expect(fetchedPathwayProgress.moduleProgress[0]).toMatchObject(testModuleProgresses2[0]);
    hasModuleProgress = true;

    expect(hasPathway).toBe(true);
    expect(hasPathwayProgress).toBe(true);
    expect(hasModuleProgress).toBe(true);
    done();
  };
  callback();
});

test("should verify many pathways", (done) => {
  function createPathway(i: string, pathwayId: ObjectId, moduleId: ObjectId): {
    pathwayDb: Pathway_Db, contentProgress: ContentProgress, pathwayModuleDb: PathwayModule_Db, personalizedContent: PersonalizedContent,
    pathway: Pathway, pathwayProgress: PathwayProgress, pathwayModule: PathwayModule, moduleProgress: ModuleProgress
  } {
    const testPersonalizedContentTag = ["Test Tag 1", "Test Tag 2", "Test Tag 3"];
    const testPersonalizedContent: PersonalizedContent = {
      _id: new ObjectId(),
      moduleId: moduleId,
      priority: 0,
      tags: testPersonalizedContentTag,
      name: "Test Name " + i,
      type: "Test Type " + i,
      url: "Test Url " + i,
    };

    const testPresetContent: PresetContent = {
      priority: 0,
      name: "Test Name " + i,
      type: "Test Type " + i,
      url: "Test Url " + i,
    };

    const testPathwayModuleName = "Test Name " + i;
    const testPathwayModuleTag = ["Test Pathway Module Tag " + i];
    const testPathwayModule: PathwayModule = {
      _id: moduleId,
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

    const testPathwayName = "Test Name " + i;
    const testPathwayTag = ["Test Pathway Tag " + i];
    const testPathwayModules = [testPathwayModule];
    const testPathway: Pathway = {
      _id: pathwayId,
      name: testPathwayName,
      modules: testPathwayModules,
      tags: testPathwayTag,
      part: "",
      order: 0,
    };

    const testPathway_Db: Pathway_Db = {
      _id: new ObjectId(),
      name: testPathwayName,
      tags: testPathwayTag,
      modules: [moduleId],
      part: "",
      order: 0,
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
      pathwayId: pathwayId,
      finished: false,
      name: testPathwayName,
      moduleProgress: testModuleProgresses,
    };

    return {
      pathwayDb: testPathway_Db,
      contentProgress: testContentProgress,
      pathwayModuleDb: testPathwayModule_Db,
      personalizedContent: testPersonalizedContent,
      pathway: testPathway,
      pathwayProgress: testPathwayProgress,
      pathwayModule: testPathwayModule,
      moduleProgress: testModuleProgress
    }
  }

  const callback = async () => {
    const manySizes = 10;
    const pathwayProgress = [];
    const pathwayIds = [];
    const moduleIds = [];
    const firebaseIds = [];

    const pathways: Pathway[] = [];
    const pathwayModule: PathwayModule[] = [];
    const moduleProgresses: ModuleProgress[] = [];

    for (let j = 0; j < manySizes; j++) {
      const pathwayId = new ObjectId();
      const moduleId = new ObjectId();
      const firebaseId = "Test User Id " + j;

      const pathwayResult = createPathway(j + "", pathwayId, moduleId);

      pathwayIds.push(pathwayId);
      moduleIds.push(moduleId);
      firebaseIds.push(firebaseId);
      pathways.push(pathwayResult.pathway);
      pathwayModule.push(pathwayResult.pathwayModule);
      pathwayProgress.push(pathwayResult.pathwayProgress);
      moduleProgresses.push(pathwayResult.moduleProgress)

      // creates a new user
      await createNewUser(firebaseId);

      // test put functionality
      await putPathway(pathwayId, pathwayResult.pathwayDb);
      await putPathwayProgress(firebaseId, { [moduleId.toString()]: [pathwayResult.contentProgress] });
      await putPathwayModule(moduleId, pathwayResult.pathwayModuleDb);
      await putPathwayModulePersonalizedContent(undefined, pathwayResult.personalizedContent);

    }

    const fetchedAllPathway = await getAllPathways();
    expect(fetchedAllPathway.length).toBe(manySizes);
    for (let i = 0; i < fetchedAllPathway.length; i++) {
      expect(fetchedAllPathway[i]).toMatchObject(pathways[i]);
    }

    for (let j = 0; j < manySizes; j++) {
      // test get functionality - should be identical to what we put
      const [
        fetchedAllPathwayProgress,
        fetchedPathway,
        fetchedPathwayProgress,
      ] = await Promise.all([
        getAllPathwayProgress(firebaseIds[j]),
        getPathway(firebaseIds[j], pathwayIds[j]),
        getPathwayProgress(firebaseIds[j], pathwayIds[j]),
      ]);

      expect(fetchedAllPathwayProgress.length).toBe(manySizes);
      expect(fetchedPathway.modules.length).toBe(testPathway_Db.modules.length);
      expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses.length);

      for (let i = 0; i < fetchedPathway.tags.length; i++) {
        expect(fetchedPathway.modules[i]).toMatchObject(pathwayModule[j]);
      }

      for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
        expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(moduleProgresses[j]);
      }
    }
    done();
  };
  callback();
});

test("should add pathways and get appropriate tag", (done) => {
  const callback = async () => {

    // creates a new user
    const testUserFirebaseId = "Test User Id";
    await createNewUser(testUserFirebaseId);

    // test put functionality  
    await putPathway(pathway1ObjectId, testPathway_Db);

    // test put functionality
    await putPathwayTags();

    // Checks if there is anything in the database at the beginning of test
    const fetchedPathway = await getAllPathways();

    // tests get functionality for article
    let [selectedTags1, selectedTags2, selectedTags3, selectedTags4, selectedTags5, selectedTags6] = await Promise.all([
      getPathwayTags("Test"), getPathwayTags("Test Pathway"), getPathwayTags("Pathway"), getPathwayTags("Test Pathway Tag"), getPathwayTags("way"), getPathwayTags("xyz")
    ]);

    let expectedTag = "Test Pathway Tag";
    expect(selectedTags1.length).toBe(1);
    expect(selectedTags1[0]).toBe(expectedTag);
    expect(selectedTags2.length).toBe(1);
    expect(selectedTags2[0]).toBe(expectedTag);
    expect(selectedTags3.length).toBe(1);
    expect(selectedTags3[0]).toBe(expectedTag);
    expect(selectedTags4.length).toBe(1);
    expect(selectedTags4[0]).toBe(expectedTag);
    expect(selectedTags5.length).toBe(1);
    expect(selectedTags5[0]).toBe(expectedTag);
    expect(selectedTags6.length).toBe(0);

    done();
  };
  callback();
});



