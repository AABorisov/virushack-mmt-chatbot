import * as React from 'react';
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
import CheckboxStep from '../../components/chatbot/customSteps/CheckboxStep';
import AskStep from '../../components/chatbot/customSteps/AskStep';

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

const convertResponseToQuestionSteps = (questions: QuestionsResponseData): QuestionSteps => {
  const questionSteps: QuestionSteps = questions.reduce((acc: QuestionSteps, question) => {
    const optionTriggerId = `${question.questionId}_options`;
    const isEnd: boolean = question.questionType === 'last';
    const step1: QuestionStep = {
      id: question.questionId.toString(),
      message: question.text,
    };

    if (!!question.image && question.questionType !== 'image') {
      const messageTrigger = `${question.questionId}_message`;
      const imageStep = {
        id: question.questionId.toString(),
        trigger: messageTrigger,
        metadata: {
          image: question.image,
          type: 'image',
        },
      };
      step1.id = messageTrigger;
      acc.push(imageStep);
    }

    if (isEnd) {
      step1.end = true;
      acc.push(step1);
      return acc;
    }
    if (question.questionType === 'message') {
      step1.trigger = question.trigger;
      acc.push(step1);
      return acc;
    }
    if (question.questionType === 'image') {
      step1.trigger = question.trigger;
      step1.metadata.image = question.image;
      step1.metadata.type = question.questionType;
      acc.push(step1);
      return acc;
    }
    step1.trigger = optionTriggerId;

    acc.push(step1);

    const options = question.options.map(answer => ({
      value: answer.label,
      value2: answer.value,
      label: answer.label,
      trigger: answer.nextQuestionId,
    }));

    const step2: QuestionStep = {
      id: optionTriggerId,
      metadata: {
        type: question.questionType,
        triggers: question.triggers,
      },
    };

    switch (question.questionType) {
      case 'ask':
        acc.push({
          id: optionTriggerId,
          user: true,
          trigger: ({ value }: { value: string }) => {
            if (value.indexOf('плохо') > 1) {
              return 'sad';
            }
            if (value.indexOf('солнце') > 1) {
              return 'happy';
            }
            return 'answer';
          },
        });
        step2.id = 'answer';
        step2.trigger = step1.id;
        break;

      case 'last':
      case 'quiz':
        step2.options = options;
        break;
      default:
    }
    step2.metadata.options = options;
    acc.push(step2);
    return acc;
  }, []);

  return questionSteps;
};

export const fetchQuestions = (): ThunkResult<Promise<void>, FetchQuestionsAction> => async (
  dispatch
): Promise<void> => {
  dispatch(fetchQuestionsPending());
  try {
    const questions = await Api.allQuestions();
    const questionSteps = convertResponseToQuestionSteps(questions);
    dispatch(fetchQuestionsSuccess(questionSteps));
  } catch (error) {
    dispatch(fetchQuestionsError());
  }
};
