export const UPDATE_SURVEYS = "UPDATE_SURVEYS";
export const UPDATE_MOODLE_LOGGED_IN = "UPDATE_MOODLE_LOGGED_IN";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_RSS = "UPDATE_RSS";

export interface GlobalState {
  Surveys: Survey[] | undefined;
  isMoodleLoggedIn: boolean | undefined;
<<<<<<< HEAD
  
=======
  User: User;
  Rss: any;
>>>>>>> moodle-implementation
}

export interface Question {
  question: string;
  answers: Answer[];
  currentPressedAnswers: number;
}

export interface Answer {
  text: string;
  count: number;
}

export interface Survey {
  name: string;
  questions: Question[];
}

export interface User {
  userid: string;
  token: string;
  userName: string;
  firstName: string;
  lastName: string;
  userpictureurl: string;
}

export interface Action {
  type: string;
  surveys?: Survey[];
  isMoodleLoggedIn?: boolean;
  user?: User;
  Rss?: any;
}
