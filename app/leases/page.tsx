/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { getLeases } from "../../utils/fetch/fetchLease";
import LeasesPage from "../../components/leases";

/* -------------------------------------------------------------------------- */
/*                            SERVER SIDE COMPONENT                           */
/* -------------------------------------------------------------------------- */
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  /* ---------------------------------- DATA ---------------------------------- */
  const city = searchParams?.city as string;
  const page = searchParams?.page as string;
  const latitudes = searchParams?.latitudes as string;
  const longitudes = searchParams?.longitudes as string;
  const leases = await getLeases({ city, latitudes, longitudes, page });

  /* -------------------------------- TEMPLATE -------------------------------- */
  return <LeasesPage data={leases} />;
}
