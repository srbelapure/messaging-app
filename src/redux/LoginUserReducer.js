import * as ActionTypes from "./ActionTypes";

export const LoginUserReducer = (
  state = { isLoading: true, errorMessage: null, user: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload,
      };

    // case ActionTypes.LOADING_MESSAGES:
    //   return { ...state, isLoading: true, errorMessage: null, messages: [] };

    // case ActionTypes.LOAD_MESSAGES_FAILED:
    //   return { ...state, isLoading: false, errorMessage: action.payload };

    default:
      return state;
  }
};
