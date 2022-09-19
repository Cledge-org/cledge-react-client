import { TimePickerLocale } from "antd/lib/time-picker";

import { ObjectId } from "mongodb";
import { Key } from "react";

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
    isOnMailingList: boolean;
    birthday: Date;
    email: string;
    tags: string[];
    checkIns: string[];
    introducedToChatbot: boolean;
    chatbotHistoryLength: number;
    hasUWAccess: boolean;
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
    chunks: QuestionChunk[];
  }
  interface QuestionList_Db extends WithId<Document> {
    _id?: ObjectId;
    name: string;
    isCheckin?: boolean;
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
    placeholder?: string;
    data?: any[];
    popUpText?: string;
    isConcatenable?: boolean;
    isRequired?: boolean;
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
    moduleId: string;
    finished: boolean;
    name: string;
    contentProgress: ContentProgress[]; // Map between content ID and whether that content is finished
  }
  interface ContentProgress {
    finished: boolean;
    name: string;
    subContentProgress: (
      | PathwayQuestionProgress
      | PathwayVideoProgress
      | PathwayTextProgress
    )[];
  }
  interface SubContentProgress {
    id: string;
    finished: boolean;
  }
  interface PathwayQuestionProgress extends SubContentProgress {
    questionAnswer: any;
  }
  interface PathwayVideoProgress extends SubContentProgress {
    videoTime: number;
  }
  interface PathwayTextProgress extends SubContentProgress {
    textProgress: number;
  }
  interface Pathway {
    _id?: ObjectId;
    name: string;
    coverImage: string | ArrayBuffer;
    modules: PathwayModule[];
    tags: string[];
  }
  interface Pathway_Db extends WithId<Document> {
    _id?: ObjectId;
    tags: string[];
    modules: ObjectId[]; // Module document IDs
    name: string;
    coverImage: string | ArrayBuffer;
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
    primaryType: "text" | "video" | "image" | "question";
    content?: any[];
  }
  interface PathwaySubContent {
    type: "text" | "video" | "image" | "question";
    id: string;
  }
  interface PathwayTextContent extends PathwaySubContent {
    text: string;
  }
  interface PathwayVideo extends PathwaySubContent {
    url: string;
    title: string;
    description: string;
    videoSource: string;
  }
  interface PathwayQuestion extends PathwaySubContent {
    question: string;
    questionType: string;
    data?: any[];
    placeholder: string;
  }
  interface PathwayImage extends PathwaySubContent {
    image: string;
  }
  interface PersonalizedContent extends PresetContent, WithId<Document> {
    _id?: ObjectId;
    moduleId: ObjectId;
    tags: string[];
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
    actTitle: string;
    actType: string;
    hoursYear: number;
    yearsSpent: number;
    recogLevel: number;
    description: string;
    points: number;
    tier: number;
    category: number;
    tip: string | JSX.Element;
  }

  interface Academics extends WithId<Document> {
    _id?: ObjectId;
    classes: Class[];
    overallClassTier: number;
    classTip: string | JSX.Element;
    gpa: number;
    gpaTier: number;
    gpaTip: string | JSX.Element;
    satScore: number;
    actScore: number;
    testTip: string | JSX.Element;
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
    className?: string;
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
  interface PathwayPart_Db {
    _id?: ObjectId;
    order: number;
    name: string;
    dynamicRoutes: DynamicPartRouteID[];
  }
  interface PathwayPart {
    _id?: ObjectId;
    order: number;
    name: string;
    dynamicRoutes: DynamicPartRoute[];
  }
  interface DynamicPartRoute {
    type: string;
    route: any;
  }
  interface DynamicPartRouteID {
    type: string;
    routeId: ObjectId;
  }
  interface ChatbotCounselorQuestionData extends WithId<Document> {
    _id?: ObjectId;
    email: string;
    name: string;
    resolved: boolean;
    question: string;
    answer: string;
    problem: string;
  }
}

interface collegeListIndivudialInfo {
  college_id: string;
  fit_type: -1 | 0 | 1 | 2 | 3;
  img_url: string;
  img_title?: string;
  college_name: string;
  location: string;
  in_state_tuition: number;
  out_state_tuition: number;
  college_type: "Public" | "Private";
}

interface collegeInfo {
  _id: ObjectId | string;
  college_id: string;
  img_url: string;
  img_title: string;
  college_name: string;
  target_tier: number;
  safety_tier: number;
  location: string;
  in_state_tuition: number;
  out_state_tuition: number;
  college_type: "Public" | "Private";
}

interface collegeListElementRaw {
  college_id: string;
  fit_type: -1 | 0 | 1 | 2 | 3;
  index: number;
}

interface updateCollegeList {
  user_id: string;
  college_list: collegeListElementRaw[];
}

interface ChatbotHistory {
  _id: ObjectId | string;
  index: number;
  firebaseId: string;
  messages: (MessageProps | CoupledOptions)[];
}

interface MessageProps {
  message: string | ReactElement;
  messageId?: string;
  isOnLeft: boolean;
  isAnswer?: boolean;
  question?: string;
  onDownVote?: (message: string, answer: string) => void;
}

interface CoupledOptions {
  areOptions: boolean;
  pickedIndex: number;
  options: { [option: string]: string };
}
