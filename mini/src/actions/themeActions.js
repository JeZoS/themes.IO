import axios from "axios";

export const getAllThemes = () => async (dispatch) => {
  try {
    dispatch({
      type: "THEME_LIST_REQUEST",
    });
    const { data } = await axios.get("/posts/");
    if (data.error) {
      dispatch({
        type: "THEME_LIST_FAIL",
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
    dispatch({
      type: "ERROR",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const createTheme = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CREATE_REQUEST",
    });

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post("/posts", formData, config);
    if (data.error) {
      dispatch({
        type: "CREATE_FAIL",
        payload: data.error,
      });
      dispatch({
        type: "ERROR",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "CREATE_SUCCESS",
      });
      dispatch({
        type: "SUCCESS",
        payload: "Theme Uploaded",
      });
    }
  } catch (err) {
    dispatch({
      type: "CREATE_FAIL",
      payload: "Cannot Send Request Right Now",
    });
    dispatch({
      type: "ERROR",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const editTheme = (formData, id) => async (dispatch,getState) => {
  try {
    dispatch({
      type: "EDIT_REQUEST",
    });
    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.patch(`/posts/${id}`, formData, config);
    if (data.error) {
      dispatch({
        type: "EDIT_FAIL",
        payload: data.error,
      });
      dispatch({
        type: "ERROR",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "EDIT_SUCCESS",
      });
      dispatch({
        type: "SUCCESS",
        payload: "Theme data Update",
      });
    }
  } catch (err) {
    dispatch({
      type: "EDIT_FAIL",
      payload: "Cannot Send Request Right Now",
    });
    dispatch({
      type: "ERROR",
      payload: "Cannot Send Request Right Now",
    });
  }
};

export const deleteTheme = (id) => async (dispatch,getState) => {
  try {
    dispatch({
      type: "DELETE_REQUEST",
    });
    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`/posts/${id}`,config);
    if (data.error) {
      dispatch({
        type: "DELETE_FAIL",
        payload: data.error,
      });
      dispatch({
        type: "ERROR",
        payload: data.error,
      });
    } else {
      dispatch({
        type: "DELETE_SUCCESS",
      });
      dispatch({
        type: "SUCCESS",
        payload: "Deleted",
      });
    }
  } catch (err) {
    dispatch({
      type: "DELETE_FAIL",
      payload: "Cannot Send Request Right Now",
    });
    dispatch({
      type: "ERROR",
      payload: "Cannot Send Request Right Now",
    });
  }
};
