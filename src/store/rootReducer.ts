import { combineReducers } from 'redux';
// @ts-ignore
import questionsReducer from './questions/reducer';

export default combineReducers({
  questions: questionsReducer,
});
