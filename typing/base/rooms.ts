export interface BaseFacilityInfo {
  title: string;
  isProvide: boolean;
}

export interface BaseAmenityInfo {
  title: string;
  isProvide: boolean;
}

export interface BaseRoom {
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
  facilityInfo: BaseFacilityInfo[];
  amenityInfo: BaseAmenityInfo[];
  createdAt: string;
  updatedAt: string;
}
