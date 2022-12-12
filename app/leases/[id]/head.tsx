/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { getLease } from "../../../utils/fetch/fetchLease";
import { convertLeaseType } from "../../../utils/convertLeaseType";

/* -------------------------------------------------------------------------- */
/*                               HEAD COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default async function Head({ params }: { params: { id: string } }) {
  /* ---------------------------------- DATA ---------------------------------- */
  const id = +params.id;
  const lease = await getLease(id);

  /* -------------------------------- CONSTANTS ------------------------------- */
  const title = lease
    ? `${convertLeaseType(lease.type)} à ${lease.city} | lacartedeslogements`
    : "L'annonce n'existe pas | lacartedeslogements";
  const description = lease
    ? `⭐⭐⭐ Emménagez à ${lease.city} via notre réseau d'annonces de locations et de sous locations. Particuliers uniquement, pas de frais d'agence.`
    : "⭐⭐⭐ Trouvez votre logement via notre réseau d'annonces de locations et de sous locations. Particuliers uniquement, pas de frais d'agence.`";

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
