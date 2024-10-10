import { useFetchInstance } from "@/api/index.ts";
import type { GetOrder } from "@/typing/api/orders.ts";

export const getOrder = (id: string) => useFetchInstance<GetOrder>(`v1/orders/${id}`);
