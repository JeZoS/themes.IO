export const themesReducer = (state = { allThemes: [] }, action) => {
  switch (action.type) {
    case "THEME_LIST_REQUEST":
      return { loading: true, allThemes: [] };
    case "THEME_LIST_SUCCESS":
      return { loading: false, allThemes: action.payload };
    case "THEME_LIST_FAIL":
      return { loading: true, allThemes: [], error: action.payload };
    default:
      return state;
  }
};

export const delTheme = (state = { loading: true }, action) => {
  switch (action.type) {
    case "DELETE_REQUEST":
      return state;
    case "DELETE_SUCCESS":
      return { loading: !state.loading };
    case "DELETE_FAIL":
      return { loading: !state.loading, error: action.payload };
    default:
      return state;
  }
};

export const createTheme = (state = { loading: true }, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return state;
    case "CREATE_SUCCESS":
      return { loading: !state.loading };
    case "CREATE_FAIL":
      return { loading: !state.loading, error: action.payload };
    default:
      return state;
  }
};

export const editTheme = (state = { loading: true }, action) => {
  switch (action.type) {
    case "EDIT_REQUEST":
      return state;
    case "EDIT_SUCCESS":
      return { loading: !state.loading };
    case "EDIT_FAIL":
      return { loading: !state.loading, error: action.payload };
    default:
      return state;
  }
};
