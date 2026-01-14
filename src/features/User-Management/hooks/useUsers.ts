import { useToken } from "@/core/auth/hooks/useToken";
import {
  HttpMethod,
  httpRequest,
  type BaseHttpResponse,
} from "@/core/lib/utils/http";
import type { UserModel } from "../types/user.types";
import { useCallback, useMemo } from "react";

interface GetUsersRequest {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}

interface GetUsersResponse extends BaseHttpResponse {
  users: UserModel[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

interface GetUserResponse extends BaseHttpResponse {
  user: UserModel;
}

interface UpdateUserRequest {
  name?: string;
  isActive: boolean;
  birthday?: string;
  timezone?: string;
  language?: string;
}

export const useUsers = () => {
  const token = useToken();
  const headers: HeadersInit = useMemo(() => {
    const h: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: "",
    };
    if (token) {
      h.Authorization = `Bearer ${token}`;
    }
    return h;
  }, [token]);

  const getUsers = useCallback(
    async (input: GetUsersRequest): Promise<GetUsersResponse> => {
      const response = await httpRequest<GetUsersResponse>(
        `users?page=${input.page}&limit=${input.limit}&search=${input.search}&sort=${input.sort}&order=${input.order}`,
        HttpMethod.GET,
        undefined,
        { headers }
      );
      return response;
    },
    [headers]
  );

  const getUserById = useCallback(
    async (id: string): Promise<GetUserResponse> => {
      const response = await httpRequest<GetUserResponse>(
        `users/${id}`,
        HttpMethod.GET,
        undefined,
        { headers }
      );
      return response;
    },
    [headers]
  );

  const updateUser = useCallback(
    async (id: string, input: UpdateUserRequest): Promise<GetUserResponse> => {
      const response = await httpRequest<GetUserResponse>(
        `users/${id}`,
        HttpMethod.PUT,
        input,
        { headers }
      );
      return response;
    },
    [headers]
  );

  const deleteUser = useCallback(
    async (id: string): Promise<BaseHttpResponse> => {
      const response = await httpRequest<BaseHttpResponse>(
        `users/${id}`,
        HttpMethod.DELETE,
        undefined,
        { headers }
      );
      return response;
    },
    [headers]
  );

  return { getUsers, getUserById, updateUser, deleteUser };
};
