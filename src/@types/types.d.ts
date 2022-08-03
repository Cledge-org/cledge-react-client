import { TimePickerLocale } from "antd/lib/time-picker";

export declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
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

  //Account Page Types -->

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
    tag: string;
    typeTag?: string;
    category?: string;
    description: string;
    upvotes?: number;
    downvotes?: number;
  }
  interface CardArticle {
    _id?: ObjectId;
    description: string;
    source: string;
    name: string;
    tag: string;
    typeTag?: string;
    category?: string;
    upvotes?: number;
    downvotes?: number;
  }
  interface CardResource {
    _id?: ObjectId;
    source: string;
    name: string;
    category?: string;
    tag: string;
    typeTag?: string;
    description: string;
    upvotes?: number;
    downvotes?: number;
  }

  interface ResourceVoters extends WithId<Document> {
    _id?: ObjectId;
    upvotes?: string[]; // list of user ids
    downvotes?: string[]; // lsit of user ids
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
    isCheckin?: boolean;
    part?: string;
    order?: number;
    chunks: QuestionChunk[];
  }
  interface QuestionList_Db extends WithId<Document> {
    _id?: ObjectId;
    name: string;
    isCheckin?: boolean;
    part?: string;
    order?: number;
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

  interface Academics extends WithId<Document> {
    _id?: ObjectId;
    classes: Class[];
    overallClassTier: number;
    classTip: string;
    gpa: number;
    gpaTier: number;
    gpaTip: string;
    satScore: number;
    actScore: number;
    testTip: string;
    overallTier: number;
  }

  interface Class {
    classID: number;
    name: string;
    tier: number;
  }
  //End of Student Metrics

  interface ContainerProps {
    border?: boolean;
    children: React.ReactNode;
  }

  interface ButtonProps {
    color?: string;
    fixedWidth?: boolean;
    name?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }

  interface SvgIconProps {
    src: string;
    width: string;
    height: string;
  }

  interface InputProps {
    name: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange: (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
  }

  interface validateProps {
    name: string;
    message: string;
    email: string;
  }
}
