import { StorageKey } from "@/core/constants/constants";
import { Storage } from "./storage";
import { ENV } from "@/core/configs/env";

export enum StatusCode {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  PROCESSING = "PROCESSING",
  ERROR = "ERROR",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface BaseHttpResponse {
  traceId: string;
  statusCode: StatusCode;
  reasonCode?: string;
  reasonMessage?: string;
  timeMs?: string;
}

export const httpRequest = async <
  R extends BaseHttpResponse = BaseHttpResponse
>(
  url: string,
  method: HttpMethod,
  body?: unknown,
  options?: Omit<RequestInit, "headers"> & { headers?: Record<string, string> }
): Promise<R> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  const accessToken = Storage.getItem(StorageKey.ACCESS_TOKEN);
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${ENV.api.baseUrl}/${url}`, {
    headers,
    method,
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as R;
  if (data.statusCode !== StatusCode.ACCEPT) {
    throw new Error(data.reasonMessage || "Request failed");
  }
  return data;
};
