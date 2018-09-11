export const UPDATE_SURVEYS = "UPDATE_SURVEYS";
export const UPDATE_MOODLE_LOGGED_IN = "UPDATE_MOODLE_LOGGED_IN";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_RSS = "UPDATE_RSS";
export const UPDATE_COUNCILNEWS = "UPDATE_COUNCILNEWS";


export interface GlobalState {
  Surveys: Survey[] | undefined;
  isMoodleLoggedIn: boolean | undefined;
  User: User;
  Rss: string[];
  CouncilNews: any[];
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
  id: string;
  name: string;
  questions: Question[];
  valid: Boolean;
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
  Rss?: string[];
  CouncilNews?: any[];
}
