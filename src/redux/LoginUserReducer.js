import * as ActionTypes from "./ActionTypes";

export const LoginUserReducer = (
  state = { isLoading: true, errorMessage: null, user: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload,
      };

    case ActionTypes.LOAD_USERS:
      return { ...state, isLoading: true, errorMessage: null, user: [] };

    case ActionTypes.LOAD_USERS_FAILED:
      return { ...state, isLoading: false, errorMessage: action.payload };

    default:
      return state;
  }
};
