export const loginReducer = (state = { loggedIn: false, user: {} }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { loading: true };
    case "LOGIN_SUCCESS":
      return { loggedIn: true, user: action.payload, loading: false };
    case "LOGIN_FAIL":
      return { loggedIn: false, loading: false, error: action.payload };
    default:
      return state;
  }
};
