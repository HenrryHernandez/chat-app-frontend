import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./states";
import { AuthState } from "./states/auth";

export interface AppStore {
  auth: AuthState;
}

export const store = configureStore<AppStore>({
  reducer: { auth: authReducer },
});

export default store;
