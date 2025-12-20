import { StorageKey } from "@/core/constants/constants";
import { HttpMethod, httpRequest, StatusCode } from "@/core/lib/utils/http";
import { Storage } from "@/core/lib/utils/storage";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface SignUpResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const useAuth = () => {
  const signUp = async (input: SignUpRequest): Promise<SignUpResponse> => {
    return httpRequest<SignUpResponse>("auth/signup", HttpMethod.POST, input);
  };

  const signIn = async (input: SignInRequest): Promise<SignInResponse> => {
    const response = await httpRequest<SignInResponse>(
      "auth/signin",
      HttpMethod.POST,
      input
    );
    Storage.setItem(StorageKey.ACCESS_TOKEN, response.accessToken);
    Storage.setItem(StorageKey.REFRESH_TOKEN, response.refreshToken);
    return response;
  };

  return { signUp, signIn };
};
