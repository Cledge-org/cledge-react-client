interface Window {
  YT: any;
  onYouTubeIframeAPIReady: any;
}
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
  _id?: ObjectId;
  source: string;
  name: string;
  tag?: string;
  category?: string;
  description: string;
}
interface CardArticle {
  _id?: ObjectId;
  description: string;
  source: string;
  name: string;
  tag?: string;
  category?: string;
}
interface CardResource {
  _id?: ObjectId;
  source: string;
  name: string;
  category?: string;
  tag?: string;
  description: string;
}

//Progress Page Types -->
interface UserProgress_Db extends WithId<Document> {
  _id?: ObjectId;
  firebaseId: string;
  responses: UserResponse[];
}
interface UserProgress {
  responses: UserResponse[];
}
interface UserResponse {
  questionId: string;
  response: any;
}
interface ProgressInfo {
  userTags: string[];
  userProgress: UserProgress;
  questionData: QuestionList[];
}
interface QuestionList extends WithId<Document> {
  _id?: ObjectId;
  name: string;
  chunks: QuestionChunk[];
}
interface QuestionList_Db extends WithId<Document> {
  _id?: ObjectId;
  name: string;
  chunks: string[]; // Document IDs of chunks
}
interface QuestionChunk extends WithId<Document> {
  _id?: ObjectId;
  name: string;
  questions: Question[];
}
interface QuestionChunk_Db extends WithId<Document> {
  _id?: ObjectId;
  name: string;
  questions: ObjectId[]; // Document IDs of question data
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
  pathwayId: ObjectId; // ID of the pathway this progress belongs to, NOT database ID of the progress itself
  finished: boolean;
  name: string;
  moduleProgress: ModuleProgress[];
}
interface ModuleProgress {
  moduleId: ObjectId;
  finished: boolean;
  name: string;
  contentProgress: ContentProgress[]; // Map between content ID and whether that content is finished
}
interface ContentProgress {
  finished: boolean;
  name: string;
  videoTime: number;
}
interface Pathway {
  _id?: ObjectId;
  name: string;
  modules: PathwayModule[];
  part: string;
  order: number;
  tags: string[];
}
interface Pathway_Db extends WithId<Document> {
  _id?: ObjectId;
  tags: string[];
  modules: ObjectId[]; // Module document IDs
  part: string;
  order: number;
  name: string;
}
interface PathwayModule {
  _id?: ObjectId;
  name: string;
  presetContent: PresetContent[];
  personalizedContent: PersonalizedContent[];
  tags: string[];
}
interface PathwayModule_Db extends WithId<Document> {
  _id?: ObjectId;
  name: string;
  presetContent: PresetContent[];
  tags: string[];
}
interface PresetContent {
  priority: number;
  name: string;
  type: string;
  url: string;
  content?: string;
}
interface PersonalizedContent extends WithId<Document> {
  _id?: ObjectId;
  moduleId: ObjectId;
  priority: number;
  tags: string[];
  name: string;
  type: string;
  url: string;
  content?: string;
}

// Student Metrics
interface Activities extends WithId<Document> {
  _id?: ObjectId;
  activities: Activity[];
  overallTier: number;
  totalPoints: number;
}

interface Activity {
  activityID: number;
  actType: string;
  hoursYear: number;
  yearsSpent: number;
  recogLevel: number;
  description: string;
  points: number;
  tier: number;
}
