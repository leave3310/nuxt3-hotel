export interface BaseAddress {
  zipcode: number;
  detail: string;
  county: string;
  city: string;
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
