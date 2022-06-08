import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "../../models";

const initialState: UserState = {
  chats: [],
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAction: (state, action) => action.payload,
    removeUserAction: (state) => initialState,
  },
});

export const { setUserAction, removeUserAction } = userSlice.actions;

export default userSlice.reducer;
