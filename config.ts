export const ORIGIN_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://cledge-testing.azurewebsites.net";
export const actions = {
  NEW_QUESTION_RESPONSE: "newQuestionResponse",
  UDPATE_QUESTION_RESPONSE: "updateQuestionResponse",
  UPDATE_PATHWAY_PROGRESS: "updatePathwayProgress",
  UPDATE_ACCOUNT: "updateAccount",
  ADD_QUESTION_LIST: "addQuestionList",
  UPDATE_QUESTION_LIST: "updateQuestionList",
  ADD_RESOURCE: "addResource",
  ADD_PATHWAY: "addPathway",
  UPDATE_PATHWAY: "updatePathway",
  SET_INITIAL_STATE: "setInitialState",
  CLEAR_STATE: "clearState",
  UPDATE_TAGS: "updateTags",
  UPDATE_TAGS_AND_CHECKINS: "updateTagsAndCheckIns",
};
