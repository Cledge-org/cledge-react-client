//Account Page Types -->
interface AccountInfo {
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
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
//Dashboard (Logged in Homepage) Types -->
interface DashboardInfo {
  name: string;
  tasks: string[];
}
interface CardTask {
  title: string;
  url: string;
  subtasks: string[];
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
  questionData: QuestionHierarchy;
}
interface QuestionHierarchy {
  questionList: QuestionList[];
}
interface QuestionList {
  title: string;
  chunks: QuestionChunk[];
}
interface QuestionChunk {
  title: string;
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
//Questionnaire Types -->
interface UserData {
  firstName: string;
  lastName: string;
  highSchool: string;
  gradeLevel: string;
  address: string;
  gpa: string;
  testScores: string;
  ecList: any[];
  schoolTranscript: null;
  applicantType: string;
  areaOfStudy: string;
  areasOfInterest: string;
  planToPay: string[];
  tuitionBudget: number;
  inOutOfState: string;
  schoolRegion: string[];
  privatePublic: string;
  schoolSize: string[];
  liberalArtsRegular: string;
  religiousAffiliation: string;
  typeOfCollegeList: string;
  numberOfApplications: string;
}
//Learning Pathways Types -->
interface Pathways {
  userName: string;
  userTags: string[];
  pathways: Course[];
}
interface Course {
  title: string;
  modules: CourseModule[];
  tags: string[];
}
interface CourseModule {
  title: string;
  presetContent: PresetContent[];
  personalizedContent: PersonalizedContent[];
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
}
