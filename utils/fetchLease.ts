/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ILeaseReport } from "../interfaces/lease";
import { ILeaseMessage } from "../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const leaseMessage = async (payload: ILeaseMessage) => {
  return await customFetch("leases/message", "POST", payload);
};

export const leaseReport = async (payload: ILeaseReport) => {
  return await customFetch("leases/report", "POST", payload);
};
