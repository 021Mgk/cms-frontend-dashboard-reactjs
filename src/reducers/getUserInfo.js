const getUserInfo = (state, action) => {
  const { type, user } = action;
  switch (type) {
    case 'GETUSERINFO':
      return { ...state, user };
    case "CLEARUSERINFO":
      return { ...state, user: {} }
    default:
      return { ...state };
  }
};

export default getUserInfo;
