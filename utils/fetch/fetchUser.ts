/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IUpdateUser } from "../../interfaces/IUserUpdate";
import { IUserDetail } from "../../interfaces/IUserDetail";
import { IBasicApiResponse } from "../../interfaces/IBasicApiResponse";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getAuthUser = async (): Promise<IUserDetail> => {
  return await customFetch("users/me", "GET");
};

export const updateUser = async (
  userId: number,
  payload: IUpdateUser
): Promise<IUserDetail> => {
  return await customFetch(`users/${userId}`, "PUT", payload);
};

export const deleteUser = async (
  userId: number
): Promise<IBasicApiResponse> => {
  return await customFetch(`users/${userId}`, "DELETE");
};
