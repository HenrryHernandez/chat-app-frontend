export interface AuthState {
  isAuthenticated: Boolean;
  user: {
    username: String;
    _id: String;
    groups: String[];
  };
  token: String;
}

export interface AppStore {
  auth: AuthState;
}
