const getUserInfo = (state, action) => {
  const { type, user } = action;
  switch (type) {
    case 'GETUSERINFO':
      return { ...state, user };
    // Object.assign({}, state, {
    //     isAuth: true
    // })
    // case "LOGOUT":
    //     return { ...state, isAuth: false }
    // Object.assign({}, state, {
    //     isAuth: false
    // })
    default:
      return { ...state };
  }
};

export default getUserInfo;
