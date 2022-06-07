import { User } from "./user.model";

export interface CustomResponse<T> {
  success: Boolean;
  msg: String;
  data: T;
}

export interface LoginInformation {
  user: User;
  token: String;
}
