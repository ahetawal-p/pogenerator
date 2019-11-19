import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './User';
import alert from './Alert';
import event from './Event';

export default combineReducers({
  form: formReducer,
  user,
  alert,
  event
});
