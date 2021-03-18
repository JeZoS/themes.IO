export const alertReducer = (
  state = { change: false, current: false },
  action
) => {
  switch (action.type) {
    case "ERROR":
      return {
        success: false,
        message: action.payload,
        change: !state.change,
        current: true,
      };
    case "SUCCESS":
      return {
        success: true,
        message: action.payload,
        change: !state.change,
        current: true,
      };
    default:
      return state;
  }
};
