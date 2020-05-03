export interface QuestionsResponseData {
  questions: Array<Question>;
}

export interface Question {
  answers: Array<Answer>;
  questionId: number;
  questionType: string;
  text: string;
  title: string;
}

export interface Answer {
  answer: string;
  nextQuestionId: number;
}
