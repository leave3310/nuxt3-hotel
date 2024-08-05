import type { FetchError } from "ofetch";

export interface ApiErrorResponse {
  message: string;
  status: boolean;
}

export interface ApiResponse {
  status: boolean;
}

export type CustomFetchError = FetchError<ApiErrorResponse>;
