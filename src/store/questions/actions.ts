import {
  FETCH_QUESTIONS_ERROR,
  FETCH_QUESTIONS_PENDING,
  FETCH_QUESTIONS_SUCCESS,
  FetchQuestionsErrorAction,
  FetchQuestionsPendingAction,
  FetchQuestionsSuccessAction,
  FetchQuestionsAction,
  QuestionSteps,
  QuestionStep,
  stepId,
} from './types';
import { getQuestions } from '../../utils/api/questions';
import { ThunkResult } from '../types';
import { QuestionsResponseData } from '../../utils/api/questions/types';
import Api from '../../utils/api/Api';

export const fetchQuestionsPending = (): FetchQuestionsPendingAction => ({
  type: FETCH_QUESTIONS_PENDING,
});

export const fetchQuestionsSuccess = (
  questionSteps: QuestionSteps
): FetchQuestionsSuccessAction => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: questionSteps,
});

export const fetchQuestionsError = (): FetchQuestionsErrorAction => ({
  type: FETCH_QUESTIONS_ERROR,
});

const convertResponseToQuestionSteps = (response: QuestionsResponseData): QuestionSteps => {
  const { questions } = response;

  const questionSteps: QuestionSteps = questions.reduce((acc: QuestionSteps, question) => {
    const optionTriggerId = `${question.questionId}_options`;
    const isEnd: boolean = !question.answers || !question.answers.length;
    const step1: QuestionStep = {
      id: question.questionId.toString(),
      message: question.text,
    };
    if (isEnd) {
      step1.end = true;
      acc.push(step1);
      return acc;
    }
    step1.trigger = optionTriggerId;

    const step2: QuestionStep = {
      id: optionTriggerId,
      options: question.answers.map(answer => ({
        value: answer.answer,
        label: answer.answer,
        trigger: answer.nextQuestionId.toString(),
      })),
    };
    acc.push(step1, step2);
    return acc;
  }, []);

  return questionSteps;
};

export const fetchQuestions = (): ThunkResult<Promise<void>, FetchQuestionsAction> => async (
  dispatch
): Promise<void> => {
  dispatch(fetchQuestionsPending());
  try {
    const questions = await Api.allQuestions(); // await getQuestions();
    console.log(questions);
    const questionSteps = convertResponseToQuestionSteps(questions);
    dispatch(fetchQuestionsSuccess(questionSteps));
  } catch (error) {
    dispatch(fetchQuestionsError());
  }
};
