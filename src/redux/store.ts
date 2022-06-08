import { configureStore } from "@reduxjs/toolkit";

import { AppStore } from "../models";

import authReducer from "./states/auth.state";
import userReducer from "./states/user.state";

export const store = configureStore<AppStore>({
  reducer: { auth: authReducer, user: userReducer },
});

export default store;
