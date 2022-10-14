import { IAuthor } from "../IAuthor";
import { ILease } from ".";

export interface ILeaseDetail extends ILease {
  street: string;
  houseNumber?: string;
  description?: string;
  isPublished: number;
  user: IAuthor;
}
