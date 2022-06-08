import { axiosInstance } from "../api/apiInstance";
import { CustomResponse, LoginInformation } from "../models/response.model";

export const getUser = (userId: string) => {
  return axiosInstance.get<CustomResponse<LoginInformation>>(
    `/users/${userId}`
  );
};
