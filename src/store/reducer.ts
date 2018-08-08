import * as types from "./types";

const initialState: types.GlobalState = {
  Surveys: [],
  isMoodleLoggedIn: false
};

export default function reducer(
  state: types.GlobalState = initialState,
  action: types.Action
) {
  //   console.log("REDUX:", action.type, action);
  switch (action.type) {
    case types.UPDATE_MOODLE_LOGGED_IN:
      return { ...state, isMoodleLoggedIn: action.isMoodleLoggedIn };
    case types.UPDATE_SURVEYS:
      return { ...state, Surveys: action.surveys };
    default: {
      return state;
    }
  }
}
