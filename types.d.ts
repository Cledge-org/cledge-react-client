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
interface CardTask {}
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
//Learning Pathway Types -->
interface Course_Db {
  tags: string[];
  modules: string[]; // Module document IDs
  title: string;
}
interface Course {
  tags: string[];
  modules: CourseModule[];
  title;
}
interface CourseModule_Db {
  title: string;
  presetContent: CourseModuleContent[];
}
interface CourseModule {
  title: string;
  presetContent: CourseModuleContent[];
  personalizedContent: CourseModulePersonalizedContent[];
}
interface CourseModuleContent {
  priority: number;
  title: string;
  type: string;
  url: string;
  content?: string;
}
interface CourseModulePersonalizedContent {
  moduleId: string;
  priority: number;
  title: string;
  type: string;
  url: string;
  content?: string;
  tags: string[];
  tagConfigs: string[][];
}
