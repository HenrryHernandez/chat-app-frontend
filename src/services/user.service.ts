import { axiosInstance } from "../api/apiInstance";
import { CustomResponse, LoginInformation } from "../models";

export const getUser = (userId: string) => {
  return axiosInstance.get<CustomResponse<LoginInformation>>(
    `/users/${userId}`
  );
};
