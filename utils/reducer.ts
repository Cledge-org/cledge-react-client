import { DefaultRootState } from "react-redux";
import { Action, Reducer } from "redux";
import { actions } from "../config";

export const reducer: Reducer<any, any> = (
  state: DefaultRootState | undefined,
  action: Action<any> | undefined
) => {
  console.log(action);
  if (action.type === actions.CLEAR_STATE) {
    return {};
  }
  if (action.type === actions.SET_INITIAL_STATE) {
    return {
      pathwaysProgress: action.pathwaysProgress,
      questionResponses: action.questionResponses,
      accountInfo: action.accountInfo,
    };
  }
  if (action.type === actions.NEW_QUESTION_RESPONSE) {
  }
  if (action.type === actions.UDPATE_QUESTION_RESPONSE) {
    return {
      ...state,
      questionResponses: action.questionResponses,
    };
  }
  if (action.type === actions.UPDATE_ACCOUNT) {
    return {
      ...state,
      accountInfo: action.accountInfo,
    };
  }
  if (action.type === actions.UPDATE_PATHWAY_PROGRESS) {
    return {
      ...state,
      pathwaysProgress: action.pathwaysProgress,
    };
  }
  if (action.type === actions.UPDATE_TAGS) {
    return {
      ...state,
      accountInfo: {
        ...state.accountInfo,
        tags: action.userTags,
      },
    };
  }
  if (action.type === actions.UPDATE_TAGS_AND_CHECKINS) {
    return {
      ...state,
      accountInfo: {
        ...state.accountInfo,
        tags: action.userTags,
        checkIns: action.checkIns,
      },
    };
  }
  if (action.type === actions.UPDATE_PATHWAY) {
  }
  if (action.type === actions.ADD_RESOURCE) {
  }
  return state;
};
