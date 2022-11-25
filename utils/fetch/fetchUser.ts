/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IUpdateUser } from "../../interfaces/IUserUpdate";
import { IUser } from "../../interfaces/IUser";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getAuthUser = async (): Promise<IUser> => {
  return await customFetch("users/me", "GET");
};

export const updateUser = async (
  userId: number,
  payload: IUpdateUser
): Promise<IUser> => {
  return await customFetch(`users/${userId}`, "PUT", payload);
};

export const deleteUser = async (userId: number) => {
  return await customFetch(`users/${userId}`, "DELETE");
};
