import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  100% { transform: scale(1); }
`;

const Option = styled.li`
  animation: ${scale} 0.3s ease forwards;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  transform: scale(0);
`;

export default Option;
