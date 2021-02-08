import * as ActionTypes from "./ActionTypes";

export const MessagesReducer = (
  state = { isLoading: true, errorMessage: null, messages: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        messages: action.payload,
      };

    case ActionTypes.LOADING_MESSAGES:
      return { ...state, isLoading: true, errorMessage: null, messages: [] };

    case ActionTypes.LOAD_MESSAGES_FAILED:
      return { ...state, isLoading: false, errorMessage: action.payload };

    default:
      return state;
  }
};
