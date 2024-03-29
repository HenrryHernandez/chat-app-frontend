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
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    removeChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
    },
  },
});

export const { setUserAction, removeUserAction, addChat, removeChat } =
  userSlice.actions;

export default userSlice.reducer;
