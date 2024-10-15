import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseToken, BaseUserInfo } from "@/typing/base/user.ts";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostLoginRes extends ApiResponse {
  token: string;
  result: BaseUserInfo;
}

export interface CheckUserIsLoginRes extends ApiResponse {
  token: BaseToken;
}
