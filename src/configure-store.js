import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

//const INITIALSTATE = {isAuth:false};
export const store = createStore(
  rootReducer,
  //INITIALSTATE,
  composeWithDevTools(applyMiddleware(thunk))
);

