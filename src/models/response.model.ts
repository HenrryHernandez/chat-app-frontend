import { User } from "./user.model";

export interface CustomResponse<T> {
  success: boolean;
  msg: string;
  data: T;
}

export interface LoginInformation {
  user: User;
  token: string;
}
