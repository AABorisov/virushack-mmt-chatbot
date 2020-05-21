import * as React from 'react';
import { LangEnum } from '../../store/lang/types';
import HeaderTitle from './chatbotComponents/HeaderTitle';
import Header from './chatbotComponents/Header';
import CloseIcon from './chatbotComponents/CloseIcon';
import HeaderIcon from './chatbotComponents/HeaderIcon';

interface HeaderComponentProps {
  lang: LangEnum;
  toggleChatBot: Function;
  toggleLang: Function;
}

const HeaderComponent: React.FC<HeaderComponentProps> = props => {
  const isRuLang = props.lang === LangEnum.ru;
  return (
    <Header className="rsc-header">
      <HeaderTitle className="rsc-header-title">CovidBot</HeaderTitle>
      <div>
        <HeaderIcon
          className="rsc-header-close-button"
          onClick={() => props.toggleLang(isRuLang ? LangEnum.en : LangEnum.ru)}
          style={{
            fontSize: '16px',
            marginRight: '10px',
            fontWeight: 'bold',
            verticalAlign: 'super',
          }}
        >
          {isRuLang ? 'EN' : 'RU'}
        </HeaderIcon>
        <HeaderIcon
          className="rsc-header-close-button"
          onClick={() => props.toggleChatBot({ opened: false })}
        >
          <CloseIcon />
        </HeaderIcon>
      </div>
    </Header>
  );
};

export default HeaderComponent;
