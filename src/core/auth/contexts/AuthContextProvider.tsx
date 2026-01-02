import { useEffect, useReducer, useRef, useState } from "react";
import { AuthContext, AuthDispatchContext, authReducer } from "./AuthContext";
import { AuthActionType } from "../types";
import {
  HttpMethod,
  httpRequest,
  type StatusCode,
} from "@/core/lib/utils/http";

export interface RefreshTokenResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  name: string;
  email: string;
}

const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const response = await httpRequest<RefreshTokenResponse>(
    "auth/refresh-token",
    HttpMethod.POST
  );
  return response;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });
  const [isInitializing, setIsInitializing] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double call in React StrictMode (development)
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        const response = await refreshAccessToken();
        dispatch({
          type: AuthActionType.SIGN_IN,
          payload: {
            userId: response.userId,
            name: response.name,
            email: response.email,
            accessToken: response.accessToken,
          },
        });
      } catch (error) {
        console.log("No valid refresh token found, user not authenticated");
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  if (isInitializing) {
    return (
      <AuthContext value={state}>
        <AuthDispatchContext value={dispatch}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </AuthDispatchContext>
      </AuthContext>
    );
  }

  return (
    <AuthContext value={state}>
      <AuthDispatchContext value={dispatch}>{children}</AuthDispatchContext>
    </AuthContext>
  );
};
