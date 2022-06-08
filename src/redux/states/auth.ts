import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "../../models";

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state) => initialState,
  },
});

export const { login: loginAction, logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
