/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { notFound } from "next/navigation";
import { getLease } from "../../../utils/fetch/fetchLease";
import LeasePage from "../../../components/lease";

/* -------------------------------------------------------------------------- */
/*                            SERVER SIDE COMPONENT                           */
/* -------------------------------------------------------------------------- */
export default async function Page({ params }: { params: { id: string } }) {
  /* ---------------------------------- DATA ---------------------------------- */
  const id = +params.id;
  const lease = await getLease(id);

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!lease) {
    notFound();
  }

  return <LeasePage lease={lease} />;
}
