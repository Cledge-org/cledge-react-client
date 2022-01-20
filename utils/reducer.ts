import { Action, Reducer } from "redux";
import { actions } from "../config";

export const reducer: Reducer<any, any> = (
  state: any | undefined,
  action: Action<any> | undefined
) => {
  console.log(action);
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
  }
  if (action.type === actions.ADD_PATHWAY) {
  }
  if (action.type === actions.UPDATE_ACCOUNT) {
  }
  if (action.type === actions.UPDATE_QUESTION_LIST) {
  }
  if (action.type === actions.ADD_QUESTION_LIST) {
  }
  if (action.type === actions.UPDATE_PATHWAY_PROGRESS) {
  }
  if (action.type === actions.UPDATE_PATHWAY) {
  }
  if (action.type === actions.ADD_RESOURCE) {
  }
  console.error(action.type);
  return state;
};
