import { useFetchInstance } from "@/api/index.ts";
import type { GetNews } from "@/typing/api/news.ts";

export const getNews = () => useFetchInstance<GetNews>(`v1/home/news/`);
