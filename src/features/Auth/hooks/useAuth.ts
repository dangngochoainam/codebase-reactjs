import { STATUS_CODES } from "@/core/constants/statusCode";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface SignUpResponse {
  trace_id: string;
  status_code: string;
  reason_code?: string;
  reason_message?: string;
  time_ms?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  trace_id: string;
  status_code: string;
  reason_code?: string;
  reason_message?: string;
  time_ms?: string;
}

export const useAuth = () => {
  const signUp = async (input: SignUpRequest): Promise<SignUpResponse> => {
    const response = await fetch("http://localhost:50051/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Signup failed" }));
      throw new Error(error.message || "Signup failed");
    }

    const data = await response.json();
    if (data.statusCode === STATUS_CODES.ACCEPT) {
      return data;
    }
    throw new Error(data.reasonMessage || "Signup failed");
  };

  const signIn = async (input: SignInRequest): Promise<SignInResponse> => {
    const response = await fetch("http://localhost:50051/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Signin failed" }));
      throw new Error(error.message || "Signin failed");
    }

    const data = await response.json();
    if (data.statusCode === STATUS_CODES.ACCEPT) {
      return data;
    }
    throw new Error(data.reasonMessage || "Signin failed");
  };

  return { signUp, signIn };
};
