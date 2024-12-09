// themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: false,
    loggedIn: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { toggleTheme, setLoggedIn } = themeSlice.actions;
export default themeSlice.reducer;
