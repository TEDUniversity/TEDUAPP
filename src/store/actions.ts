import * as types from "./types";

export function updateSurveys(newSurveys: types.Survey[]): types.Action {
  return {
    type: types.UPDATE_SURVEYS,
    surveys: newSurveys
  };
}

export function updateMoodleLoggedIn(newMoodle: boolean): types.Action {
  return {
    type: types.UPDATE_MOODLE_LOGGED_IN,
    isMoodleLoggedIn: newMoodle
  };
}
