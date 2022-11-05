import { ILease } from "./lease";

export interface IFavorite {
  id: number;
  userId: number;
  createdAt: Date;
  lease: ILease;
}
