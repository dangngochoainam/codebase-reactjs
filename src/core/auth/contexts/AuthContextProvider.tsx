import { useReducer } from "react";
import { AuthContext, AuthDispatchContext, authReducer } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });
  return (
    <AuthContext value={state}>
      <AuthDispatchContext value={dispatch}>{children}</AuthDispatchContext>
    </AuthContext>
  );
};
