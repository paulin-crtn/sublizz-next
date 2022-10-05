import { ILease } from "./";

export interface ILeaseDetail extends ILease {
  street: string;
  houseNumber?: string;
  description?: string;
  isPublished: number;
  user: { id: number; firstName: string; lastName: string };
}
