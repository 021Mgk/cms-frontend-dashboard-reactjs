import { combineReducers } from 'redux';
import login from './login';
import getUserInfo from './getUserInfo';

export default combineReducers({
  login,
  getUserInfo,
});
