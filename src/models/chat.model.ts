import { Message } from "./messages.model";

export interface Chat {
  _id: string;
  name: string;
  isGroup: boolean;
}

export interface ChatWithMessages {
  _id: string;
  messages: Message[];
}
