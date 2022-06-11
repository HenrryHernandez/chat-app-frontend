import { Auth } from "./auth.model";
import { User } from "./user.model";

export interface AppStore {
  auth: Auth;
  user: User;
}
