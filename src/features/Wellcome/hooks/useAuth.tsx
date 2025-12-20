import { StorageKey } from "@/core/constants/constants";
import { HttpMethod, StatusCode } from "@/core/lib/utils/http";

import { httpRequest } from "@/core/lib/utils/http";
import { Storage } from "@/core/lib/utils/storage";

interface SignOutResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
}

export const useAuth = () => {
  const signOut = async (): Promise<SignOutResponse> => {
    const response = await httpRequest<SignOutResponse>(
      "auth/signout",
      HttpMethod.POST
    );
    Storage.removeItem(StorageKey.ACCESS_TOKEN);
    Storage.removeItem(StorageKey.REFRESH_TOKEN);
    return response;
  };

  return { signOut };
};
