import { axiosInstance } from "../api/apiInstance";
import { CustomResponse, LoginInformation } from "../models";

export const loginService = (username: string, password: string) => {
  return axiosInstance.post<CustomResponse<LoginInformation>>("/auth/login", {
    username,
    password,
  });
};
