import { getAllPathwayProgress } from "../pages/api/get-all-pathway-progress";
import { getAllPathways } from "../pages/api/get-all-pathways";
import { getPathwayProgress } from "../pages/api/get-pathway-progress";
import { getPathway } from "../pages/api/get-pathway";
import { putPathwayModulePersonalizedContent } from "../pages/api/put-pathway-module-personalized-content";
import { putPathwayModule } from "../pages/api/put-pathway-module";
import { putPathwayProgress } from "../pages/api/put-pathway-progress";
import { putPathway } from "../pages/api/put-pathway";
import { ObjectId } from "mongodb";
import { createUser } from "../pages/api/create-user";
import { updateUser } from "../pages/api/update-user";

const pathway1ObjectId = new ObjectId();
const pathwayModule1ObjectId = new ObjectId();
const pathwayPersonalizedContentObjectId = new ObjectId();

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

///////////////////////////////////////////////////////////////////////////
// UPDATE DATA

const testPersonalizedContentTag2 = ["Test 2 Tag 1", "Test 2 Tag 2", "Test 2 Tag 3"];
const testPersonalizedContent2: PersonalizedContent = {
  _id: new ObjectId(),
  moduleId: pathwayModule1ObjectId,
  priority: 0,
  tags: testPersonalizedContentTag2,
  name: "Test Name2",
  type: "Test Type2",
  url: "Test Url2",
};

const testPresetContent2: PresetContent = {
  priority: 0,
  name: "Test Name2",
  type: "Test Type2",
  url: "Test Url2",
};
const testPathwayModuleName2 = "Test Name2";
const testPathwayModuleTag2 = ["Test Pathway Module Tag2"];
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

const testPathwayName2 = "Test Name2";
const testPathwayTag2 = ["Test Pathway Tag2"];
const testPathwayModules2 = [testPathwayModule2];
const testPathway2: Pathway = {
  _id: pathway1ObjectId,
  name: testPathwayName2,
  modules: testPathwayModules2,
  tags: testPathwayTag2,
  part: "",
  order: 0
};

const testPathway_Db2: Pathway_Db = {
  _id: new ObjectId(),
  name: testPathwayName2,
  tags: testPathwayTag2,
  modules: [pathwayModule1ObjectId],
  part: "",
  order: 0
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

const testUserPathwayTag2 = ["Test 2 User Tag 1", "Test 2 User Tag 2", "Test 2 User Tag 3"];
const testUserPathway2: UserPathway = {
  pathway: "Test Course 2", // need to update
  userTags: testUserPathwayTag2,
  userCourseProgress: testPathwayProgress2,
};

const testUserCheckIns2 = ["Test 2 CheckIn 1", "Test 2 CheckIn 2", "Test 2 CheckIn 3"];
const testDashboard2: Dashboard = {
  userName: "Test UserName2",
  userTags: testUserPathwayTag2,
  userProgress: [testPathwayProgress2],
  checkIns: testUserCheckIns2,
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

test("update pathway", (done) => {
  const callback = async () => {
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
        putPathwayProgress(testUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [content_progress] })),
    ]);

    await Promise.all([
      ...pathwayModuleDb.map((pathway_module) =>
        putPathwayModule(pathwayModule1ObjectId, pathway_module)),
    ]);

    await Promise.all([
      ...personalizedContent.map((responses) =>
        putPathwayModulePersonalizedContent(pathwayPersonalizedContentObjectId, responses)),
    ]);

    // UPDATE DATA
    const pathway2: Pathway[] = [testPathway2];
    const pathwayProgress2: PathwayProgress[] = [testPathwayProgress2];

    const personalizedContent2: PersonalizedContent[] = [testPersonalizedContent2];
    const pathwayDb2: Pathway_Db[] = [testPathway_Db2];
    const pathwayModuleDb2: PathwayModule_Db[] = [testPathwayModule_Db2];
    const contentProgress2: ContentProgress[] = [testContentProgress2];

    await updateUser(testUserFirebaseId, {
      firebaseId: testUserFirebaseId,
      name: "Test User",
      address: "Test address",
      grade: 11,
      birthday: new Date(),
      email: "Test email",
      tags: testPersonalizedContentTag2,
      checkIns: testUserCheckIns2,
    })

    await Promise.all([
      ...pathwayDb2.map((pathway_put) =>
        putPathway(pathway1ObjectId, pathway_put)),
    ]);

    await Promise.all([
      ...contentProgress2.map((content_progress) =>
        putPathwayProgress(testUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [content_progress] })),
    ]);

    await Promise.all([
      ...pathwayModuleDb2.map((pathway_module) =>
        putPathwayModule(pathwayModule1ObjectId, pathway_module)),
    ]);

    await Promise.all([
      ...personalizedContent2.map((responses) =>
        putPathwayModulePersonalizedContent(pathwayPersonalizedContentObjectId, responses)),
    ]);


    let fetchedAllPathway = await getAllPathways();
    let fetchedAllPathwayProgress = await getAllPathwayProgress(testUserFirebaseId);
    let fetchedPathway = await getPathway(testUserFirebaseId, pathway1ObjectId);
    let fetchedPathwayProgress = await getPathwayProgress(testUserFirebaseId, pathway1ObjectId);

    let allPathwayCount = 0;
    let allPathwayProgressCount = 0;
    let moduleProgressCount = 0;
    let allPathwayId = [];

    expect(fetchedAllPathway.length).toBe(pathwayDb2.length);
    expect(fetchedAllPathwayProgress.length).toBe(testDashboard2.userProgress.length);
    expect(fetchedPathway.modules.length).toBe(testPathway_Db2.modules.length);
    expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses2.length);

    for (let i = 0; i < fetchedAllPathway.length; i++) {
      expect(fetchedAllPathway[i]).toMatchObject(pathway2[i]);
      allPathwayCount++;
      allPathwayId.push(fetchedAllPathway[i]._id);
    }

    for (let i = 0; i < fetchedAllPathwayProgress.length; i++) {
      expect(fetchedAllPathwayProgress[i]).toMatchObject(pathwayProgress2[i]);
      allPathwayProgressCount++;
    }

    for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
      expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(testModuleProgresses2[i]);
      moduleProgressCount++;
    }


    const expectCount = 1;
    expect(allPathwayCount).toBe(expectCount);
    expect(allPathwayProgressCount).toBe(expectCount);
    expect(moduleProgressCount).toBe(expectCount);


    for (let i = 0; i < allPathwayId.length; i++)
      await putPathway(allPathwayId[i], undefined);

    // Verifying pathways are empty       
    const fetchedAllPathwayCheck = await getAllPathways();
    expect(fetchedAllPathwayCheck.length).toBe(0);

    done();
  };
  callback();
});

