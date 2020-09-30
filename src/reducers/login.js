
const login = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'LOGIN':
            return { ...state, isAuth: true }
        // Object.assign({}, state, {
        //     isAuth: true
        // })
        case "LOGOUT":
            return { ...state, isAuth: false }
            // Object.assign({}, state, {
            //     isAuth: false
            // })
        default:
            return {...state}
    }
}
// switch (type) {
//   case 'ADD_TODO':
//     return [
//       ...state,
//       {
//         id: action.id,
//         text: action.text,
//         completed: false
//       }
//     ]
//   case 'TOGGLE_TODO':
//     return state.map(todo =>
//       todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
//     )
//   default:
//     return state
// }


export default login