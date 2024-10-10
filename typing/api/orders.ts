import type { ApiResponse } from "@/typing/api/index.ts";
import type { BaseRoom } from "@/typing/base/rooms.ts";

export interface GetOrder extends ApiResponse {
  result: {
    userInfo: {
      address: {
        zipcode: number;
        detail: string;
      };
      name: string;
      phone: string;
      email: string;
    };
    _id: string;
    roomId: BaseRoom;
    checkInDate: string;
    checkOutDate: string;
    peopleNum: number;
    orderUserId: string;
    status: number;
    createdAt: string;
    updatedAt: string;
  };

}
