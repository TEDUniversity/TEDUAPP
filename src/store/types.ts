export const UPDATE_SURVEYS = "UPDATE_SURVEYS";
export const UPDATE_MOODLE_LOGGED_IN = "UPDATE_MOODLE_LOGGED_IN";
export const UPDATE_USER = "UPDATE_USER";

export interface GlobalState {
  Surveys: Survey[] | undefined;
  isMoodleLoggedIn: boolean | undefined;
  User: User;
}

export interface Question {
  question: string;
  answers: string[];
}

export interface Survey {
  name: string;
  questions: Question[];
}

export interface Action {
  type: string;
  surveys?: Survey[];
  isMoodleLoggedIn?: boolean;
  user?: User;
}

export interface User {
  userid: string;
  token: string;
  userName: string;
  firstName: string;
  lastName: string;
  userpictureurl: string;
}
