import { ILeaseImage } from ".";

export interface ILease {
  id: number;
  type: LeaseTypeEnum;
  postCode: string;
  city: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  surface: number;
  room: number;
  startDate: Date;
  endDate: Date;
  isDateFlexible: number;
  pricePerMonth: number;
  createdAt: Date;
  updatedAt: Date;
  leaseImages: ILeaseImage[];
}
