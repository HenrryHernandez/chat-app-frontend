export interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    _id: string;
    groups: string[];
  };
  token: string;
}

export interface AppStore {
  auth: AuthState;
}
