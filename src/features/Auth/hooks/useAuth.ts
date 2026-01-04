import { HttpMethod, httpRequest, StatusCode } from "@/core/lib/utils/http";

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
  accessToken: string;
  refreshToken: string;
  userId: string;
  name: string;
  email: string;
}

export interface SignInWithGoogleResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
  url: string;
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
    return response;
  };

  const signInWithGoogle = async (): Promise<SignInWithGoogleResponse> => {
    const response = await httpRequest<SignInWithGoogleResponse>(
      "auth/signin-with-google",
      HttpMethod.GET
    );
    return response;
  };

  return { signUp, signIn, signInWithGoogle };
};
