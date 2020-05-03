import * as React from 'react';
// @ts-ignore
import ChatBot from 'react-simple-chatbot';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { QuestionSteps } from '../../store/questions/types';

interface CustomChatbotStateProps {
  questionSteps: QuestionSteps;
  fetchPending: boolean;
}
function CustomChatbot(props: CustomChatbotStateProps) {
  const config = {
    width: '500px',
    height: '700px',
    floating: true,
  };

  const pending = !props.questionSteps.length || props.fetchPending;
  if (pending) {
    return <></>;
  }
  const steps = props.questionSteps;

  console.log(steps);

  return <ChatBot steps={steps} {...config} />;
}

// @ts-ignore
const mapStateToProps = (state: AppState): CustomChatbotStateProps => ({
  questionSteps: state.questions.questionSteps,
  fetchPending: state.questions.pending,
});

export default connect(mapStateToProps)(CustomChatbot);
