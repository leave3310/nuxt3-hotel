import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseNews } from "@/typing/base/news.ts";

export interface GetNews extends ApiResponse {
  result: BaseNews[];
}
