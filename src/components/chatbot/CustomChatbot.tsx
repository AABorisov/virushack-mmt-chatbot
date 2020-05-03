import * as React from 'react';
// @ts-ignore
import ChatBot from 'react-simple-chatbot';

function CustomChatbot() {
  const config = {
    width: '300px',
    height: '400px',
    floating: true,
  };
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to our shop',
      trigger: 'Done',
    },
    {
      id: 'Done',
      message: 'Have a great day !!',
      end: true,
    },
  ];
  return <ChatBot steps={steps} {...config} />;
}
export default CustomChatbot;