test("should verify many", (done) => {
  const callback = async () => {
    const manySizes = 10;
    const pathway: Pathway[] = [testPathway];
    const pathwayModule: PathwayModule[] = [testPathwayModule];
    let pathwayProgress = [];
    let pathwayIds = [];
    let moduleIds = [];
    let firebaseIds = []

    for (let j = 0; j < manySizes; j++) {
      const pathwayId = new ObjectId();
      const moduleId = new ObjectId();
      const firebaseId = "Test User Id " + j;
      pathwayIds.push(pathwayId);
      moduleIds.push(moduleId);
      firebaseIds.push(firebaseId);

      // Test put functionality
      const pathwayDb: Pathway_Db[] = [{
        _id: new ObjectId(),
        name: testPathwayName,
        tags: testPathwayTag,
        modules: [moduleId],
        part: "",
        order: 0,
      }];

      pathwayProgress.push({
        pathwayId: pathwayId,
        finished: false,
        name: testPathwayName,
        moduleProgress: testModuleProgresses,
      });

      const personalizedContent: PersonalizedContent[] = [{
        _id: new ObjectId(),
        moduleId: moduleId,
        priority: 0,
        tags: testPersonalizedContentTag,
        name: "Test Name",
        type: "Test Type",
        url: "Test Url",
      }];


      const pathwayModuleDb: PathwayModule_Db[] = [testPathwayModule_Db];
      const contentProgress: ContentProgress[] = [testContentProgress];


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

      await Promise.all([
        ...pathwayDb.map((pathway_put) =>
          putPathway(pathwayId, pathway_put)),
      ]);


      await Promise.all([
        ...contentProgress.map((content_progress) =>
          putPathwayProgress(firebaseId, { [moduleId.toString()]: [content_progress] })),
      ]);

      await Promise.all([
        ...pathwayModuleDb.map((pathway_module) =>
          putPathwayModule(moduleId, pathway_module)),
      ]);

      await Promise.all([
        ...personalizedContent.map((responses) =>
          putPathwayModulePersonalizedContent(undefined, responses)),
      ]);
    }

    for (let j = 0; j < manySizes; j++) {
      // Test get functionality - should be identical to what we put
      const [
        fetchedAllPathway,
        fetchedAllPathwayProgress,
        fetchedPathway,
        fetchedPathwayProgress,
      ] = await Promise.all([
        getAllPathways(),
        getAllPathwayProgress(firebaseIds[j]),
        getPathway(firebaseIds[j], pathwayIds[j]),
        getPathwayProgress(firebaseIds[j], pathwayIds[j]),
      ]);

      expect(fetchedAllPathway.length).toBe(manySizes);
      expect(fetchedAllPathwayProgress.length).toBe(manySizes);
      expect(fetchedPathway.modules.length).toBe(testPathway_Db.modules.length);
      expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses.length);

      for (let i = 0; i < fetchedAllPathway.length; i++) {
        expect(fetchedAllPathway[i]).toMatchObject(pathway[0]);
      }

      // need to discuss regarding the delete method
      //  for (let i = 0; i < fetchedAllPathwayProgress.length; i++) { 
      //     expect(fetchedAllPathwayProgress[i]).toMatchObject(pathwayProgress[i]);
      //}

      for (let i = 0; i < fetchedPathway.tags.length; i++) {
        expect(fetchedPathway.modules[i]).toMatchObject(pathwayModule[0]);
      }

      for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
        expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(testModuleProgresses[0]);
      }
    }
    done();
  };
  callback();
});


