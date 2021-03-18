export const showSuccessAlert = (message) => async (dispatch) => {
  dispatch({
    type: "SUCCESS",
    payload: message,
  });
};

export const showErrorAlert = (message) => async (dispatch) => {
  dispatch({
    type: "ERROR",
    payload: message,
  });
};
