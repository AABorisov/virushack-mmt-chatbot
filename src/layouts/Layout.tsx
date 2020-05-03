import * as React from 'react';
import CustomChatbot from '../components/chatbot/CustomChatbot';

import styles = require('./styles.scss');

interface LayoutProps {
  children?: JSX.Element | Array<JSX.Element>;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>VIRUS.HACK | Team: DEV Labs</header>
      <main className={styles.main}>
        {children}
        <CustomChatbot />
      </main>
      <footer className={styles.footer}>DEV Labs 2019-presence</footer>
    </div>
  );
};

export default Layout;
