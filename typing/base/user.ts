export interface BaseUserInfo {
  address: {
    zipcode: number;
    detail: string;
    county: string;
    city: string;
  };
  _id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
