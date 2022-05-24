import { actions } from "../../../config";

export const initialStateAction = (initialState) => {
  return {
    type: actions.SET_INITIAL_STATE,
    ...initialState,
  };
};
export const clearState = () => {
  return {
    type: actions.CLEAR_STATE,
  };
};
export const updateQuestionResponsesAction = (questionResponses) => {
  return {
    type: actions.UDPATE_QUESTION_RESPONSE,
    questionResponses,
  };
};
export const updateAccountAction = (accountInfo) => {
  return {
    type: actions.UPDATE_ACCOUNT,
    accountInfo,
  };
};
export const updatePathwayProgressAction = (pathwaysProgress) => {
  return {
    type: actions.UPDATE_PATHWAY_PROGRESS,
    pathwaysProgress,
  };
};
export const updateTagsAction = (userTags) => {
  return {
    type: actions.UPDATE_TAGS,
    userTags,
  };
};
export const updateTagsAndCheckInsAction = (userTags, checkIns) => {
  return {
    type: actions.UPDATE_TAGS_AND_CHECKINS,
    userTags,
    checkIns,
  };
};
