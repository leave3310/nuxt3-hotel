export interface BaseAddress {
  zipcode: number;
  detail: string;
}

export interface BaseUserInfo {
  address: BaseAddress;
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type BaseToken = string;
