import { useToken } from "@/core/auth/hooks/useToken";
import { HttpMethod, StatusCode } from "@/core/lib/utils/http";

import { httpRequest } from "@/core/lib/utils/http";

interface SignOutResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
}

export const useAuth = () => {
  const token = useToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: "",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const signOut = async (): Promise<SignOutResponse> => {
    const response = await httpRequest<SignOutResponse>(
      "auth/signout",
      HttpMethod.POST,
      undefined,
      { headers }
    );
    return response;
  };

  return { signOut };
};
