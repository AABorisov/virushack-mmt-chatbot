import { combineReducers } from 'redux';
import questionsReducer from './questions/reducer';

export default combineReducers({
  questions: questionsReducer,
});
