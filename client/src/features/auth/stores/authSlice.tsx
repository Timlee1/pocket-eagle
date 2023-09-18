import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    logIn: (state, action) => {
      const result = action.payload;
      state.token = result;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectUserToken = (state) => state.auth.token; //TYPE for user
