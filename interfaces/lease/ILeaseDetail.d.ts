import { IUser } from "../IUser";
import { ILease } from ".";

export interface ILeaseDetail extends ILease {
  street: string;
  houseNumber?: string;
  description?: string;
  isPublished: number;
  user: IUser;
}
