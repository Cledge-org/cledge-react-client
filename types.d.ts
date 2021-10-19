interface AccountInfo {
  name: string;
  address: string;
  grade: number;
  birthday: Date;
  email: string;
}
interface UserProgress {
  responses: any[];
}
interface QuestionHierarchy {
  questionList: QuestionList[];
}
interface QuestionList {
  chunks: QuestionChunk[];
}
interface QuestionChunk {
  title: string;
  questions: string[];
}
interface CardData {
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
