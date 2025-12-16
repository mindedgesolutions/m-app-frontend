import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null as UserProps | null,
  counter: 0,
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
  },
});
export const { updateCounter, setCurrentUser, unsetCurrentUser } =
  commonSlice.actions;
export default commonSlice.reducer;
