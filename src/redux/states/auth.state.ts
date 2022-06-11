import { createSlice } from "@reduxjs/toolkit";

import { Auth } from "../../models";

const initialState: Auth = {
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => action.payload,
    logoutAction: (state) => initialState,
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
