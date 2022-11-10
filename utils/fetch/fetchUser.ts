/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { IUpdateUser } from "../../interfaces/IUserUpdate";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const updateUser = async (userId: number, payload: IUpdateUser) => {
  return await customFetch(`users/${userId}`, "PUT", payload);
};

export const deleteUser = async (userId: number) => {
  return await customFetch(`users/${userId}`, "DELETE");
};
