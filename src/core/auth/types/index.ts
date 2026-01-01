export interface User {
  id: string;
  name: string;
  email: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
};

export enum AuthActionType {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export type AuthAction = {
  type: AuthActionType;
  payload?: User;
};
