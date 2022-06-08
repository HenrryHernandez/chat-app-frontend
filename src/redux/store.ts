import { configureStore } from "@reduxjs/toolkit";
import { AppStore } from "../models";

import { authReducer, userReducer } from "./states";

export const store = configureStore<AppStore>({
  reducer: { auth: authReducer, user: userReducer },
});

export default store;
