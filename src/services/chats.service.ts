import { axiosInstance } from "../api/apiInstance";
import { CustomResponse, Chat } from "../models";

export const getChats = (name: string) => {
  return axiosInstance.get<CustomResponse<Chat[]>>(`/chats/search/${name}`);
};

export const joinUserToChat = (userId: string, chatId: string) => {
  return axiosInstance.patch<CustomResponse<Chat[]>>(`/chats/join`, {
    userId,
    chatId,
  });
};

export const exitChat = (userId: string, chatId: string) => {
  return axiosInstance.patch<CustomResponse<any>>(`/chats/exit`, {
    userId,
    chatId,
  });
};
