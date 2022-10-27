export interface ILeaseForm {
  type?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isDateFlexible?: number | string; // Input radio doesn't work with 0 and false values
  street?: string;
  postCode?: string;
  city?: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  room?: number;
  surface?: number;
  pricePerMonth?: number;
  description?: string;
  isPublished?: number | string; // Input radio doesn't work with 0 and false values
  leaseImageNames?: string[];
}
