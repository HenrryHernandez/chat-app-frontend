import { Chat } from "./chat.model";

export interface User {
  _id: string;
  username: string;
  chats: Chat[];
}
