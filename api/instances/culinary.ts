import { useFetchInstance } from "@/api/index.ts";
import type { GetCulinaries } from "@/typing/api/culinary.ts";

export const getCulinaries = () => useFetchInstance<GetCulinaries>(`v1/home/culinary/`);
