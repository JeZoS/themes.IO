import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/user/login",
      { email, password },
      config
    );
    if (data.error) {
      dispatch({
        type: "ERROR",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      dispatch({
          type:"SUCCESS",
          payload:"Logged In"
      })
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "SERVER ERROR",
    });
  }
};

export const registerUser = (email, username, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/user/register",
      { email, password, username },
      config
    );
    if (data.error) {
      dispatch({
        type: "ERROR",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      dispatch({
          type:"SUCCESS",
          payload:"Registered"
      })
    }
  } catch (error) {
    dispatch({
      type: "ERROR",
      payload: "SERVER ERROR",
    });
  }
};
