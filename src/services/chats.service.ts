import { axiosInstance } from "../api/apiInstance";
import { CustomResponse, Chat } from "../models";

export const getChats = (name: string) => {
  return axiosInstance.get<CustomResponse<Chat[]>>(`/chats/search/${name}`);
};
