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

export function updateUser(newUser: types.User): types.Action {
  return {
    type: types.UPDATE_USER,
    user: newUser
  };
}

export function updateRss(rss: any): types.Action {
  return {
    type: types.UPDATE_RSS,
    Rss: rss
  };
}
