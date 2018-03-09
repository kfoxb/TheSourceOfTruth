const user = (state, action) => {
  console.log('payload', action.payload);
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      return { isAuthenticated: false };
  }
};

export default user;
