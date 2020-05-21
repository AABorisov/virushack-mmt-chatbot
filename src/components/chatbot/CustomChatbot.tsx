import * as React from 'react';
// @ts-ignore
import ChatBot from 'react-simple-chatbot';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ThemeProvider } from 'styled-components';
import { AppState } from '../../store';
import { AllQuestionSteps, QuestionSteps } from '../../store/questions/types';
import OptionsStep from './customSteps/options/OptionsStep';
import AskStep from './customSteps/AskStep';
import ImageStep from './customSteps/ImageStep';
import { LangEnum, SetLangAction } from '../../store/lang/types';
import HeaderComponent from './HeaderComponent';
import { setLang as setLangAction } from '../../store/lang/actions';

interface CustomChatbotStateProps {
  allQuestionSteps: AllQuestionSteps;
  fetchPending: boolean;
  lang: LangEnum;
}

interface CustomChatbotDispatchProps {
  setLang: (lang: LangEnum) => SetLangAction;
}

type CustomChatbotProps = CustomChatbotStateProps & CustomChatbotDispatchProps;

function CustomChatbot(props: CustomChatbotProps) {
  const [{ opened }, toggleOpened]: [{ opened: boolean }, Function] = React.useState({
    opened: true,
  });

  const isRuLang = LangEnum.ru === props.lang;
  const config = {
    width: '500px',
    height: '700px',
    floating: true,
    opened,
    recognitionEnable: true,
    recognitionLang: isRuLang ? 'ru' : 'en',
    toggleFloating: toggleOpened,
    headerComponent: (
      <HeaderComponent lang={props.lang} toggleChatBot={toggleOpened} toggleLang={props.setLang} />
    ),
    placeholder: isRuLang ? 'Напишите сообщение...' : 'Type the message...',
    recognitionPlaceholder: isRuLang ? 'Слушаем вас...' : 'Listening...',
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

  const questionSteps = isRuLang ? props.allQuestionSteps.ru : props.allQuestionSteps.en;

  const pending = !questionSteps.length || props.fetchPending;
  if (pending) {
    return <></>;
  }
  const steps = questionSteps.map(step => {
    if (!step.metadata || !step.metadata.type) {
      return step;
    }
    const { type } = step.metadata;
    const newStep = { ...step };
    switch (type) {
      case 'checkboxes':
        newStep.component = <OptionsStep lang={props.lang} />;
        break;
      case 'checkboxTree':
        newStep.component = <OptionsStep lang={props.lang} />;
        break;
      case 'ask':
        newStep.component = <AskStep lang={props.lang} />;
        newStep.waitAction = true;
        break;
      case 'image':
        newStep.component = <ImageStep />;
        newStep.asMessage = true;
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
      <ChatBot steps={steps} {...config} key={props.lang} />
    </ThemeProvider>
  );
}

// @ts-ignore
const mapStateToProps = (state: AppState): CustomChatbotStateProps => ({
  allQuestionSteps: state.questions.questionSteps,
  fetchPending: state.questions.pending,
  lang: state.lang,
});

const mapDispatchToProps = (dispatch: Dispatch): CustomChatbotDispatchProps =>
  bindActionCreators({ setLang: setLangAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomChatbot);
