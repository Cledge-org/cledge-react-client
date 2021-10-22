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
}
