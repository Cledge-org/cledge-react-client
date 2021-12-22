//Account Page Types -->
interface AccountInfo {
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
  tags: string[];
  checkIns: string[];
}
interface AccountInfo_Db {
  _id: ObjectId;
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
  tags: string[];
  checkIns: string[];
}
//Resource Page Types -->
interface ResourcesInfo {
  videoList: CardVideo[];
  articles: CardArticle[];
  resources: CardResource[];
}
interface CardVideo {
  source: string;
  title: string;
}
interface CardArticle {
  description: string;
  source: string;
  title: string;
}
interface CardResource {
  source: string;
  title: string;
}
//Progress Page Types -->
interface UserProgress {
  responses: UserResponse[];
}
interface UserResponse {
  questionId: string;
  response: any;
}
interface ProgressInfo {
  userProgress: UserProgress;
  questionData: QuestionList[];
}
interface QuestionList {
  name: string;
  chunks: QuestionChunk[];
}
interface QuestionChunk {
  name: string;
  questions: Question[];
}
interface Question {
  id: string;
  question: string;
  type: string;
  helpVid?: string;
  helpText?: string;
  data?: any[];
  isConcatenable?: boolean;
}
//Learning Pathways Types -->
interface Dashboard {
  userName: string;
  userTags: string[];
  userProgress: PathwayProgress[];
}
interface UserPathway {
  pathway: Course;
  userTags: string[];
  userCourseProgress: PathwayProgress;
}

interface PathwayProgress {
  finished: boolean;
  title: string;
  id: string;
  moduleProgress: ModuleProgress[];
}
interface ModuleProgress {
  finished: boolean;
  title: string;
  contentProgress: ContentProgress[];
}
interface ContentProgress {
  finished: boolean;
  title: string;
  videoTime?: string;
}

interface Pathway {
  title: string;
  id: string;
  modules: PathwayModule[];
  tags: string[];
}
interface PathwayModule {
  title: string;
  presetContent: PresetContent[];
  personalizedContent: PersonalizedContent[];
  tags: string[];
}
interface Pathway_Db {
  _id: string;
  tags: string[];
  modules: string[]; // Module document IDs
  title: string;
}
interface PathwayModule_Db {
  title: string;
  presetContent: PresetContent[];
  personalizedContent: string[];
  tags: string[];
}
interface PresetContent {
  priority: number;
  title: string;
  type: string;
  url: string;
  content?: string;
}
interface PersonalizedContent {
  moduleId: string;
  priority: number;
  tags: string[];
  title: string;
  type: string;
  url: string;
  content?: string;
}
