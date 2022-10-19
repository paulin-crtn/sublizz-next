/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ISendReport } from "../interfaces/lease";
import { ISendMessage } from "../interfaces/lease";
import { IEditLease } from "../components/edit-lease";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getUserLeases = async () => {
  return await customFetch("leases/user", "GET");
};

export const storeLease = async (payload: IEditLease) => {
  return await customFetch("leases", "POST", payload);
};

export const updateLease = async (id: number, payload: IEditLease) => {
  return await customFetch(`leases/${id}`, "PUT", payload);
};

export const getUserMessages = async () => {
  return await customFetch("lease-messages/user", "GET");
};

export const storeLeaseMessage = async (payload: ISendMessage) => {
  return await customFetch("lease-messages", "POST", payload);
};

export const storeLeaseReport = async (payload: ISendReport) => {
  return await customFetch("lease-reports", "POST", payload);
};
