import * as React from 'react';
// @ts-ignore
import ChatBot from 'react-simple-chatbot';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AppState } from '../../store';
import { QuestionSteps } from '../../store/questions/types';
import CheckboxStep from './customSteps/CheckboxStep';
import OptionsStep from './customSteps/options/OptionsStep';
import AskStep from './customSteps/AskStep';
import SocialStep from './customSteps/SocialStep';

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
    recognitionEnable: true,
    recognitionLang: 'ru',
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
  const steps = props.questionSteps.map(step => {
    if (!step.metadata || !step.metadata.type) {
      return step;
    }
    const { type } = step.metadata;
    const newStep = { ...step };
    switch (type) {
      case 'checkboxes':
        newStep.component = <OptionsStep />;
        break;
      case 'checkboxTree':
        newStep.component = <OptionsStep />;
        break;
      case 'ask':
        newStep.component = <AskStep />;
        newStep.waitAction = true;
        break;
      case 'social':
      case 'last':
      case 'quiz':
      default:
    }
    return newStep;
  });

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
