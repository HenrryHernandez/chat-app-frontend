import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../models";

const initialState: User = {
  chats: [],
  username: "",
  _id: "",
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
