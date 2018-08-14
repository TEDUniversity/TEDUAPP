export const UPDATE_SURVEYS = "UPDATE_SURVEYS";
export const UPDATE_MOODLE_LOGGED_IN = "UPDATE_MOODLE_LOGGED_IN";

export interface GlobalState {
  Surveys: Survey[] | undefined;
  isMoodleLoggedIn: boolean | undefined;
  
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

export interface Action {
  type: string;
  surveys?: Survey[];
  isMoodleLoggedIn?: boolean;
}
