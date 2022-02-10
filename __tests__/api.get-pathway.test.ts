import { getAllPathwayProgress } from "../pages/api/get-all-pathway-progress";
import { getAllPathways } from "../pages/api/get-all-pathways";
import { getPathwayAndProgress } from "../pages/api/get-pathway-and-progress";
import { getPathwayProgress } from "../pages/api/get-pathway-progress";
import { getPathway } from "../pages/api/get-pathway";
import { putPathwayModulePersonalizedContent } from "../pages/api/put-pathway-module-personalized-content";
import { putPathwayModule } from "../pages/api/put-pathway-module";
import { putPathwayProgress } from "../pages/api/put-pathway-progress";
import { putCourse } from "../pages/api/put-pathway";
import { ObjectId } from "mongodb";


const testPersonalizedContent: PersonalizedContent = {
    _id: new ObjectId(),
    moduleId: new ObjectId(),
    priority: 1,
    tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
    title: "Test Title",
    type: "Test type",
    url: "Test Url",
};

const testPresetContent: PresetContent = {
    priority: 1,
    title: "Test Title",
    type: "Test type",
    url: "Test Url",
};

const testPathwayModule_Db: PathwayModule_Db = {
    _id: new ObjectId(),
    title: "Test Title",
    presetContent: [testPresetContent],
    tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
};

const testPathwayModule: PathwayModule = {
    _id: new ObjectId(),
    title: "Test Title",
    presetContent: [testPresetContent],
    personalizedContent: [testPersonalizedContent],
    tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
};

const testPathway_Db: Pathway_Db = {
    _id: new ObjectId(),
    tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
    modules: [new ObjectId()],
    title: "Test Title",
};

  
const testContentProgress: ContentProgress = {
    finished: true,
    title: "Test Title",
    videoTime: 1,
};

const testModuleProgress: ModuleProgress = {
    moduleId: "Test Module Id",
    finished: true,
    title: "Test Title",
    contentProgress: [testContentProgress],
};

const testPathway: Pathway = {
    _id: new ObjectId(),
    title: "Test Title",
    modules: [testPathwayModule],
    tags: ["Test Tag 1", "Test Tag 2", "Test Tag 3"],
};
  
const testPathwayProgress: PathwayProgress = {
    pathwayId: "Test Pathway Id",
    finished: true,
    title: "Test Title",
    moduleProgress: [testModuleProgress], 
};

const testUserPathway: UserPathway = {
    pathway: "Test Course 1", // need to update
    userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
    userCourseProgress: testPathwayProgress,
}
const testDashboard: Dashboard = {
  userName: "Test UserName",
  userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
  userProgress: [testPathwayProgress],
  checkIns: ["Test CheckIn 1", "Test CheckIn 2", "Test CheckIn 3"],
};



test("should add questions and get those added questions exactly", (done) => {
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
      ...pathwayDb.map((questionList) => putCourse(undefined, questionList)),
      ...pathwayProgress.map((pathway_progress) => putPathwayProgress("Test User Id", {"Test Module Id": contentProgress})),
      ...pathwayModuleDb.map((pathway_module) => putPathwayModule(undefined, pathway_module)),
      ...personalizedContent.map((responses) => putPathwayModulePersonalizedContent(undefined, testPersonalizedContent)),
    ]);

    // Test get functionality - should be identical to what we put
    const fetchedAllPathway = await getAllPathways();
    const fetchedAllPathwayProgress = await getAllPathwayProgress("Test User Id");
    const fetchedPathway = await getPathway("Test User Id", new ObjectId());
    const fetchedPathwayProgress = await getPathwayProgress("Test User Id", new ObjectId());
    const fetchedPathwayAndProgress = await getPathwayAndProgress("Test User Id", "Test Pathway Id");

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
