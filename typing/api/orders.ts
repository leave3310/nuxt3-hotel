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

export interface Order {
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
  roomId: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageUrlList: string[];
    areaInfo: string;
    bedInfo: string;
    maxPeople: number;
    price: number;
    status: number;
    facilityInfo: Array<{
      title: string;
      isProvide: boolean;
    }>;
    amenityInfo: Array<{
      title: string;
      isProvide: boolean;
    }>;
    createdAt: string;
    updatedAt: string;
  };
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrders extends ApiResponse {
  result: Order[];
}
