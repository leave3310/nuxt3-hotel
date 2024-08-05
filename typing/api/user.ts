import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseUserInfo } from "@/typing/base/user.ts";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostLoginRes extends ApiResponse {
  token: string;
  result: BaseUserInfo;
}
