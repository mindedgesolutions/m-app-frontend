import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null as UserProps | null,
  counter: 0,
  searchText: null as string | null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateCounter: (state) => {
      state.counter += 1;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    unsetCurrentUser: (state) => {
      state.currentUser = null;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    unsetSearchText: (state) => {
      state.searchText = null;
    },
  },
});
export const {
  updateCounter,
  setCurrentUser,
  unsetCurrentUser,
  setSearchText,
  unsetSearchText,
} = commonSlice.actions;
export default commonSlice.reducer;
