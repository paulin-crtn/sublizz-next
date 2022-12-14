import { ILeaseImage } from ".";

export interface ILease {
  id: number;
  type: LeaseTypeEnum;
  postCode: string;
  city: string;
  gpsLatitude: number;
  gpsLongitude: number;
  surface: number;
  room: number;
  pricePerMonth: number;
  startDate: Date;
  endDate?: Date;
  isDateFlexible: number;
  createdAt: Date;
  updatedAt: Date;
  leaseImages?: string[];
}
