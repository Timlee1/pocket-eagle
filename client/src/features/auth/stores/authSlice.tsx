import { RootState } from "@/stores/store";
import { createSlice } from "@reduxjs/toolkit";

interface authState {
  token: string;
}

const initialState: authState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const result = action.payload;
      state.token = result;
    },
    logOut: (state) => {
      state.token = "";
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectUserToken = (state: RootState) => state.auth.token; //TYPE for user
