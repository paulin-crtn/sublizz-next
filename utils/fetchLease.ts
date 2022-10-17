/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ILeaseReport } from "../interfaces/lease";
import { ILeaseMessage } from "../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getUserLeases = async () => {
  return await customFetch("leases/user", "GET");
};

export const getUserLeasesMessages = async () => {
  return await customFetch("lease-messages/user", "GET");
};

export const storeLeaseMessage = async (payload: ILeaseMessage) => {
  return await customFetch("lease-messages", "POST", payload);
};

export const storeLeaseReport = async (payload: ILeaseReport) => {
  return await customFetch("lease-reports", "POST", payload);
};
