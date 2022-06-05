import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: Boolean;
  user: {
    username: String;
    _id: String;
    groups: String[];
  };
  token: String;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    username: "",
    _id: "",
    groups: [],
  },
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

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
