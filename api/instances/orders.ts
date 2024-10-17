import { useRouter } from "nuxt/app";

import { fetchInstance, useFetchInstance } from "@/api/index.ts";
import { RoomRouteEnum } from "@/typing/enum/router";
import type { GetOrder } from "@/typing/api/orders.ts";

export const getOrder = (id: string) => useFetchInstance<GetOrder>(`v1/orders/${id}`);

interface BaseOrder {
  roomId: string | string[];
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: {
    address: {
      zipcode: string;
      detail: string;
    };
    name: string;
    phone: string;
    email: string;
  };
}

interface PostOrderRes {
  result: {
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
      facilityInfo: {
        title: string;
        isProvide: boolean;
      }[];
      amenityInfo: {
        title: string;
        isProvide: boolean;
      }[];
      createdAt: string;
      updatedAt: string;
    };
    checkInDate: string;
    checkOutDate: string;
    peopleNum: number;
    orderUserId: string;
    userInfo: {
      name: string;
      phone: string;
      email: string;
      address: {
        zipcode: number;
        detail: string;
      };
    };
    status: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };

};

export async function postOrders(payload: BaseOrder) {
  const router = useRouter();

  try {
    const res = await fetchInstance<PostOrderRes>("v1/orders/", {
      method: "POST",
      body: payload,
    });

    router.push({ name: RoomRouteEnum.ROOMS_ID_SUCCESS, params: { id: res.result._id } });
  }

  catch (e) {
    console.error(e);
  }
}
