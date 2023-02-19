import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTokenUpdated: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    tokenUpdate: (state, action) => {
      state.isTokenUpdated = action.payload;
    },
  },
});

export const { tokenUpdate } = authSlice.actions;

export default authSlice.reducer;