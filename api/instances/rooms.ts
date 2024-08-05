import { useFetchInstance } from "@/api/index.ts";
import type { GetRoomsRes } from "@/typing/api/rooms.ts";

export const getRooms = () => useFetchInstance<GetRoomsRes>("v1/rooms");

// export function getRooms() {
//   return fetchInstance("v1/rooms");
// }
