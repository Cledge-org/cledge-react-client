import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

export const callPutQuestionResponses = async (
  newUserResponses: UserResponse[]
) => {
  const session = getSession();
  return await fetch(`/api/put-question-responses`, {
    method: "POST",
    body: JSON.stringify({
      responses: newUserResponses,
      userId: (await session).user.uid,
    }),
  });
};
export const callUpdateUser = async (userInfo: AccountInfo) => {
  const session = getSession();
  return await fetch(`/api/update-user`, {
    method: "POST",
    body: JSON.stringify({
      userInfo: userInfo,
      userId: (await session).user.uid,
    }),
  });
};
export const callPutPathwayProgress = async (
  contentProgress: Record<string, ContentProgress[]>
) => {
  const session = getSession();
  return await fetch(`/api/put-pathway-progress`, {
    method: "POST",
    body: JSON.stringify({
      contentProgress,
      userId: (await session).user.uid,
    }),
  });
};
export const callPutPathway = async ({
  pathway,
  pathwayId,
}: {
  pathway?: Pathway;
  pathwayId?: ObjectId | string;
}) => {
  return await fetch("/api/put-pathway", {
    method: "POST",
    body: JSON.stringify({
      pathwayId,
      pathway,
    }),
  });
};
export const callPutQuestion = async ({
  question,
  questionId,
}: {
  question?: Question;
  questionId?: ObjectId | string;
}) => {
  return await fetch("/api/put-question", {
    method: "POST",
    body: JSON.stringify({
      questionId,
      question,
    }),
  });
};
export const callPutResource = async ({
  resourceId,
  resource,
  tag,
}: {
  resourceId?: ObjectId | string;
  resource?: CardArticle | CardVideo | CardResource | undefined;
  tag?: string | undefined;
}) => {
  return await fetch("/api/resources/put-resource", {
    method: "POST",
    body: JSON.stringify({
      resourceId,
      resource,
      tag,
    }),
  });
};
export const callPutChatbotCounselorQuestion = async ({
  chatbotDataId,
  chatbotData,
}: {
  chatbotDataId?: ObjectId | string;
  chatbotData: ChatbotCounselorQuestionData;
}) => {
  return await fetch("/api/put-chatbot-counselor-question", {
    method: "POST",
    body: JSON.stringify({
      chatbotDataId,
      chatbotData,
    }),
  });
};
export const callPutActivities = async (activities: Activities) => {
  const session = getSession();
  return await fetch(`/api/put-activities`, {
    method: "POST",
    body: JSON.stringify({
      userId: activities ? (await session).user.uid : null,
      activities,
    }),
  });
};
export const callPutAcademics = async (academics: Academics) => {
  const session = getSession();
  return await fetch(`/api/put-academics`, {
    method: "POST",
    body: JSON.stringify({
      userId: academics ? (await session).user.uid : null,
      academics,
    }),
  });
};
export const callPutPathwayModule = async ({
  pathwayModule,
  pathwayModuleId,
}: {
  pathwayModule?: PathwayModule_Db;
  pathwayModuleId?: ObjectId | string;
}) => {
  return await fetch("/api/put-pathway-module", {
    method: "POST",
    body: JSON.stringify({
      pathwayModuleId,
      pathwayModule,
    }),
  });
};
export const callPutPathwayModulePersonalizedContent = async ({
  content,
  contentId,
}: {
  content?: PersonalizedContent;
  contentId?: ObjectId | string;
}) => {
  return await fetch("/api/put-pathway-module-personalized-content", {
    method: "POST",
    body: JSON.stringify({
      contentId,
      content,
    }),
  });
};
export const callPutQuestionChunk = async ({
  questionChunk,
  questionChunkId,
}: {
  questionChunk?: QuestionChunk;
  questionChunkId?: ObjectId | string;
}) => {
  return await fetch("/api/put-question-chunk", {
    method: "POST",
    body: JSON.stringify({
      questionChunkId,
      questionChunk,
    }),
  });
};
export const callPutQuestionList = async ({
  questionList,
  questionListId,
}: {
  questionList?: QuestionList_Db;
  questionListId?: ObjectId | string;
}) => {
  return await fetch("/api/put-question-list", {
    method: "POST",
    body: JSON.stringify({
      questionListId,
      questionList,
    }),
  });
};
export const callPutPathwayPart = async ({
  part,
  partId,
}: {
  part?: PathwayPart_Db;
  partId?: ObjectId | string;
}) => {
  return await fetch(`/api/put-pathway-part`, {
    method: "POST",
    body: JSON.stringify({
      part,
      partId,
    }),
  });
};
export const alertSlackError = (error: string) => {
  fetch(
    "https://hooks.slack.com/services/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",
    { method: "POST", body: JSON.stringify({ text: error }) }
  );
};
export const alertSlackNewUser = (numUsers: number) => {
  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      body: JSON.stringify({
        text: "A new user has appeared!\nCurrent number of users: " + numUsers,
      }),
    }
  );
};
export const alertSlackChatbotQuestion = (
  chatbotData: ChatbotCounselorQuestionData
) => {
  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      body: JSON.stringify({
        text: `<@U01QZ80JC00> ${chatbotData.name} just asked the chatbot a question and received an answer they didn't like :/ go to: https://cledge.org/admin/chatbot-counselor-questions to check it out`,
      }),
    }
  );
};
export const getNumUsers = async () => {
  return await (await fetch("/api/get-num-accounts")).text();
};
export const callCreateUser = async (
  email: string,
  password: string,
  initialObj
) => {
  return await fetch(`/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      initialObj,
    }),
  });
};
export const getPathwayProgressToDownload = async (firebaseId: string) => {
  return (await (
    await fetch(`/api/get-all-pathway-progress`, {
      method: "POST",
      body: JSON.stringify({
        userId: firebaseId,
      }),
    })
  ).json()) as PathwayProgress[];
};
export const callGetChatbotResponse = async (
  message: string,
  username: string,
  questionResponses: UserResponse[]
) => {
  return await fetch(
    "https://cledge-chatbot-service.azurewebsites.net/v2/api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        username,
        student_info: questionResponses,
      }),
    }
  )
    .then(async (response) => await response.json())
    .catch((error) => {
      console.error(error);
      return "Sorry, the chatbot seems to be experiencing difficulties right now!";
    });
};
export const callChatbotVote = (
  question: string,
  answer: string,
  vote: boolean,
  username: string,
  messageId: string,
) => {
  fetch(`https://cledge-chatbot-service.azurewebsites.net/v2/vote_api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      answer,
      username,
      vote,
      responseId: messageId,
    }),
  });
};
export const callGetQuestionResponses = async (userId: string) => {
  return await fetch(`/api/get-question-responses`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};
export const callGetAccount = async (userId: string) => {
  return await fetch(`/api/get-account`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};
export const callGetAllPathwayProgress = async (userId: string) => {
  return await fetch(`/api/get-all-pathway-progress`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
};
export const callPutBlog = async (articleId: string, article) => {
  return await fetch(`/api/put-blog`, {
    method: "POST",
    body: JSON.stringify({ articleId, article }),
  });
};
