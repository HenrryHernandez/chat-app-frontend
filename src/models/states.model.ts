export interface AuthState {
  isAuthenticated: boolean;
  token: string;
}

export interface UserState {
  username: string;
  chats: string[];
}

export interface AppStore {
  auth: AuthState;
  user: UserState;
}
