//import { ADD_TODO , TOGGLE_TODO} from './ActionType';
import { LOGIN, LOGOUT, GETUSERINFO } from './ActionType';

export const login = {
  type: LOGIN,
};

export const logout = {
  type: LOGOUT,
};

export const getUserInfo = (user) => ({
  type: GETUSERINFO,
  user,
});

export const clearUserInfo = ({
  type: GETUSERINFO,
  user: {}
});

// let nextTodoId = 0
// export const addTodo = text => ({
//   type: ADD_TODO,
//   id: nextTodoId++,
//   text
// })

// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   id
// })

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }
