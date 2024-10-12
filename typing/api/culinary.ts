import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseCulinary } from "@/typing/base/culinary.ts";

export interface GetCulinaries extends ApiResponse {
  result: BaseCulinary[];
}
