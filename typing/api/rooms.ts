import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseRoom } from "@/typing/base/rooms.ts";

export interface GetRoomsRes extends ApiResponse {
  result: BaseRoom[];
}

export interface GetRoomRes extends ApiResponse {
  result: BaseRoom;
}
