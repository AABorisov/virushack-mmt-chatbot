import styled from 'styled-components';

const NextButton = styled.button`
  background: blue;
  border: 0;
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.botFontColor};
  display: inline-block;
  font-size: 14px;
  padding: 12px;

  &:hover {
    opacity: 0.7;
  }
  &:active,
  &:hover:focus {
    outline: none;
  }
`;

export default NextButton;
