import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
    },
    clearUser(state) {
      state.userDetails = null;
    },
  },
});

export const { setUser, clearUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
