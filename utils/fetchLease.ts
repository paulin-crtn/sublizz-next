/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { customFetch } from "./customFetch";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const leaseReport = async (payload: {
  leaseId: number;
  reason: string;
}) => {
  return await customFetch("leases/report", "POST", payload);
};
