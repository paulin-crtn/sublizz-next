/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { getLeases } from "../utils/fetch/fetchLease";
import HomePage from "./components/home-page";

/* -------------------------------------------------------------------------- */
/*                            SERVER SIDE COMPONENT                           */
/* -------------------------------------------------------------------------- */
export default async function Page() {
  /* ---------------------------------- DATA ---------------------------------- */
  const leases = await getLeases();

  /* -------------------------------- TEMPLATE -------------------------------- */
  return <HomePage data={leases} />;
}
