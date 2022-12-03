import { UserRoleEnum } from "../enum/UserRoleEnum";
import { IUser } from "./IUser";

export interface IUserDetail extends IUser {
  role: UserRoleEnum;
  phoneNumber: string;
  email: string;
  standardMessage: string;
}