// test("should add pathway and get those added pathways exactly", (done) => {
//   const callback = async () => {
//     // Test put functionality
//     const pathway: Pathway[] = [testPathway];
//     const pathwayProgress: PathwayProgress[] = [testPathwayProgress];
//     const pathwayModule: PathwayModule[] = [testPathwayModule];
//     const personalizedContent: PersonalizedContent[] = [testPersonalizedContent];
//     const pathwayDb: Pathway_Db[] = [testPathway_Db];
//     const pathwayModuleDb: PathwayModule_Db[] = [testPathwayModule_Db];
//     const contentProgress: ContentProgress[] = [testContentProgress];
   
//     await Promise.all([
//       ...pathwayDb.map((pathway_put) =>
//         putPathway(pathway1ObjectId, undefined)),
//     ]);

//     await Promise.all([
//       ...contentProgress.map((content_progress) =>
//         putPathwayProgress(testUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [content_progress] })),
//     ]);

//     await Promise.all([
//       ...pathwayModuleDb.map((pathway_module) =>
//         putPathwayModule(pathwayModule1ObjectId, undefined)),
//     ]);
    

//     await Promise.all([
//       ...pathwayDb.map((pathway_put) =>
//         putPathway(pathway1ObjectId, pathway_put)),
//     ]);

//     await Promise.all([
//       ...contentProgress.map((content_progress) =>
//         putPathwayProgress(testUserFirebaseId, { [pathwayModule1ObjectId.toString()]: [content_progress] })),
//     ]);

//     await Promise.all([
//       ...pathwayModuleDb.map((pathway_module) =>
//         putPathwayModule(pathwayModule1ObjectId, pathway_module)),
//     ]);

//     let personalizedContentId = new ObjectId();
//     await Promise.all([
//       ...personalizedContent.map((responses) =>
//         putPathwayModulePersonalizedContent(personalizedContentId, responses)),
//     ]);

//     // Test get functionality - should be identical to what we put
//     const [
//       fetchedAllPathway,
//       fetchedAllPathwayProgress,
//       fetchedPathway,
//       fetchedPathwayProgress,
//     ] = await Promise.all([
//       getAllPathways(),
//       getAllPathwayProgress(testUserFirebaseId),
//       getPathway(testUserFirebaseId, pathway1ObjectId),
//       getPathwayProgress(testUserFirebaseId, pathway1ObjectId),
//     ]);


//     let allPathwayId = [];

//     expect(fetchedAllPathway.length).toBe(pathwayDb.length);
//     expect(fetchedAllPathwayProgress.length).toBe(testDashboard.userProgress.length);
//     expect(fetchedPathway.modules.length).toBe(testPathway_Db.modules.length);
//     expect(fetchedPathwayProgress.moduleProgress.length).toBe(testModuleProgresses.length);

//     for (let i = 0; i < fetchedAllPathway.length; i++) {
//       expect(fetchedAllPathway[i]).toMatchObject(pathway[i]);
//       allPathwayId.push(fetchedAllPathway[i]._id);
//     }

//     for (let i = 0; i < fetchedAllPathwayProgress.length; i++) {
//       expect(fetchedAllPathwayProgress[i]).toMatchObject(pathwayProgress[i]);
//     }
//     for (let i = 0; i < fetchedPathway.tags.length; i++) {
//       expect(fetchedPathway.modules[i]).toMatchObject(pathwayModule[i]);
//     }
//     for (let i = 0; i < fetchedPathwayProgress.moduleProgress.length; i++) {
//       expect(fetchedPathwayProgress.moduleProgress[i]).toMatchObject(testModuleProgresses[i]);
//     }

//     for (let i = 0; i < allPathwayId.length; i++)
//       await putPathway(allPathwayId[i], undefined);

//     // Verifying pathways are empty       
//     const fetchedAllPathwayCheck = await getAllPathways();
//     expect(fetchedAllPathwayCheck.length).toBe(0);

//     // Delete modules and personalized content 
//     await Promise.all([
//       putPathway(pathway1ObjectId, undefined),
//       putPathwayModulePersonalizedContent(personalizedContentId, undefined),
//       putPathwayModule(pathwayModule1ObjectId, undefined)
//     ]);

//     done();
//   };
//   callback();
// });
