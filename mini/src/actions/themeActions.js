import axios from "axios";

export const getAllThemes = () => async (dispatch) => {
  try {
    dispatch({
      type: "THEME_LIST_REQUEST",
    });
    const { data } = await axios.get("/posts/");
    if (data.error) {
      dispatch({
        type: "THEME_LIST_SUCCESS",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "THEME_LIST_SUCCESS",
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: "LIST_REQUEST_FAIL",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const createTheme = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/posts", formData, config);
    if (data.error) {
      dispatch({
        type: "CREATE_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "CREATE_SUCCESS",
      });
    }
  } catch (err) {
    dispatch({
      type: "CREATE_FAIL",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const editTheme = (formData, id) => async (dispatch) => {
  try {
    dispatch({
      type: "EDIT_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.patch(`/posts/${id}`, formData, config);
    if (data.error) {
      dispatch({
        type: "EDIT_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "EDIT_SUCCESS",
      });
    }
  } catch (err) {
    dispatch({
      type: "EDIT_FAIL",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const deleteTheme = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DELETE_REQUEST",
    });
    const { data } = await axios.delete(`/posts/${id}`);
    if (data.error) {
      dispatch({
        type: "DELETE_FAIL",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "DELETE_SUCCESS",
      });
    }
  } catch (err) {
    dispatch({
      type: "DELETE_FAIL",
      payload: "Cannot Send Request Right Now",
    });
  }
};
