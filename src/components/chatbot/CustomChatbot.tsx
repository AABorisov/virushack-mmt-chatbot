import * as React from 'react';
import { ThemeProvider } from 'styled-components';
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
    width: '400px',
    height: '500px',
    // style: {
    //   height: '700px',
    //   minHeight: '300px',
    //   maxHeight: '70vh',
    // },
    floating: true,
    opened: true,
  };

  const theme = {
    background: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    headerBgColor: '#00aabe',
    headerFontColor: '#fff',
    headerFontSize: '25px',
    botBubbleColor: '#60C1CE',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4c4c4c',
  };

  const pending = !props.questionSteps.length || props.fetchPending;
  if (pending) {
    return <></>;
  }
  const steps = props.questionSteps;

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
}

// @ts-ignore
const mapStateToProps = (state: AppState): CustomChatbotStateProps => ({
  questionSteps: state.questions.questionSteps,
  fetchPending: state.questions.pending,
});

export default connect(mapStateToProps)(CustomChatbot);
