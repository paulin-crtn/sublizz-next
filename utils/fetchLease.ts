/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";
import { ILeaseReport } from "../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const leaseReport = async (payload: ILeaseReport) => {
  return await customFetch("leases/report", "POST", payload);
};
