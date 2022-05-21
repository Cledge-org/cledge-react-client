import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import {
  AccountInfo,
  Activities,
  Pathway,
  Question,
  UserResponse,
} from "src/types/types";

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
export const callPutPathwayProgress = async (contentProgress) => {
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
  pathwayId?: ObjectId;
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
  questionId?: ObjectId;
}) => {
  return await fetch("/api/put-question", {
    method: "POST",
    body: JSON.stringify({
      questionId,
      question,
    }),
  });
};
//TODO: Update callPutResource to new apis
export const callPutResource = () => {};
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
export const alertSlackError = (error: string) => {
  fetch(
    "https://hooks.slack.com/services/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",
    { method: "POST", body: JSON.stringify({ text: error }) }
  );
};
