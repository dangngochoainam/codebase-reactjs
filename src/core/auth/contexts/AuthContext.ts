import { createContext, type Dispatch } from "react";
import {
  AuthActionType,
  type AuthAction,
  type AuthContextType,
} from "../types";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
});
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  () => {}
);

export const authReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload || null };
    case AuthActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
