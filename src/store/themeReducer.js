import { TOGGLE_THEME } from "./themeAction";

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(newTheme));
      return {
        ...state,
        isDarkMode: newTheme,
      };
    default:
      return state;
  }
};

export default themeReducer;
