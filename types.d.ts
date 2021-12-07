//Account Page Types -->
interface AccountInfo {
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
  tags: string[];
}
interface AccountInfo_Db {
  _id: ObjectId;
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
  tags: string[];
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
  questionData: QuestionHierarchy[];
}
interface QuestionHierarchy {
  name: string;
  lists: QuestionList[];
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
  userProgress: CourseProgress[];
}
interface Pathway {
  pathway: Course;
  userTags: string[];
  userCourseProgress: CourseProgress;
}
interface CourseProgress {
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
interface Course {
  title: string;
  id: string;
  modules: CourseModule[];
  tags: string[];
}
interface CourseModule {
  title: string;
  presetContent: PresetContent[];
  personalizedContent: PersonalizedContent[];
  tags: string[];
}
interface Course_Db {
  id: string;
  tags: string[];
  modules: string[]; // Module document IDs
  title: string;
}
interface CourseModule_Db {
  title: string;
  presetContent: PresetContent[];
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
  priority: number;
  tagConfigs: string[][];
  tags: string[];
  title: string;
  type: string;
  url: string;
  content?: string;
  tags: string[];
  tagConfigs: string[][];
}
