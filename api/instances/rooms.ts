import { useFetchInstance } from "@/api/index.ts";
import type { GetRoomRes, GetRoomsRes } from "@/typing/api/rooms.ts";

export const getRooms = () => useFetchInstance<GetRoomsRes>("v1/rooms");

export const getRoom = (id: string) => useFetchInstance<GetRoomRes>(`v1/rooms/${id}`);
