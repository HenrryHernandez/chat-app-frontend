import { configureStore } from "@reduxjs/toolkit";
import { AppStore } from "../models";

import { authReducer } from "./states";

export const store = configureStore<AppStore>({
  reducer: { auth: authReducer },
});

export default store;
