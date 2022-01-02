//Account Page Types -->
interface AccountInfo extends WithId<Document> {
  _id?: ObjectId;
  firebaseId: string;
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
interface QuestionList extends WithId<Document> {
  _id: ObjectId;
  name: string;
  chunks: QuestionChunk[];
}
interface QuestionList_Db extends WithId<Document> {
  _id: ObjectId;
  name: string;
  chunks: string[]; // Document IDs of chunks
}
interface QuestionChunk extends WithId<Document> {
  _id: ObjectId;
  name: string;
  questions: Question[];
}
interface QuestionChunk_Db extends WithId<Document> {
  _id: ObjectId;
  name: string;
  questions: string[]; // Document IDs of question data
}
interface Question extends WithId<Document> {
  _id?: ObjectId;
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
  checkIns: string[];
}
interface UserPathway {
  pathway: Course;
  userTags: string[];
  userCourseProgress: PathwayProgress;
}

interface PathwayProgress {
  id: string; // ID of the pathway this progress belongs to, NOT database ID of the progress itself
  finished: boolean;
  title: string;
  moduleProgress: ModuleProgress[];
}
interface ModuleProgress {
  finished: boolean;
  title: string;
  contentProgress: ContentProgress[]; // Map between content ID and whether that content is finished
}
interface ContentProgress {
  finished: boolean;
  title: string;
  videoTime?: string;
}

interface Pathway {
  _id: ObjectId;
  title: string;
  modules: PathwayModule[];
  tags: string[];
}
interface PathwayModule {
  _id: ObjectId;
  title: string;
  presetContent: PresetContent[];
  personalizedContent: PersonalizedContent[];
  tags: string[];
}
interface Pathway_Db extends WithId<Document> {
  _id: ObjectId;
  tags: string[];
  modules: string[]; // Module document IDs
  title: string;
}
interface PathwayModule_Db extends WithId<Document> {
  _id: ObjectId;
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
interface PersonalizedContent extends WithId<Document> {
  _id: ObjectId;
  moduleId: string;
  priority: number;
  tags: string[];
  title: string;
  type: string;
  url: string;
  content?: string;
}
