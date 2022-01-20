import { actions } from "../config";

export const initialStateAction = (initialState) => {
  return {
    type: actions.SET_INITIAL_STATE,
    ...initialState,
  };
};
