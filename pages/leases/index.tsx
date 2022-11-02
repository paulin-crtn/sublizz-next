/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import InputCitySearch from "../../components/input-city-search";
import LeaseCard from "../../components/lease-card";
/* ---------------------------- DYNAMIC COMPONENT --------------------------- */
const LeaseMapWithNoSSR = dynamic(() => import("../../components/lease-map"), {
  ssr: false,
});
/* ---------------------------------- UTILS --------------------------------- */
import { getLeases } from "../../utils/fetch/fetchLease";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Pagination from "@mui/material/Pagination";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILease } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const RESULTS_PER_PAGE = 5;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeasesPage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const pageCount = useMemo(
    () => Math.ceil(data.totalCount / RESULTS_PER_PAGE),
    [data.totalCount]
  );

  const currentPage = useMemo(
    () => (router.query.page ? +router.query.page : 1),
    [router.query.page]
  );

  const query = useMemo(() => router.query.city, [router.query.city]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onDataPageChange = (event: any, page: number) => {
    router.push("leases?page=" + page);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <main>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 4,
        }}
      >
        <Box flex="1 1 52%">
          <Typography>
            {query ? query + " : " : ""}
            {data.totalCount} {data.totalCount > 1 ? "logements" : "logement"}
            {/* Annonces {currentPage * RESULTS_PER_PAGE - 1}-
            {currentPage * RESULTS_PER_PAGE > data.totalCount
              ? data.totalCount
              : currentPage * RESULTS_PER_PAGE}{" "}
            sur {data.totalCount} */}
          </Typography>
          {query && (
            <Typography
              level="body2"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/leases")}
            >
              Effacer la recherche
            </Typography>
          )}
          {data.leases.map((lease: ILease) => (
            <Link href={`/leases/${lease.id}`} key={lease.id}>
              <Box mb={2} sx={{ cursor: "pointer" }}>
                <LeaseCard lease={lease} />
              </Box>
            </Link>
          ))}
          {data.totalCount > RESULTS_PER_PAGE && (
            <Pagination
              count={pageCount}
              sx={{ mt: 3, textAlign: "center" }}
              onChange={onDataPageChange}
              page={currentPage}
            />
          )}
        </Box>
        <Box
          flex="0 0 48%"
          sx={{
            alignSelf: "flex-start",
            position: "sticky",
            top: 135, // 90px height navbar + 45px container marginTop
          }}
        >
          {!!data.leases.length && (
            <LeaseMapWithNoSSR leases={data.leases} isMultiple={true} />
          )}
        </Box>
      </Box>
    </main>
  );
};

export default LeasesPage;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const city = context?.query.city as string;
  const page = context?.query.page as string;
  const data = await getLeases({ city, page });
  return {
    props: { data },
  };
};
