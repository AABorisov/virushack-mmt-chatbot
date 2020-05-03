import { ThunkFetchState } from '../types';
import { QuestionsResponseData } from '../../utils/api/questions/types';

export interface QuestionsState extends QuestionsResponseData, ThunkFetchState {
  questionSteps: QuestionSteps;
}

export type stepId = number | string;

export interface Option {
  value: string;
  label: string;
  trigger: stepId;
}

export interface QuestionStep {
  id: stepId;
  message?: string;
  options?: Array<Option>;
  trigger?: stepId;
  user?: boolean;
  end?: boolean;
  validator?: Function;
}

export type QuestionSteps = Array<QuestionStep>;

export const FETCH_QUESTIONS_PENDING = 'FETCH_QUESTIONS_PENDING';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';

export interface FetchQuestionsPendingAction {
  type: typeof FETCH_QUESTIONS_PENDING;
}

export interface FetchQuestionsSuccessAction {
  type: typeof FETCH_QUESTIONS_SUCCESS;
  payload: QuestionSteps;
}

export interface FetchQuestionsErrorAction {
  type: typeof FETCH_QUESTIONS_ERROR;
}

export type FetchQuestionsAction =
  | FetchQuestionsPendingAction
  | FetchQuestionsSuccessAction
  | FetchQuestionsErrorAction;

export type QuestionsAction = FetchQuestionsAction; // | OtherQuestionsAction
